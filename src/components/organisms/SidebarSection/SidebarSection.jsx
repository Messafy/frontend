import PropTypes from 'prop-types'
import Icon from '../../atoms/Icon/Icon.jsx'
import Button from '../../atoms/Button/Button.jsx'
import Text from '../../atoms/Text/Text.jsx'
import './SidebarSection.scss'

export default function SidebarSection({title, actionIcon, actionLabel, children}) {
    return (
        <section className='sidebar-section' aria-label={title}>
            <div className='sidebar-section__header'>
                <Text as='span' size='small' color='secondary'>{title}</Text>
                {actionIcon ? (
                    <Button
                        variant='ghost'
                        className='sidebar-section__action'
                        aria-label={actionLabel ?? title}
                    >
                        <Icon className='animated' icon={actionIcon} />
                    </Button>
                ) : null}
            </div>
            {children}
        </section>
    )
}

SidebarSection.propTypes = {
    title: PropTypes.string.isRequired,
    actionIcon: PropTypes.elementType,
    actionLabel: PropTypes.string,
    children: PropTypes.node,
}
