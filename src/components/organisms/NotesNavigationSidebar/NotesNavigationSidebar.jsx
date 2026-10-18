import { memo } from 'react'
import IconTextLabel from '../../atoms/IconTextLabel/IconTextLabel.jsx'
import ProfileAvatar from '../../atoms/ProfileAvatar/ProfileAvatar.jsx'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import ClampedLabelList from '../../molecules/ClampedLabelList/ClampedLabelList.jsx'
import SidebarMenuSection from '../../molecules/SidebarMenuSection/SidebarMenuSection.jsx'
import {
    IoDocumentTextOutline,
    IoMailOutline,
    IoPaperPlaneOutline,
    IoTrashOutline,
} from 'react-icons/io5'
import { MdOutlinePushPin } from 'react-icons/md'
import './NotesNavigationSidebar.scss'
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

function NotesNavigationSidebar({ activeFilter, onSelectFilter, account }) {
    return (
        <aside className='sidebar'>
            <div className='sidebar__content'>
                <nav className='sidebar__nav' aria-label='Notes navigation'>
                    <ClampedLabelList maxLength={3}>
                        {MY_NOTES_FILTERS.map(filter => (
                            <IconTextLabel
                                key={filter.id}
                                className={activeFilter === filter.id ? 'label--active' : ''}
                                icon={filter.icon}
                                text={filter.text}
                                aria-pressed={activeFilter === filter.id}
                                onClick={() => onSelectFilter(filter.id)}
                            />
                        ))}
                    </ClampedLabelList>

                    <SidebarMenuSection title='Shared'>
                        <ClampedLabelList maxLength={3}>
                            {SHARED_FILTERS.map(filter => (
                                <IconTextLabel
                                    key={filter.id}
                                    className={activeFilter === filter.id ? 'label--active' : ''}
                                    icon={filter.icon}
                                    text={filter.text}
                                    aria-pressed={activeFilter === filter.id}
                                    onClick={() => onSelectFilter(filter.id)}
                                />
                            ))}
                        </ClampedLabelList>
                    </SidebarMenuSection>
                </nav>

                <div className='sidebar__bottom'>
                    <div className='sidebar__profile'>
                        <ProfileAvatar />
                        <div className='sidebar__profile-text'>
                            <StyledText as='span' size='small' weight='semibold'>{account?.email ?? 'Account'}</StyledText>
                            <StyledText as='span' size='small' color='secondary'>
                                {account?.publicCode ? `Code: ${account.publicCode}` : 'Private account'}
                            </StyledText>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default memo(NotesNavigationSidebar)

NotesNavigationSidebar.propTypes = {
    activeFilter: PropTypes.oneOf(['all', 'pinned', 'sent', 'inbox', 'trash']).isRequired,
    onSelectFilter: PropTypes.func.isRequired,
    account: PropTypes.shape({
        email: PropTypes.string,
        publicCode: PropTypes.string,
    }),
}
