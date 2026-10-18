import NotesNavigationSidebar from '../../organisms/NotesNavigationSidebar/NotesNavigationSidebar.jsx';
import NotesListPanel from '../../organisms/NotesListPanel/NotesListPanel.jsx';
import NoteEditorPanel from '../../organisms/NoteEditorPanel/NoteEditorPanel.jsx';
import './NotesWorkspacePage.scss';

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useAuth } from '../../../context/authContext.js';
import Note from '../../../models/Note.js';
import { API_URL, WEBSOCKET_URL } from '../../../utils/apiUrl.js';

const initialNotes = [];

const FILTER_TITLES = {
    all: 'All Notes',
    pinned: 'Pinned',
    sent: 'Sent',
    inbox: 'Inbox',
    trash: 'Trash',
};

function handleNoteReducer(notes, action) {
    switch (action.type) {
        case 'LOAD_NOTES':
            if (!action.notes.every(note => note instanceof Note)) {
                throw new TypeError('LOAD_NOTES expects Note instances');
            }
            return action.notes;

        case 'SAVE_NOTE':
            if (!(action.note instanceof Note)) {
                throw new TypeError('SAVE_NOTE expects a Note instance');
            }
            return notes.some(note => note.id === action.note.id)
                ? notes.map(note => note.id === action.note.id ? action.note : note)
                : [...notes, action.note];

        case 'DELETE_NOTE':
            return notes.map(note => note.id === action.id ? note.withStatus('DELETED') : note);

        case 'PIN_NOTE':
            return notes.map(
                note => note.id === action.id ? note.withPinned(action.pinned) : note
            );

        default:
            return notes;
    }
}

function authHeaders(token) {
    return { Authorization: `Bearer ${token}` };
}

