import MultilineTextInput from './MultilineTextInput.jsx'

const meta = {
  title: 'Atoms/MultilineTextInput',
  component: MultilineTextInput,
  tags: ['autodocs'],
  args: { placeholder: 'Write your note...' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export default meta

export const Empty = {}
export const Filled = { args: { defaultValue: 'Meeting notes\n\n- Review the Odoo migration plan\n- Confirm the OCA modules' } }
