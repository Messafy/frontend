import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import StyledText from '../../atoms/StyledText/StyledText.jsx';
import MultilineTextInput from '../../atoms/MultilineTextInput/MultilineTextInput.jsx';
import RemovableTag from '../../atoms/RemovableTag/RemovableTag.jsx';
import ActionButton from '../../atoms/ActionButton/ActionButton.jsx';
import UiIcon from '../../atoms/UiIcon/UiIcon.jsx';
import {
    IoChevronDownOutline,
    IoCheckmarkOutline,
    IoInformationCircleOutline,
    IoLinkOutline,
    IoLockClosedOutline,
    IoPeopleOutline,
} from 'react-icons/io5';
import { LuPlus } from 'react-icons/lu';
import NoteFormattingToolbar from '../NoteFormattingToolbar/NoteFormattingToolbar.jsx';
import TagListEditor from '../../molecules/TagListEditor/TagListEditor.jsx';
import './NoteEditorPanel.scss';
import TextInput from "../../atoms/TextInput/TextInput.jsx";
import Note from '../../../models/Note.js';

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

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

function getEditorHeaderLabel(readOnlyReason) {
    if (readOnlyReason === 'deleted') return 'Deleted note';
    if (readOnlyReason === 'received') return 'Received note';
    if (readOnlyReason === 'sent') return 'Sent note';
    return 'Editing note';
}

