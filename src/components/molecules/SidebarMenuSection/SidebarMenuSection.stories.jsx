import { IoLockClosedOutline, IoMailOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import SidebarMenuSection from './SidebarMenuSection.jsx'
import IconTextLabel from '../../atoms/IconTextLabel/IconTextLabel.jsx'

const meta = {
  title: 'Molecules/SidebarMenuSection',
  component: SidebarMenuSection,
  tags: ['autodocs'],
  args: {
    title: 'Notes',
    children: (
      <>
        <IconTextLabel icon={IoLockClosedOutline} text='Private' className='label--active' />
        <IconTextLabel icon={IoPaperPlaneOutline} text='Sent' />
        <IconTextLabel icon={IoMailOutline} text='Inbox' />
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
}

export default meta

export const Default = {}
