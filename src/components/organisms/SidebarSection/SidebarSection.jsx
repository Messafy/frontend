import PropTypes from 'prop-types'
import Icon from '../../atoms/Icon/Icon.jsx'
import Text from '../../atoms/Text/Text.jsx'
import './SidebarSection.scss'

export default function SidebarSection({title, actionIcon, children}) {
    return (
        <section className='sidebar-section'>
            <div className='sidebar-section__header'>
                <Text as='span' size='small' color='secondary'>{title}</Text>
                {actionIcon ? <Icon className='animated' icon={actionIcon} /> : null}
            </div>
            {children}
        </section>
    )
}

SidebarSection.propTypes = {
    title: PropTypes.string.isRequired,
    actionIcon: PropTypes.elementType,
    children: PropTypes.node,
}
