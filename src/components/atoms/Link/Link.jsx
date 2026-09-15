import PropTypes from 'prop-types'
import './Link.scss'
import Text from '../Text/Text.jsx'

export default function Link({ children, href, rel, target, ...props}) {
    const safeRel = target === '_blank' ? rel ?? 'noreferrer' : rel

    return (
        <a
            className='link'
            href={href}
            rel={safeRel}
            target={target}
            {...props}
        >
            <Text as='span' size='link' weight='medium' color='inherit'>
                {children}
            </Text>
        </a>
    )
}

Link.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string.isRequired,
    rel: PropTypes.string,
    target: PropTypes.string,
}