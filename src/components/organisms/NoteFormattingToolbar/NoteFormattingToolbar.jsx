import PropTypes from 'prop-types'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import ActionButton from '../../atoms/ActionButton/ActionButton.jsx'
import UiIcon from '../../atoms/UiIcon/UiIcon.jsx'
import {
    LuBold,
    LuItalic,
    LuUnderline,
    LuLink,
    LuList,
    LuListOrdered,
    LuTrash2,
} from 'react-icons/lu'
import './NoteFormattingToolbar.scss'

const FORMAT_ACTIONS = [
    { id: 'bold', icon: LuBold, label: 'Bold' },
    { id: 'italic', icon: LuItalic, label: 'Italic' },
    { id: 'underline', icon: LuUnderline, label: 'Underline' },
    { id: 'link', icon: LuLink, label: 'Link' },
    { id: 'bullet', icon: LuList, label: 'Bulleted list' },
    { id: 'ordered', icon: LuListOrdered, label: 'Numbered list' },
]

export default function NoteFormattingToolbar({content, onFormat, onSave, onDelete}) {
    const trimmed = content.trim()
    const words = trimmed ? trimmed.split(/\s+/) : []
    const wordCount = words.filter(Boolean).length
    const characterCount = content.length

    return (
        <div
            className='note-editor-toolbar'
            role='toolbar'
            aria-label='Note formatting'
        >
            <div className='note-editor-toolbar__group'>
                {FORMAT_ACTIONS.map(action => (
                    <ActionButton
                        key={action.id}
                        variant='ghost'
                        aria-label={action.label}
                        title={action.label}
                        onClick={() => onFormat(action.id)}
                    >
                        <UiIcon icon={action.icon} />
                    </ActionButton>
                ))}
            </div>

            <div className='note-editor-toolbar__actions'>
                <StyledText as='span' size='small' color='secondary'>
                    {wordCount} words · {characterCount} characters
                </StyledText>
                <ActionButton type='button' variant='ghost' aria-label='Delete note' onClick={onDelete}>
                    <UiIcon icon={LuTrash2} />
                </ActionButton>
                <ActionButton type='button' variant='save' onClick={onSave}>
                    <span>Save Note</span>
                </ActionButton>
            </div>
        </div>
    )
}

NoteFormattingToolbar.propTypes = {
    content: PropTypes.string.isRequired,
    onFormat: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}
