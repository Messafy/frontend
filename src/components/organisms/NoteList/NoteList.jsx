import PropTypes from 'prop-types'
import { IoAdd } from 'react-icons/io5'
import Text from '../../atoms/Text/Text.jsx'
import Button from '../../atoms/Button/Button.jsx'
import Note from '../Note/Note.jsx'

import './NoteList.scss'

import NoteModel from '../../../models/Note.js'

export default function NoteList({ title, notes, selectedNote, onSelectNote, onCreateNote, onTogglePin }) {

    return (
        <section className='note-list' aria-labelledby='note-list-title'>
            <header className='note-list__header'>
                <div className='note-list__title'>
                    <Text
                        as='h2'
                        size='h2'
                        weight='semibold'
                        id='note-list-title'
                    >
                        {title}
                    </Text>

                    <Text
                        as='span'
                        size='small'
                        color='secondary'
                    >
                        {notes.length} notes
                    </Text>
                </div>

                <Button icon={IoAdd} onClick={onCreateNote}>
                    New Note
                </Button>
            </header>

            <div className='note-list__items'>
                {notes.length === 0 && (
                    <Text as='p' size='body' color='secondary'>
                        No notes yet.
                    </Text>
                )}
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        selected={note.id === selectedNote?.id}
                        onSelect={() => onSelectNote(note)}
                        onTogglePin={onTogglePin ? () => onTogglePin(note) : undefined}
                        {...note}
                    />
                ))}
            </div>
        </section>
    )
}

NoteList.propTypes = {
    title: PropTypes.string.isRequired,
    notes: PropTypes.arrayOf(PropTypes.instanceOf(NoteModel)).isRequired,
    selectedNote: PropTypes.instanceOf(NoteModel),
    onSelectNote: PropTypes.func.isRequired,
    onCreateNote: PropTypes.func.isRequired,
    onTogglePin: PropTypes.func,
}
