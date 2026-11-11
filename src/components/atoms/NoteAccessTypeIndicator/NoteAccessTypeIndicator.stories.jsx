import NoteAccessTypeIndicator from './NoteAccessTypeIndicator.jsx'

const meta = {
  title: 'Atoms/NoteAccessTypeIndicator',
  component: NoteAccessTypeIndicator,
  tags: ['autodocs'],
  args: { type: 'private' },
  argTypes: { type: { control: 'select', options: ['private', 'sent', 'inbox', 'shared'] } },
}

export default meta

export const Private = {}
export const Sent = { args: { type: 'sent' } }
export const Inbox = { args: { type: 'inbox' } }
export const Shared = { args: { type: 'shared' } }
export const AllTypes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {['private', 'sent', 'inbox', 'shared'].map((type) => (
        <NoteAccessTypeIndicator key={type} type={type} />
      ))}
    </div>
  ),
}
