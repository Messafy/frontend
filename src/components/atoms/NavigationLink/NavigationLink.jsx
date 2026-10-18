import PropTypes from 'prop-types'
import './NavigationLink.scss'
import StyledText from '../StyledText/StyledText.jsx'

export default function NavigationLink({ children, href, rel, target, ...props}) {
    const safeRel = target === '_blank' ? rel ?? 'noreferrer' : rel

    return (
        <a
            className='link'
            href={href}
            rel={safeRel}
            target={target}
            {...props}
        >
            <StyledText as='span' size='link' weight='medium' color='inherit'>
                {children}
            </StyledText>
        </a>
    )
}

NavigationLink.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string.isRequired,
    rel: PropTypes.string,
    target: PropTypes.string,
}