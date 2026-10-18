import PropTypes from 'prop-types'
import UiIcon from '../../atoms/UiIcon/UiIcon.jsx'
import ActionButton from '../../atoms/ActionButton/ActionButton.jsx'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import './SidebarMenuSection.scss'

export default function SidebarMenuSection({title, actionIcon, actionLabel, children}) {
    return (
        <section className='sidebar-section' aria-label={title}>
            <div className='sidebar-section__header'>
                <StyledText as='span' size='small' color='secondary'>{title}</StyledText>
                {actionIcon ? (
                    <ActionButton
                        variant='ghost'
                        className='sidebar-section__action'
                        aria-label={actionLabel ?? title}
                    >
                        <UiIcon className='animated' icon={actionIcon} />
                    </ActionButton>
                ) : null}
            </div>
            {children}
        </section>
    )
}

SidebarMenuSection.propTypes = {
    title: PropTypes.string.isRequired,
    actionIcon: PropTypes.elementType,
    actionLabel: PropTypes.string,
    children: PropTypes.node,
}
