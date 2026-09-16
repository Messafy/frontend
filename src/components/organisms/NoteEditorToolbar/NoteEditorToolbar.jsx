import PropTypes from 'prop-types'
import Text from '../../atoms/Text/Text.jsx'
import Button from '../../atoms/Button/Button.jsx'
import VerticalSeparator from '../../atoms/VerticalSeparator/VerticalSeparator.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'
import {
    LuBold,
    LuChevronDown,
    LuItalic,
    LuUnderline,
    LuLink,
    LuList,
    LuListOrdered,
    LuTrash2,
} from 'react-icons/lu'
import './NoteEditorToolbar.scss'

const FORMAT_ACTIONS = [
    { id: 'bold', icon: LuBold, label: 'Bold' },
    { id: 'italic', icon: LuItalic, label: 'Italic' },
    { id: 'underline', icon: LuUnderline, label: 'Underline' },
    { id: 'link', icon: LuLink, label: 'Link' },
    { id: 'bullet', icon: LuList, label: 'Bulleted list' },
    { id: 'ordered', icon: LuListOrdered, label: 'Numbered list' },
]

export default function NoteEditorToolbar({content, onFormat, onSave, onDelete}) {
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
                    <Button
                        key={action.id}
                        variant='ghost'
                        aria-label={action.label}
                        title={action.label}
                        onClick={() => onFormat(action.id)}
                    >
                        <Icon icon={action.icon} />
                    </Button>
                ))}
            </div>

            <div className='note-editor-toolbar__actions'>
                <Text as='span' size='small' color='secondary'>
                    {wordCount} words · {characterCount} characters
                </Text>
                <Button type='button' variant='ghost' aria-label='Delete note' onClick={onDelete}>
                    <Icon icon={LuTrash2} />
                </Button>
                <Button type='button' variant='save' onClick={onSave}>
                    <span>Save Note</span>
                    <VerticalSeparator className='note-editor-toolbar__divider' />
                    <Icon icon={LuChevronDown} />
                </Button>
            </div>
        </div>
    )
}

NoteEditorToolbar.propTypes = {
    content: PropTypes.string.isRequired,
    onFormat: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}
