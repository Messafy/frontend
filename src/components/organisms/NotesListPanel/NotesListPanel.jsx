import PropTypes from 'prop-types'
import { memo, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { IoSearch } from 'react-icons/io5'
import UiIcon from '../../atoms/UiIcon/UiIcon.jsx'
import TextInput from '../../atoms/TextInput/TextInput.jsx'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import ActionButton from '../../atoms/ActionButton/ActionButton.jsx'
import NoteCard from '../NoteCard/NoteCard.jsx'

import './NotesListPanel.scss'

import NoteModel from '../../../models/Note.js'

function NotesListPanel({ title, notes, selectedNoteId, accountId, onSelectNote, onCreateNote, onTogglePin }) {
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
                        <StyledText as='h2' size='h2' weight='semibold' id='note-list-title'>
                            {title}
                        </StyledText>
                        <StyledText as='span' size='small' color='secondary'>
                            {visibleNotes.length} notes
                        </StyledText>
                    </div>
                    <ActionButton
                        icon={IoAdd}
                        className='note-list__new-note-button'
                        onClick={onCreateNote}
                    >
                        New NoteCard
                    </ActionButton>
                </div>
                <div className='note-list__search'>
                    <TextInput
                        placeholder='Search notes...'
                        aria-label='Search notes'
                        type='search'
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                    >
                        <UiIcon icon={IoSearch} />
                    </TextInput>
                    <kbd>⌘K</kbd>
                </div>
            </header>

            <div className='note-list__items'>
                {visibleNotes.length === 0 && (
                    <div className='note-list__empty'>
                        <StyledText as='p' size='body' color='secondary'>
                            No notes yet.
                        </StyledText>
                        <StyledText as='p' size='small' color='muted'>
                            Create a note to get started.
                        </StyledText>
                    </div>
                )}
                {notesToRender.map((note) => (
                    <NoteCard
                        key={note.id}
                        selected={note.id === selectedNoteId}
                        accountId={accountId}
                        onSelect={() => onSelectNote(note)}
                        onTogglePin={onTogglePin ? () => onTogglePin(note) : undefined}
                        {...note}
                    />
                ))}
                {hasMoreNotes && (
                    <ActionButton
                        variant='ghost'
                        className='note-list__see-more'
                        onClick={() => setVisibleCount(count => count + 5)}
                    >
                        See more
                    </ActionButton>
                )}
            </div>
        </section>
    )
}

NotesListPanel.propTypes = {
    title: PropTypes.string.isRequired,
    notes: PropTypes.arrayOf(PropTypes.instanceOf(NoteModel)).isRequired,
    selectedNoteId: PropTypes.string,
    accountId: PropTypes.string,
    onSelectNote: PropTypes.func.isRequired,
    onCreateNote: PropTypes.func.isRequired,
    onTogglePin: PropTypes.func,
}

export default memo(NotesListPanel)
