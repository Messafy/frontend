import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../../atoms/Text/Text.jsx';
import TextArea from '../../atoms/TextArea/TextArea.jsx';
import Tag from '../../atoms/Tag/Tag.jsx';
import Button from '../../atoms/Button/Button.jsx';
import Icon from '../../atoms/Icon/Icon.jsx';
import { LuPlus } from 'react-icons/lu';
import NoteEditorToolbar from '../NoteEditorToolbar/NoteEditorToolbar.jsx';
import TagEditor from '../../molecules/TagEditor/TagEditor.jsx';
import Profile from '../../atoms/Profile/Profile.jsx';
import './NoteEditor.scss';
import Input from "../../atoms/Input/Input.jsx";
import Note from '../../../models/Note.js';

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Markdown snippets inserted around the current textarea selection.
const FORMAT_REPLACEMENTS = {
    bold: selected => `**${selected || 'bold text'}**`,
    italic: selected => `*${selected || 'italic text'}*`,
    underline: selected => `__${selected || 'underlined text'}__`,
    link: selected => `[${selected || 'link text'}](url)`,
    bullet: selected => (selected || 'item').split('\n').map(line => `- ${line}`).join('\n'),
    ordered: selected => (selected || 'item')
        .split('\n')
        .map((line, index) => `${index + 1}. ${line}`)
        .join('\n'),
};

function formatDateTime(date) {
    if (!date) {
        return null;
    }

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    const hours = String(parsed.getHours()).padStart(2, '0');
    const minutes = String(parsed.getMinutes()).padStart(2, '0');

    return `${parsed.getDate()} ${MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}, ${hours}:${minutes}`;
}

export default function NoteEditor({ selectedNote, readOnly, accountEmail, onSelectedNoteChange, saveNote, deleteNote }) {
    const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);
    const textareaRef = useRef(null);

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

    function handleAddTag(tag) {
        onSelectedNoteChange(selectedNote.withTags([...selectedNote.tags, tag]));
    }

    function handleRemoveTag(tagToRemove) {
        onSelectedNoteChange(
            selectedNote.withTags(selectedNote.tags.filter(tag => tag !== tagToRemove))
        );
    }

    function applyFormat(type) {
        const element = textareaRef.current;
        if (!element) {
            return;
        }

        // Read the selection before React re-renders and resets the textarea.
        const value = selectedNote.content;
        const start = element.selectionStart ?? value.length;
        const end = element.selectionEnd ?? value.length;
        const selected = value.slice(start, end);

        const build = FORMAT_REPLACEMENTS[type];
        if (!build) {
            return;
        }

        onSelectedNoteChange(
            selectedNote.withContent(value.slice(0, start) + build(selected) + value.slice(end))
        );
        element.focus();
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
                        {readOnly ? 'Deleted note' : 'Editing note'}
                    </Text>
                    <Input
                        variant="transparent"
                        value={selectedNote.title}
                        readOnly={readOnly}
                        onChange={handleTitleChange}
                        aria-label="Note title"
                    />

                    <div className="note-editor__meta-rows">
                        {accountEmail && (
                            <div className="note-editor__meta-row">
                                <Text as="span" size="small" color="secondary">Created by</Text>
                                <span className="note-editor__owner">
                                    <Profile size="sm" initial={accountEmail.charAt(0).toUpperCase()} />
                                    <Text as="span" size="small">{accountEmail}</Text>
                                </span>
                            </div>
                        )}

                        {formatDateTime(selectedNote.createdAt) && (
                            <div className="note-editor__meta-row">
                                <Text as="span" size="small" color="secondary">Created</Text>
                                <Text as="span" size="small">
                                    {formatDateTime(selectedNote.createdAt)}
                                </Text>
                            </div>
                        )}

                        {/* Deleted notes are read-only: no tag editing, no toolbar. */}
                        <div className="note-editor__meta-row note-editor__meta-row--wrap">
                            <Text as="span" size="small" color="secondary">Tags</Text>
                            {(selectedNote.tags ?? []).map(tag => (
                                <Tag key={tag}>{tag}</Tag>
                            ))}
                            {!readOnly && (
                                <div className="note-editor__tag-add">
                                    <Button
                                        variant="ghost"
                                        className="note-editor__tag-add-button"
                                        aria-label="Add new tag"
                                        aria-expanded={isTagEditorOpen}
                                        onClick={() => setIsTagEditorOpen(open => !open)}
                                    >
                                        <Icon icon={LuPlus} />
                                        <span>Add new tag</span>
                                    </Button>
                                    {isTagEditorOpen && (
                                        <TagEditor
                                            placement="below"
                                            tags={selectedNote.tags}
                                            onAdd={handleAddTag}
                                            onRemove={handleRemoveTag}
                                            onClose={() => setIsTagEditorOpen(false)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Toolbar above the content: formatting on the left, save/delete on the right. */}
            {!readOnly && (
                <NoteEditorToolbar
                    content={selectedNote.content}
                    onFormat={applyFormat}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}

            <TextArea
                ref={textareaRef}
                value={selectedNote.content}
                readOnly={readOnly}
                onChange={handleContentChange}
                aria-label="Note content"
            />
        </section>
    );
}

NoteEditor.propTypes = {
    selectedNote: PropTypes.instanceOf(Note),
    readOnly: PropTypes.bool.isRequired,
    accountEmail: PropTypes.string,
    onSelectedNoteChange: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
};
