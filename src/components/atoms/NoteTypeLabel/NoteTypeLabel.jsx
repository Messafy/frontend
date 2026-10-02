import PropTypes from 'prop-types'
import { IoLockClosedOutline, IoMailOutline, IoPeopleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import Icon from '../Icon/Icon.jsx'
import './NoteTypeLabel.scss'

const LABELS = {
    private: { text: 'Private', icon: IoLockClosedOutline },
    sent: { text: 'Sent', icon: IoPaperPlaneOutline },
    inbox: { text: 'Inbox', icon: IoMailOutline },
    shared: { text: 'Shared', icon: IoPeopleOutline },
}

export default function NoteTypeLabel({ type }) {
    const label = LABELS[type] ?? LABELS.private

    return (
        <span className={`note-type-label note-type-label--${type}`} title={label.text}>
            <Icon icon={label.icon} />
            <span>{label.text}</span>
        </span>
    )
}

NoteTypeLabel.propTypes = {
    type: PropTypes.oneOf(['private', 'sent', 'inbox', 'shared']).isRequired,
}
