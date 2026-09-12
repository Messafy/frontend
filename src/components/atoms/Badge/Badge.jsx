import PropTypes from 'prop-types'
import './Badge.scss'

export default function Badge ({ text, children }) {
    return (
        <span className='badge'>
            {children ?? text}
        </span>
    )
}

Badge.propTypes = {
    children: PropTypes.node,
    text: PropTypes.node,
}
