import Sidebar from '../../organisms/Sidebar/Sidebar.jsx'
import NoteList from '../../organisms/NoteList/NoteList.jsx'
import NoteEditor from '../../organisms/NoteEditor/NoteEditor.jsx'
import {notes} from '../../../mocks/notes.js'
import './NotePage.scss'

export default function NotePage() {
    const selectedNote = notes[0]

    return (
        <main className='note-page'>
            <Sidebar />
            <NoteList title='All Notes' notes={notes} />
            <NoteEditor note={selectedNote} />
        </main>
    )
}