export default function NoteEditorPanel({ selectedNote, readOnlyReason, accountId, accountEmail, onSelectedNoteChange, saveNote, deleteNote }) {
    const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);
    const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
    const textareaRef = useRef(null);

    if (!selectedNote) {
        return (
            <section
                className="note-editor note-editor--empty"
                aria-label="Note editor"
            >
                <div className="note-editor__placeholder">
                    <StyledText as="p" size="body" color="muted">
                        Select a note or create a new one.
                    </StyledText>
                </div>
            </section>
        );
    }

    const readOnly = Boolean(readOnlyReason);
    const isShared = selectedNote.type === 'SHARED';
    const canChooseVisibility = selectedNote.canChooseVisibility(accountId);
    const headerLabel = getEditorHeaderLabel(readOnlyReason);
    const relationship = selectedNote.relationshipTo(accountId);
    const contactId = relationship === 'RECEIVED'
        ? selectedNote.ownerId
        : selectedNote.sharedWith;
    const contactLabel = relationship === 'RECEIVED' ? 'Sent by' : 'Sent to';

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

    function handleSelectVisibility(type) {
        setIsVisibilityOpen(false);
        if (selectedNote.type === type) {
            return;
        }
        onSelectedNoteChange(selectedNote.withType(type));
    }

    function handlePublicCodeChange(event) {
        onSelectedNoteChange(selectedNote.withRecipientPublicCode(event.target.value));
    }

    function handleLockerPasswordChange(event) {
        onSelectedNoteChange(selectedNote.withRecipientLockerPassword(event.target.value));
    }

    return (
        <section className="note-editor" aria-label="Note editor">
            <header className="note-editor__header">
                <div className="note-editor__title-group">
                    <StyledText as="span" size="small" color="secondary">
                        {headerLabel}
                    </StyledText>
                    <TextInput
                        variant="transparent"
                        value={selectedNote.title}
                        readOnly={readOnly}
                        onChange={handleTitleChange}
                        aria-label="Note title"
                    />

                    <div className="note-editor__meta-rows">
                        {accountEmail && relationship === 'PRIVATE' && (
                            <div className="note-editor__meta-row">
                                <span className="note-editor__meta-label">
                                    <StyledText as="span" size="small" color="secondary">Created by</StyledText>
                                </span>
                                <span className="note-editor__owner">
                                    <StyledText as="span" size="small">{accountEmail}</StyledText>
                                </span>
                            </div>
                        )}

                        {isShared && relationship !== 'PRIVATE' && contactId && (
                            <div className="note-editor__meta-row">
                                <span className="note-editor__meta-label">
                                    <StyledText as="span" size="small" color="secondary">{contactLabel}</StyledText>
                                </span>
                                <span className="note-editor__owner">
                                    <StyledText as="span" size="small">{contactId}</StyledText>
                                </span>
                            </div>
                        )}

                        {formatDateTime(selectedNote.createdAt) && (
                            <div className="note-editor__meta-row">
                                <span className="note-editor__meta-label">
                                    <StyledText as="span" size="small" color="secondary">Created</StyledText>
                                </span>
                                <StyledText as="span" size="small">
                                    {formatDateTime(selectedNote.createdAt)}
                                </StyledText>
                            </div>
                        )}

                        {!readOnly && (
                            <div className="note-editor__meta-row">
                                <span className="note-editor__meta-label">
                                    <StyledText as="span" size="small" color="secondary">Visibility</StyledText>
                                </span>
                                {canChooseVisibility ? (
                                    <div className="note-editor__visibility">
                                        <button
                                            type="button"
                                            className="note-editor__visibility-button"
                                            aria-haspopup="listbox"
                                            aria-expanded={isVisibilityOpen}
                                            onClick={() => setIsVisibilityOpen(open => !open)}
                                        >
                                            <UiIcon icon={isShared ? IoPeopleOutline : IoLockClosedOutline} />
                                            <span>{isShared ? 'Shared' : 'Private'}</span>
                                            <UiIcon icon={IoChevronDownOutline} />
                                        </button>
                                        {isVisibilityOpen && (
                                            <ul className="note-editor__visibility-menu" role="listbox">
                                                <li>
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={!isShared}
                                                        className={`note-editor__visibility-option${isShared ? '' : ' note-editor__visibility-option--active'}`}
                                                        onClick={() => handleSelectVisibility('PRIVATE')}
                                                    >
                                                        <UiIcon icon={IoLockClosedOutline} />
                                                        <span>Private</span>
                                                        {!isShared && <UiIcon icon={IoCheckmarkOutline} />}
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={isShared}
                                                        className={`note-editor__visibility-option${isShared ? ' note-editor__visibility-option--active' : ''}`}
                                                        onClick={() => handleSelectVisibility('SHARED')}
                                                    >
                                                        <UiIcon icon={IoPeopleOutline} />
                                                        <span>Shared</span>
                                                        {isShared && <UiIcon icon={IoCheckmarkOutline} />}
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <span className="note-editor__visibility-readonly">
                                        <UiIcon icon={isShared ? IoPeopleOutline : IoLockClosedOutline} />
                                        <span>{isShared ? 'Shared' : 'Private'}</span>
                                    </span>
                                )}
                            </div>
                        )}

                        {!readOnly && isShared && canChooseVisibility && (
                            <>
                                <div className="note-editor__share-notice" role="status">
                                    <UiIcon icon={IoInformationCircleOutline} />
                                    <span>Once sent, this note cannot be edited.</span>
                                </div>
                                <div className="note-editor__meta-row">
                                    <span className="note-editor__meta-label">
                                        <UiIcon icon={IoLinkOutline} />
                                        <StyledText as="span" size="small" color="secondary">Public code</StyledText>
                                    </span>
                                    <TextInput className="note-editor__recipient-input" value={selectedNote.recipientPublicCode} onChange={handlePublicCodeChange} placeholder="Add code" aria-label="Recipient public code" maxLength={12} pattern="[A-Za-z0-9_-]{12}">
                                        <UiIcon icon={LuPlus} />
                                    </TextInput>
                                </div>
                                <div className="note-editor__meta-row">
                                    <span className="note-editor__meta-label">
                                        <UiIcon icon={IoLockClosedOutline} />
                                        <StyledText as="span" size="small" color="secondary">Locker</StyledText>
                                    </span>
                                    <TextInput className="note-editor__recipient-input" value={selectedNote.recipientLockerPassword} onChange={handleLockerPasswordChange} placeholder="Add password" aria-label="Recipient locker password" type="password" minLength={8} maxLength={64} required data-form-type="other" data-lpignore="true">
                                        <UiIcon icon={LuPlus} />
                                    </TextInput>
                                </div>
                            </>
                        )}

                        <div className="note-editor__meta-row note-editor__meta-row--wrap">
                            <span className="note-editor__meta-label">
                                <StyledText as="span" size="small" color="secondary">Tags</StyledText>
                            </span>
                            {(selectedNote.tags ?? []).map(tag => <RemovableTag key={tag}>{tag}</RemovableTag>)}
                            {!readOnly && (
                                <div className="note-editor__tag-add">
                                    <ActionButton variant="ghost" className="note-editor__tag-add-button" aria-label="Add new tag" aria-expanded={isTagEditorOpen} onClick={() => setIsTagEditorOpen(open => !open)}>
                                        <UiIcon icon={LuPlus} />
                                        <span>Add new tag</span>
                                    </ActionButton>
                                    {isTagEditorOpen && (
                                        <TagListEditor placement="below" tags={selectedNote.tags} onAdd={handleAddTag} onRemove={handleRemoveTag} onClose={() => setIsTagEditorOpen(false)} />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {!readOnly && (
                <NoteFormattingToolbar
                    content={selectedNote.content}
                    onFormat={applyFormat}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}

            <MultilineTextInput
                ref={textareaRef}
                value={selectedNote.content}
                readOnly={readOnly}
                onChange={handleContentChange}
                aria-label="Note content"
            />
        </section>
    );
}

NoteEditorPanel.propTypes = {
    selectedNote: PropTypes.instanceOf(Note),
    readOnlyReason: PropTypes.oneOf(['deleted', 'received', 'sent']),
    accountId: PropTypes.string,
    accountEmail: PropTypes.string,
    onSelectedNoteChange: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
};
