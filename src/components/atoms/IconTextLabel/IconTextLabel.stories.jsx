import { IoMailOutline } from 'react-icons/io5'
import IconTextLabel from './IconTextLabel.jsx'

const meta = {
  title: 'Atoms/IconTextLabel',
  component: IconTextLabel,
  tags: ['autodocs'],
  args: { icon: IoMailOutline, text: 'Inbox' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
}

export default meta

export const Default = {}
export const Active = { args: { className: 'label--active' } }
export const WithoutIcon = { args: { icon: null } }
