import RemovableTag from './RemovableTag.jsx'

const meta = {
  title: 'Atoms/RemovableTag',
  component: RemovableTag,
  tags: ['autodocs'],
  args: { children: 'Odoo' },
}

export default meta

export const Static = {}
export const Removable = { args: { onRemove: () => {} } }
