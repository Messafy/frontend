import Input from '../../atoms/Input/Input.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'
import Label from '../../atoms/Label/Label.jsx'
import Profile from '../../atoms/Profile/Profile.jsx'
import Text from '../../atoms/Text/Text.jsx'
import CollectionLabels from '../../molecules/CollectionLabels/CollectionLabels.jsx'
import SidebarSection from '../../molecules/SidebarSection/SidebarSection.jsx'
import {
    IoAdd,
    IoBriefcaseOutline,
    IoDocumentTextOutline,
    IoPinOutline,
    IoSearch,
    IoTrashOutline,
} from 'react-icons/io5'
import {LuLightbulb, LuUserRound} from 'react-icons/lu'
import './Sidebar.scss'
import PropTypes from 'prop-types'

const NOTE_FILTERS = [
    { id: 'all', icon: IoDocumentTextOutline, text: 'All Notes' },
    { id: 'pinned', icon: IoPinOutline, text: 'Pinned Notes' },
    { id: 'trash', icon: IoTrashOutline, text: 'Trash' },
]

export default function Sidebar({ activeFilter, onSelectFilter }) {
    return (
        <aside className='sidebar'>
            <div className='sidebar__content'>
                <Input placeholder='Search notes...' aria-label='Search notes' type='search'>
                    <Icon icon={IoSearch} />
                </Input>

                <nav className='sidebar__nav' aria-label='Notes navigation'>
                    <CollectionLabels maxLength={3}>
                        {NOTE_FILTERS.map(filter => (
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

                    <SidebarSection
                        title='Folders'
                        actionIcon={IoAdd}
                        actionLabel='Create folder'
                    >
                        <CollectionLabels maxLength={3}>
                            <Label icon={IoBriefcaseOutline} text='Work' />
                            <Label icon={LuUserRound} text='Personal' />
                            <Label icon={LuLightbulb} text='Ideas' />
                        </CollectionLabels>
                    </SidebarSection>
                </nav>

                <div className='sidebar__bottom'>
                    <div className='sidebar__profile'>
                        <Profile />
                        <div className='sidebar__profile-text'>
                            <Text as='span' size='small' weight='semibold'>Luis</Text>
                            <Text as='span' size='small' color='secondary'>luis@messafy.app</Text>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

Sidebar.propTypes = {
    activeFilter: PropTypes.oneOf(['all', 'pinned', 'trash']).isRequired,
    onSelectFilter: PropTypes.func.isRequired,
}
