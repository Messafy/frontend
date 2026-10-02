import PropTypes from 'prop-types'
import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { IoSearch } from 'react-icons/io5'
import Icon from '../../atoms/Icon/Icon.jsx'
import Input from '../../atoms/Input/Input.jsx'
import Text from '../../atoms/Text/Text.jsx'
import Button from '../../atoms/Button/Button.jsx'
import Note from '../Note/Note.jsx'

import './NoteList.scss'

import NoteModel from '../../../models/Note.js'

export default function NoteList({ title, notes, selectedNote, accountId, onSelectNote, onCreateNote, onTogglePin }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [visibleCount, setVisibleCount] = useState(5)
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const visibleNotes = normalizedQuery
        ? notes.filter(note =>
            [note.title, note.content, ...(note.tags ?? [])]
                .some(value => String(value).toLowerCase().includes(normalizedQuery))
        )
        : notes
    const notesToRender = visibleNotes.slice(0, visibleCount)
    const hasMoreNotes = notesToRender.length < visibleNotes.length

    return (
        <section className='note-list' aria-labelledby='note-list-title'>
            <header className='note-list__header'>
                <div className='note-list__header-row'>
                    <div className='note-list__title'>
                        <Text as='h2' size='h2' weight='semibold' id='note-list-title'>
                            {title}
                        </Text>
                        <Text as='span' size='small' color='secondary'>
                            {visibleNotes.length} notes
                        </Text>
                    </div>
                    <Button
                        icon={IoAdd}
                        className='note-list__new-note-button'
                        onClick={onCreateNote}
                    >
                        New Note
                    </Button>
                </div>
                <div className='note-list__search'>
                    <Input
                        placeholder='Search notes...'
                        aria-label='Search notes'
                        type='search'
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                    >
                        <Icon icon={IoSearch} />
                    </Input>
                    <kbd>⌘K</kbd>
                </div>
            </header>

            <div className='note-list__items'>
                {visibleNotes.length === 0 && (
                    <div className='note-list__empty'>
                        <Text as='p' size='body' color='secondary'>
                            No notes yet.
                        </Text>
                        <Text as='p' size='small' color='muted'>
                            Create a note to get started.
                        </Text>
                    </div>
                )}
                {notesToRender.map((note) => (
                    <Note
                        key={note.id}
                        selected={note.id === selectedNote?.id}
                        accountId={accountId}
                        onSelect={() => onSelectNote(note)}
                        onTogglePin={onTogglePin ? () => onTogglePin(note) : undefined}
                        {...note}
                    />
                ))}
                {hasMoreNotes && (
                    <Button
                        variant='ghost'
                        className='note-list__see-more'
                        onClick={() => setVisibleCount(count => count + 5)}
                    >
                        See more
                    </Button>
                )}
            </div>
        </section>
    )
}

NoteList.propTypes = {
    title: PropTypes.string.isRequired,
    notes: PropTypes.arrayOf(PropTypes.instanceOf(NoteModel)).isRequired,
    selectedNote: PropTypes.instanceOf(NoteModel),
    accountId: PropTypes.string,
    onSelectNote: PropTypes.func.isRequired,
    onCreateNote: PropTypes.func.isRequired,
    onTogglePin: PropTypes.func,
}
