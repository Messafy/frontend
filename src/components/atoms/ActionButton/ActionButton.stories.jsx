import { IoAdd, IoPaperPlaneOutline } from 'react-icons/io5'
import ActionButton from './ActionButton.jsx'

const meta = {
  title: 'Atoms/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  args: { children: 'Button', variant: 'primary', disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'save', 'ghost', 'icon'] },
  },
}

export default meta

export const Primary = {}
export const Secondary = { args: { variant: 'secondary' } }
export const Save = { args: { variant: 'save', children: 'Save note' } }
export const Ghost = { args: { variant: 'ghost' } }
export const Icon = { args: { variant: 'icon', children: null, icon: IoAdd, 'aria-label': 'Add' } }
export const WithIcon = { args: { children: 'Send', icon: IoPaperPlaneOutline } }
export const Disabled = { args: { disabled: true } }
