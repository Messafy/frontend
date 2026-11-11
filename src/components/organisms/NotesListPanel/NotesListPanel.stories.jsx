import { useState } from 'react'
import NotesListPanel from './NotesListPanel.jsx'
import Note from '../../../models/Note.js'

const accountId = 'account-1'

const notes = [
  new Note({ id: '1', title: 'Odoo migration plan', content: 'Review the installed modules and plan the data migration.', ownerId: accountId, tags: ['Odoo', 'Migration'], createdAt: '2026-11-11', pinned: true }),
  new Note({ id: '2', title: 'Spanish localisation', content: 'Check the OCA l10n-spain repository for the available modules.', ownerId: accountId, tags: ['OCA'], createdAt: '2026-11-10' }),
  new Note({ id: '3', title: 'Meeting with the supplier', content: 'Confirm prices and delivery dates for the next quarter.', ownerId: accountId, createdAt: '2026-11-09' }),
  new Note({ id: '4', title: 'Inventory valuation', content: 'Decide between FIFO and average cost for the warehouse.', type: 'SHARED', ownerId: 'account-2', sharedWith: accountId, tags: ['Inventory'], createdAt: '2026-11-08' }),
  new Note({ id: '5', title: 'Verifactu checklist', content: 'List the requirements for electronic invoicing.', ownerId: accountId, tags: ['Invoicing'], createdAt: '2026-11-07' }),
  new Note({ id: '6', title: 'Project templates', content: 'Prepare the task templates for implementation projects.', ownerId: accountId, createdAt: '2026-11-06' }),
]

function Panel({ items }) {
  const [selected, setSelected] = useState(items[0]?.id)

  return (
    <div style={{ width: 380, height: 640 }}>
      <NotesListPanel
        title='All notes'
        notes={items}
        selectedNoteId={selected}
        accountId={accountId}
        onSelectNote={(note) => setSelected(note.id ?? note)}
        onCreateNote={() => {}}
        onTogglePin={() => {}}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/NotesListPanel',
  component: NotesListPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { items: notes },
  render: (args) => <Panel {...args} />,
}

export default meta

export const Default = {}
export const FewNotes = { args: { items: notes.slice(0, 2) } }
export const Empty = { args: { items: [] } }
