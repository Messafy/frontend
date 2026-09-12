import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'

import Text from '../../atoms/Text/Text.jsx'
import Button from '../../atoms/Button/Button.jsx'
import Note from '../Note/Note.jsx'

import { useAuth } from '../../../context/authContext.js'

import './NoteList.scss'

export default function NoteList({ title }) {
    const { session } = useAuth()

    const [notes, setNotes] = useState([])

    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await fetch(
                    `http://localhost:8080/v1/notes?ownerId=${session.account.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        },
                    }
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch notes')
                }

                const data = await response.json()

                setNotes(data)

                console.log(data)
            } catch (error) {
                console.error('Error fetching notes:', error)
            }
        }

        fetchNotes()
    }, [session.account.id, session.token])

    return (
        <section className='note-list'>
            <header className='note-list__header'>
                <div className='note-list__title'>
                    <Text
                        as='h2'
                        size='h2'
                        weight='semibold'
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

                <Button icon={IoAdd}>
                    New Note
                </Button>
            </header>

            <div className='note-list__items'>
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        {...note}
                    />
                ))}
            </div>
        </section>
    )
}

NoteList.propTypes = {
    title: PropTypes.string.isRequired,
}
