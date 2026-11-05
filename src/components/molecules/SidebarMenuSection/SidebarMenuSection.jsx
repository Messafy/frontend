import PropTypes from 'prop-types'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import './SidebarMenuSection.scss'

export default function SidebarMenuSection({ title, children }) {
    return (
        <section className='sidebar-section' aria-label={title}>
            <div className='sidebar-section__header'>
                <StyledText as='span' size='small' color='secondary'>{title}</StyledText>
            </div>
            {children}
        </section>
    )
}

SidebarMenuSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
}
