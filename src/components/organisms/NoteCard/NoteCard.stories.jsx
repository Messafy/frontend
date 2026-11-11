import NoteCard from './NoteCard.jsx'

const base = {
  date: '2026-11-11',
  title: 'Odoo migration plan',
  content: 'Review the installed modules, check which OCA repositories cover the Spanish localisation and plan the data migration for the accounting module.',
  tags: ['Odoo', 'OCA', 'Accounting', 'Migration'],
  type: 'PRIVATE',
  accountId: 'account-1',
  ownerId: 'account-1',
  onSelect: () => {},
  onTogglePin: () => {},
}

const meta = {
  title: 'Organisms/NoteCard',
  component: NoteCard,
  tags: ['autodocs'],
  args: base,
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
}

export default meta

export const Private = {}
export const Pinned = { args: { pinned: true } }
export const Selected = { args: { selected: true } }
export const Sent = { args: { type: 'SHARED', ownerId: 'account-1', sharedWith: 'account-2' } }
export const Inbox = { args: { type: 'SHARED', ownerId: 'account-2', sharedWith: 'account-1' } }
export const Shared = { args: { type: 'SHARED', ownerId: 'account-2', sharedWith: 'account-3' } }
export const Deleted = { args: { status: 'DELETED' } }
export const NoTags = { args: { title: 'Quick note', content: 'Call the supplier.', tags: [] } }
