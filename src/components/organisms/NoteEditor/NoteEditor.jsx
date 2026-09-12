import PropTypes from 'prop-types'
import Text from '../../atoms/Text/Text.jsx'
import TextArea from '../../atoms/TextArea/TextArea.jsx'
import Tag from '../../atoms/Tag/Tag.jsx'
import CollectionTags from '../../molecules/CollectionTags/CollectionTags.jsx'
import NoteEditorToolbar from '../NoteEditorToolbar/NoteEditorToolbar.jsx'
import './NoteEditor.scss'

export default function NoteEditor({note}) {
    return (
        <section className='note-editor'>
            <header className='note-editor__header'>
                <div className='note-editor__title-group'>
                    <Text as='span' size='small' color='secondary'>Editing note</Text>
                    <Text as='h1' size='h2' weight='semibold'>{note.title}</Text>
                </div>

                <div className='note-editor__meta'>
                    <Text as='span' size='small' color='secondary'>{note.date}</Text>
                    <CollectionTags maxLength={4}>
                        {note.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </CollectionTags>
                </div>
            </header>

            <TextArea defaultValue={note.content} />

            <NoteEditorToolbar content={note.content} />
        </section>
    )
}

NoteEditor.propTypes = {
    note: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
}
