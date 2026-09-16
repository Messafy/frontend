import Sidebar from '../../organisms/Sidebar/Sidebar.jsx';
import NoteList from '../../organisms/NoteList/NoteList.jsx';
import NoteEditor from '../../organisms/NoteEditor/NoteEditor.jsx';
import './NotePage.scss';

import React, { useEffect, useReducer } from 'react';
import { useAuth } from '../../../context/authContext.js';
import Note from '../../../models/Note.js';

const initialNotes = [];

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
            // Soft delete: the note stays in state with status DELETED so the Trash filter can show it.
            return notes.map(note => note.id === action.id ? note.withStatus('DELETED') : note);

        case 'PIN_NOTE':
            // Pin changes only arrive from the server response, so unsaved editor edits are never merged here.
            return notes.map(
                note => note.id === action.id ? note.withPinned(action.pinned) : note
            );

        default:
            return notes;
    }
}

export default function NotePage() {
    const { session } = useAuth();

    const [notes, dispatch] = useReducer(
        handleNoteReducer,
        initialNotes
    );
    const [selectedNote, setSelectedNote] = React.useState(null);
    const [activeFilter, setActiveFilter] = React.useState('all');

    useEffect(() => {
        if (!session?.account?.id || !session?.token) {
            return;
        }

        async function fetchNotes() {
            try {
                const requestOptions = {
                    headers: {
                        Authorization: `Bearer ${session.token}`,
                    },
                };
                // Load active notes (owner query) and deleted notes (trash) in one go.
                const [activeResponse, trashResponse] = await Promise.all([
                    fetch(
                        `http://localhost:8080/v1/notes?ownerId=${session.account.id}`,
                        requestOptions
                    ),
                    fetch('http://localhost:8080/v1/notes/trash', requestOptions),
                ]);

                if (!activeResponse.ok || !trashResponse.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const [activeNotes, deletedNotes] = await Promise.all([
                    activeResponse.json(),
                    trashResponse.json(),
                ]);

                dispatch({
                    type: 'LOAD_NOTES',
                    notes: [...(activeNotes ?? []), ...(deletedNotes ?? [])]
                        .map(note => Note.from(note)),
                });
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        }

        fetchNotes();
    }, [session?.account?.id, session?.token]);

    async function saveNote(note) {
        if (!session?.token || !session?.account?.id) {
            return;
        }

        try {
            const isPersisted = Boolean(note.id);
            const noteToSave = isPersisted
                ? {
                    title: note.title,
                    content: note.content,
                    tags: note.tags,
                }
                : {
                    type: 'PRIVATE',
                    title: note.title,
                    content: note.content,
                    sharedWith: session.account.id,
                    tags: note.tags,
                };

            const response = await fetch(
                isPersisted
                    ? `http://localhost:8080/v1/notes/${note.id}`
                    : 'http://localhost:8080/v1/notes',
                {
                    method: isPersisted ? 'PATCH' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.token}`,
                    },
                    body: JSON.stringify(noteToSave),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save note');
            }

            const createdNote = await response.json();
            const savedNote = Note.from({
                ...note,
                ...noteToSave,
                ...createdNote,
            });

            dispatch({
                type: 'SAVE_NOTE',
                note: savedNote,
            });
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
            const response = await fetch('http://localhost:8080/v1/notes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.token}`,
                },
                body: JSON.stringify({ id: note.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete note');
            }

            dispatch({ type: 'DELETE_NOTE', id: note.id });
            setSelectedNote(null);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    async function togglePinned(note) {
        // Drafts (no id) and deleted notes cannot be pinned.
        if (!note.id || note.status === 'DELETED') {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/v1/notes/${note.id}/pin`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.token}`,
                },
                body: JSON.stringify({ pinned: !note.pinned }),
            });

            if (!response.ok) {
                throw new Error('Failed to update note pin');
            }

            const result = await response.json();
            const updatedNote = note.withPinned(result.pinned);
            dispatch({ type: 'PIN_NOTE', id: note.id, pinned: result.pinned });
            // Unpinning inside Pinned Notes removes the note from that list, so drop the selection too.
            setSelectedNote(
                activeFilter === 'pinned' && !result.pinned ? null : updatedNote
            );
        } catch (error) {
            console.error('Error updating note pin:', error);
        }
    }

    function selectFilter(filter) {
        setActiveFilter(filter);
        setSelectedNote(null);
    }

    // New notes are drafts: creating one always switches back to All Notes so the draft is visible.
    function createNote() {
        setActiveFilter('all');
        setSelectedNote(Note.draft());
    }

    const filteredNotes = notes.filter(note => {
        if (activeFilter === 'trash') {
            return note.status === 'DELETED';
        }
        if (activeFilter === 'pinned') {
            return note.status !== 'DELETED' && note.pinned;
        }
        return note.status !== 'DELETED';
    });

    // Pinned notes float to the top in every list except Trash.
    const visibleNotes = activeFilter === 'trash'
        ? filteredNotes
        : filteredNotes.sort((a, b) => Number(b.pinned) - Number(a.pinned));

    const listTitles = {
        all: 'All Notes',
        pinned: 'Pinned Notes',
        trash: 'Trash',
    };

    return (
        <main className="note-page">
            <Sidebar activeFilter={activeFilter} onSelectFilter={selectFilter} />
            <NoteList
                selectedNote={selectedNote}
                onSelectNote={setSelectedNote}
                title={listTitles[activeFilter]}
                notes={visibleNotes}
                onCreateNote={createNote}
                onTogglePin={togglePinned}
            />
            <NoteEditor
                selectedNote={selectedNote}
                onSelectedNoteChange={setSelectedNote}
                saveNote={saveNote}
                deleteNote={deleteNote}
                accountEmail={session?.account?.email}
                readOnly={activeFilter === 'trash'}
            />
        </main>
    );
}
