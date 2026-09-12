import PropTypes from 'prop-types'
import Text from '../../atoms/Text/Text.jsx'
import Button from '../../atoms/Button/Button.jsx'
import VerticalSeparator from '../../atoms/VerticalSeparator/VerticalSeparator.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'
import {LuChevronDown, LuPaperclip, LuTag} from 'react-icons/lu'
import './NoteEditorToolbar.scss'

export default function NoteEditorToolbar({content}) {
    const trimmed = content.trim()
    const words = trimmed ? trimmed.split(/\s+/) : []
    const wordCount = words.filter(Boolean).length
    const characterCount = content.length

    return (
        <footer className='note-editor-toolbar'>
            <Text as='span' size='small' color='secondary'>
                {wordCount} words&nbsp;&nbsp;{characterCount} characters
            </Text>

            <div className='note-editor-toolbar__actions'>
                <Button variant='ghost' aria-label='Add tag'>
                    <Icon icon={LuTag} />
                </Button>
                <Button variant='ghost' aria-label='Attach file'>
                    <Icon icon={LuPaperclip} />
                </Button>
                <Button variant='save'>
                    <span>Save Note</span>
                    <VerticalSeparator className='note-editor-toolbar__divider' />
                    <Icon icon={LuChevronDown} />
                </Button>
            </div>
        </footer>
    )
}

NoteEditorToolbar.propTypes = {
    content: PropTypes.string.isRequired,
}
