import { useState } from 'react'
import NoteEditorPanel from './NoteEditorPanel.jsx'
import Note from '../../../models/Note.js'

const accountId = 'account-1'

const privateNote = new Note({
  id: 'note-1',
  title: 'Odoo migration plan',
  content: 'Review the installed modules and plan the data migration.\n\n- Accounting\n- Inventory\n- Sales',
  type: 'PRIVATE',
  ownerId: accountId,
  tags: ['Odoo', 'Migration'],
  createdAt: '2026-11-11T09:30:00',
})

function Panel({ initialNote, readOnlyReason }) {
  const [note, setNote] = useState(initialNote)

  return (
    <div style={{ width: 640, height: 560 }}>
      <NoteEditorPanel
        selectedNote={note}
        readOnlyReason={readOnlyReason}
        accountId={accountId}
        accountEmail='luis@example.com'
        onSelectedNoteChange={setNote}
        saveNote={async () => {}}
        deleteNote={async () => {}}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/NoteEditorPanel',
  component: NoteEditorPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { initialNote: privateNote },
  render: (args) => <Panel {...args} />,
}

export default meta

export const Private = {}
export const NewNote = { args: { initialNote: Note.draft() } }
export const Received = {
  args: {
    readOnlyReason: 'received',
    initialNote: new Note({ ...privateNote, type: 'SHARED', ownerId: 'account-2', sharedWith: accountId }),
  },
}
export const Deleted = { args: { readOnlyReason: 'deleted' } }