function jsonHeaders(token) {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

async function fetchServerNotes(token, accountId, signal) {
    const responses = await Promise.all([
        fetch(`${API_URL}/v1/notes?ownerId=${encodeURIComponent(accountId)}`, {
            headers: authHeaders(token),
            signal,
        }),
        fetch(`${API_URL}/v1/notes?sharedWith=${encodeURIComponent(accountId)}`, {
            headers: authHeaders(token),
            signal,
        }),
        fetch(`${API_URL}/v1/notes/trash`, {
            headers: authHeaders(token),
            signal,
        }),
    ]);

    if (responses.some(response => !response.ok)) {
        throw new Error('Failed to fetch notes');
    }

    const payloads = await Promise.all(responses.map(response => response.json()));
    const notesById = new Map();
    payloads.flatMap(notes => notes ?? []).forEach(note => notesById.set(note.id, note));
    return [...notesById.values()];
}

function buildSaveRequest(note) {
    const baseBody = {
        title: note.title,
        content: note.content,
        tags: note.tags,
    };

    if (note.id) {
        if (note.type === 'SHARED' && note.originalType === 'PRIVATE') {
            return {
                endpoint: `${API_URL}/v1/notes/${note.id}/share`,
                method: 'PATCH',
                body: {
                    recipientPublicCode: note.recipientPublicCode,
                    recipientLockerPassword: note.recipientLockerPassword,
                },
            };
        }
        return {
            endpoint: `${API_URL}/v1/notes/${note.id}`,
            method: 'PATCH',
            body: baseBody,
        };
    }

    if (note.type === 'SHARED') {
        return {
            endpoint: `${API_URL}/v1/notes/shared`,
            method: 'POST',
            body: {
                ...baseBody,
                recipientPublicCode: note.recipientPublicCode,
                recipientLockerPassword: note.recipientLockerPassword,
            },
        };
    }

    return {
        endpoint: `${API_URL}/v1/notes`,
        method: 'POST',
        body: baseBody,
    };
}

async function sendSaveRequest(token, request) {
    const response = await fetch(request.endpoint, {
        method: request.method,
        headers: jsonHeaders(token),
        body: JSON.stringify(request.body),
    });
    if (!response.ok) {
        throw new Error('Failed to save note');
    }
    return response.json();
}

async function sendDeleteRequest(token, id) {
    const response = await fetch(`${API_URL}/v1/notes`, {
        method: 'DELETE',
        headers: jsonHeaders(token),
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new Error('Failed to delete note');
    }
}

async function sendPinRequest(token, id, pinned) {
    const response = await fetch(`${API_URL}/v1/notes/${id}/pin`, {
        method: 'PATCH',
        headers: jsonHeaders(token),
        body: JSON.stringify({ pinned }),
    });
    if (!response.ok) {
        throw new Error('Failed to update note pin');
    }
    return response.json();
}

function filterNotes(notes, activeFilter, accountId) {
    if (activeFilter === 'trash') {
        return notes.filter(note => note.status === 'DELETED');
    }
    return notes.filter(note => {
        if (note.status === 'DELETED') {
            return false;
        }
        return noteMatchesFilter(note, activeFilter, accountId);
    });
}

function noteMatchesFilter(note, activeFilter, accountId) {
    const relationship = note.relationshipTo(accountId);
    switch (activeFilter) {
        case 'all':
            return relationship === 'PRIVATE';
        case 'pinned':
            return relationship === 'PRIVATE' && note.pinned;
        case 'sent':
            return relationship === 'SENT';
        case 'inbox':
            return relationship === 'RECEIVED';
        default:
            return true;
    }
}

function countUnreadInbox(notes, accountId) {
    return notes.filter(note =>
        note.status !== 'DELETED'
        && note.relationshipTo(accountId) === 'RECEIVED'
        && !note.readAt
    ).length;
}

function sortPinnedFirst(notes) {
    return [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));
}

function getReadOnlyReason(activeFilter, selectedNote, accountId) {
    if (activeFilter === 'trash') {
        return 'deleted';
    }
    if (!selectedNote) {
        return undefined;
    }
    const relationship = selectedNote.relationshipTo(accountId);
    if (relationship === 'RECEIVED') {
        return 'received';
    }
    if (
        relationship === 'SENT'
        && selectedNote.id != null
        && selectedNote.originalType === 'SHARED'
    ) {
        return 'sent';
    }
    return undefined;
}

export default function NotesWorkspacePage() {
    const { session } = useAuth();

    const [notes, dispatch] = useReducer(handleNoteReducer, initialNotes);
    const [selectedNote, setSelectedNote] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const accountId = session?.account?.id;
    const token = session?.token;

    useEffect(() => {
        if (!accountId || !token) {
            return;
        }

        const controller = new AbortController();

        async function loadNotes() {
            try {
                const serverNotes = await fetchServerNotes(token, accountId, controller.signal);
                dispatch({
                    type: 'LOAD_NOTES',
                    notes: serverNotes.map(note => Note.from(note)),
                });
            } catch (error) {
                if (error.name === 'AbortError') {
                    return;
                }
                console.error('Error fetching notes:', error);
            }
        }

        loadNotes();
        return () => controller.abort();
    }, [accountId, token]);

    useEffect(() => {
        if (!accountId || !token) {
            return;
        }

        const client = new Client({
            brokerURL: WEBSOCKET_URL,
            connectHeaders: { Authorization: `Bearer ${token}` },
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/user/queue/notes', message => {
                    try {
                        dispatch({ type: 'SAVE_NOTE', note: Note.from(JSON.parse(message.body)) });
                    } catch (error) {
                        console.error('Error processing real-time note:', error);
                    }
                });
            },
            onStompError: frame => {
                console.error('Real-time notes connection failed:', frame.headers.message);
            },
        });

        client.activate();
        return () => {
            client.deactivate();
        };
    }, [accountId, token]);

    async function saveNote(note) {
        if (!token || !accountId) {
            return;
        }

        try {
            const request = buildSaveRequest(note);
            const createdNote = await sendSaveRequest(token, request);
            const savedNote = Note.from({
                ...note,
                ...request.body,
                ...createdNote,
                ownerId: createdNote.ownerId ?? note.ownerId ?? accountId,
                originalType: createdNote.type ?? note.originalType,
                type: note.type === 'SHARED' ? 'SHARED' : 'PRIVATE',
            });
            dispatch({ type: 'SAVE_NOTE', note: savedNote });
            setSelectedNote(savedNote);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    }

    async function deleteNote(note) {
        if (!note.id) {
            setSelectedNote(null);
            return;
        }

        try {
            await sendDeleteRequest(token, note.id);
            dispatch({ type: 'DELETE_NOTE', id: note.id });
            setSelectedNote(null);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    const togglePinned = useCallback(async (note) => {
        if (!note.id || note.status === 'DELETED') {
            return;
        }

        try {
            const result = await sendPinRequest(token, note.id, !note.pinned);
            dispatch({ type: 'PIN_NOTE', id: note.id, pinned: result.pinned });
            const updatedNote = note.withPinned(result.pinned);
            const shouldClearSelection = activeFilter === 'pinned' && !result.pinned;
            setSelectedNote(shouldClearSelection ? null : updatedNote);
        } catch (error) {
            console.error('Error updating note pin:', error);
        }
    }, [activeFilter, token]);

    const selectFilter = useCallback((filter) => {
        setActiveFilter(filter);
        setSelectedNote(null);
    }, []);

    const createNote = useCallback(() => {
        setActiveFilter('all');
        setSelectedNote(Note.draft());
    }, []);

    const visibleNotes = useMemo(() => {
        const filteredNotes = filterNotes(notes, activeFilter, accountId);
        return activeFilter === 'trash'
            ? filteredNotes
            : sortPinnedFirst(filteredNotes);
    }, [notes, activeFilter, accountId]);
    const readOnlyReason = getReadOnlyReason(activeFilter, selectedNote, accountId);
    const unreadInboxCount = useMemo(
        () => countUnreadInbox(notes, accountId),
        [notes, accountId]
    );

    return (
        <main className="note-page">
            <NotesNavigationSidebar
                activeFilter={activeFilter}
                onSelectFilter={selectFilter}
                unreadInboxCount={unreadInboxCount}
                account={session?.account}
            />
            <NotesListPanel
                title={FILTER_TITLES[activeFilter]}
                notes={visibleNotes}
                selectedNoteId={selectedNote?.id}
                accountId={accountId}
                onSelectNote={setSelectedNote}
                onCreateNote={createNote}
                onTogglePin={togglePinned}
            />
            <NoteEditorPanel
                selectedNote={selectedNote}
                onSelectedNoteChange={setSelectedNote}
                saveNote={saveNote}
                deleteNote={deleteNote}
                accountId={accountId}
                accountEmail={session?.account?.email}
                readOnlyReason={readOnlyReason}
            />
        </main>
    );
}
