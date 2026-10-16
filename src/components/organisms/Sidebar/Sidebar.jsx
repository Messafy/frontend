import { memo } from 'react'
import Label from '../../atoms/Label/Label.jsx'
import Profile from '../../atoms/Profile/Profile.jsx'
import Text from '../../atoms/Text/Text.jsx'
import CollectionLabels from '../../molecules/CollectionLabels/CollectionLabels.jsx'
import SidebarSection from '../../molecules/SidebarSection/SidebarSection.jsx'
import {
    IoDocumentTextOutline,
    IoMailOutline,
    IoPaperPlaneOutline,
    IoTrashOutline,
} from 'react-icons/io5'
import { MdOutlinePushPin } from 'react-icons/md'
import './Sidebar.scss'
import PropTypes from 'prop-types'

const MY_NOTES_FILTERS = [
    { id: 'all', icon: IoDocumentTextOutline, text: 'All Notes' },
    { id: 'pinned', icon: MdOutlinePushPin, text: 'Pinned Notes' },
    { id: 'trash', icon: IoTrashOutline, text: 'Trash' },
]

const SHARED_FILTERS = [
    { id: 'sent', icon: IoPaperPlaneOutline, text: 'Sent' },
    { id: 'inbox', icon: IoMailOutline, text: 'Inbox' },
]

function Sidebar({ activeFilter, onSelectFilter, account }) {
    return (
        <aside className='sidebar'>
            <div className='sidebar__content'>
                <nav className='sidebar__nav' aria-label='Notes navigation'>
                    <CollectionLabels maxLength={3}>
                        {MY_NOTES_FILTERS.map(filter => (
                            <Label
                                key={filter.id}
                                className={activeFilter === filter.id ? 'label--active' : ''}
                                icon={filter.icon}
                                text={filter.text}
                                aria-pressed={activeFilter === filter.id}
                                onClick={() => onSelectFilter(filter.id)}
                            />
                        ))}
                    </CollectionLabels>

                    <SidebarSection title='Shared'>
                        <CollectionLabels maxLength={3}>
                            {SHARED_FILTERS.map(filter => (
                                <Label
                                    key={filter.id}
                                    className={activeFilter === filter.id ? 'label--active' : ''}
                                    icon={filter.icon}
                                    text={filter.text}
                                    aria-pressed={activeFilter === filter.id}
                                    onClick={() => onSelectFilter(filter.id)}
                                />
                            ))}
                        </CollectionLabels>
                    </SidebarSection>
                </nav>

                <div className='sidebar__bottom'>
                    <div className='sidebar__profile'>
                        <Profile />
                        <div className='sidebar__profile-text'>
                            <Text as='span' size='small' weight='semibold'>{account?.email ?? 'Account'}</Text>
                            <Text as='span' size='small' color='secondary'>
                                {account?.publicCode ? `Code: ${account.publicCode}` : 'Private account'}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default memo(Sidebar)

Sidebar.propTypes = {
    activeFilter: PropTypes.oneOf(['all', 'pinned', 'sent', 'inbox', 'trash']).isRequired,
    onSelectFilter: PropTypes.func.isRequired,
    account: PropTypes.shape({
        email: PropTypes.string,
        publicCode: PropTypes.string,
    }),
}
