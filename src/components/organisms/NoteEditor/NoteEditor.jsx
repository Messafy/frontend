import PropTypes from 'prop-types';
import Text from '../../atoms/Text/Text.jsx';
import TextArea from '../../atoms/TextArea/TextArea.jsx';
import Tag from '../../atoms/Tag/Tag.jsx';
import CollectionTags from '../../molecules/CollectionTags/CollectionTags.jsx';
import NoteEditorToolbar from '../NoteEditorToolbar/NoteEditorToolbar.jsx';
import './NoteEditor.scss';
import Input from "../../atoms/Input/Input.jsx";
import Note from '../../../models/Note.js';
import NoteDate from '../../atoms/Date/Date.jsx';

export default function NoteEditor({ selectedNote, onSelectedNoteChange, saveNote, deleteNote }) {
    if (!selectedNote) {
        return (
            <section
                className="note-editor note-editor--empty"
                aria-label="Note editor"
            >
                <div className="note-editor__placeholder">
                    <Text as="p" size="body" color="muted">
                        Select a note or create a new one.
                    </Text>
                </div>
            </section>
        );
    }

    function handleTitleChange(event) {
        onSelectedNoteChange(selectedNote.withTitle(event.target.value));
    }

    function handleContentChange(event) {
        onSelectedNoteChange(selectedNote.withContent(event.target.value));
    }

    function handleSave() {
        saveNote(selectedNote);
    }

    function handleDelete() {
        deleteNote(selectedNote);
    }

    return (
        <section className="note-editor" aria-label="Note editor">
            <header className="note-editor__header">
                <div className="note-editor__title-group">
                    <Text as="span" size="small" color="secondary">
                        Editing note
                    </Text>
                    <Input
                        variant="transparent"
                        value={selectedNote.title}
                        onChange={handleTitleChange}
                        aria-label="Note title"
                    />
                </div>

                <div className="note-editor__meta">
                    <NoteDate date={selectedNote.date} type="complete" />
                    {/* User should be able to see a maximum of 4 tags */}
                    <CollectionTags maxLength={4}>
                        {(selectedNote.tags ?? []).map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </CollectionTags>
                </div>
            </header>

            <TextArea
                value={selectedNote.content}
                onChange={handleContentChange}
                aria-label="Note content"
            />

            <NoteEditorToolbar
                content={selectedNote.content}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </section>
    );
}

NoteEditor.propTypes = {
    selectedNote: PropTypes.instanceOf(Note),
    onSelectedNoteChange: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
};
