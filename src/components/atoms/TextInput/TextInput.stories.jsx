import { IoMailOutline } from 'react-icons/io5'
import TextInput from './TextInput.jsx'
import UiIcon from '../UiIcon/UiIcon.jsx'

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: { placeholder: 'Placeholder' },
  argTypes: { variant: { control: 'select', options: [undefined, 'compact', 'transparent'] } },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}

export default meta

export const Default = {}
export const Compact = { args: { variant: 'compact' } }
export const Transparent = { args: { variant: 'transparent' } }
export const WithIcon = {
  args: { placeholder: 'you@example.com', children: <UiIcon icon={IoMailOutline} /> },
}
export const ErrorState = { args: { error: new Error('Invalid value'), defaultValue: 'wrong' } }
export const Disabled = { args: { disabled: true } }
