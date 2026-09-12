import PropTypes from 'prop-types'
import './Badge.scss'
import Text from '../Text/Text.jsx'

export default function Badge ({ text, children }) {
    return (
        <Text as='span' className='badge'>
            {children ?? text}
        </Text>
    )
}

Badge.propTypes = {
    children: PropTypes.node,
    text: PropTypes.node,
}
