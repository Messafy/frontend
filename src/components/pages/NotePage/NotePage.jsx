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
            return notes.filter(note => note.id !== action.id);

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

    useEffect(() => {
        if (!session?.account?.id || !session?.token) {
            return;
        }

        async function fetchNotes() {
            try {
                const response = await fetch(
                    `http://localhost:8080/v1/notes?ownerId=${session.account.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const data = await response.json();

                dispatch({
                    type: 'LOAD_NOTES',
                    notes: (data ?? []).map(note => Note.from(note)),
                });
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        }

        fetchNotes();
    }, [session?.account?.id, session?.token]);

    async function saveNote(note) {
        try {
            const ownerId = session.account.id;
            const isPersisted = Boolean(note.id);
            const noteToSave = isPersisted
                ? {
                    title: note.title,
                    content: note.content,
                }
                : {
                    type: 'PRIVATE',
                    title: note.title,
                    content: note.content,
                    ownerId,
                    sharedWith: ownerId,
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

    return (
        <main className="note-page">
            <Sidebar />
            <NoteList
                selectedNote={selectedNote}
                onSelectNote={setSelectedNote}
                title="All Notes"
                notes={notes}
            />
            <NoteEditor
                selectedNote={selectedNote}
                onSelectedNoteChange={setSelectedNote}
                saveNote={saveNote}
                deleteNote={deleteNote}
            />
        </main>
    );
}
