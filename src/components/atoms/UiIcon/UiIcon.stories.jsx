import { IoSearch, IoLockClosedOutline, IoMailOutline, IoPeopleOutline, IoPaperPlaneOutline, IoKeyOutline, IoAdd, IoClose, IoCheckmarkCircle } from 'react-icons/io5'
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import { LuX, LuPlus } from 'react-icons/lu'
import UiIcon from './UiIcon.jsx'

const meta = {
  title: 'Atoms/UiIcon',
  component: UiIcon,
  tags: ['autodocs'],
  args: { icon: IoSearch },
}

export default meta

export const Default = {}
export const Gallery = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, maxWidth: 360 }}>
      {[IoSearch, IoLockClosedOutline, IoMailOutline, IoPeopleOutline, IoPaperPlaneOutline, IoKeyOutline, IoAdd, IoClose, IoCheckmarkCircle, MdOutlinePushPin, MdPushPin, LuX, LuPlus].map((icon, index) => (
        <UiIcon key={index} icon={icon} />
      ))}
    </div>
  ),
}
