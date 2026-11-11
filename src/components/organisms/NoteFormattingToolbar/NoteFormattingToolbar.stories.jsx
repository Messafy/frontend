import NoteFormattingToolbar from './NoteFormattingToolbar.jsx'

const meta = {
  title: 'Organisms/NoteFormattingToolbar',
  component: NoteFormattingToolbar,
  tags: ['autodocs'],
  args: { content: 'Some note content', onFormat: () => {}, onSave: () => {}, onDelete: () => {} },
}

export default meta

export const WithContent = {}
export const EmptyContent = { args: { content: '' } }
