import './ClampedLinkList.scss'
import PropTypes from 'prop-types'
import { Children } from 'react'

export default function ClampedLinkList({ children, maxLength = 5 }) {
    const links = Children.toArray(children)

    return (
        <div className='collection-links'>
            {links.slice(0, maxLength)}
        </div>
    )
}

ClampedLinkList.propTypes = {
    children: PropTypes.node,
    maxLength: PropTypes.number,
}
