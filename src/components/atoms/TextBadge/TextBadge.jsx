import PropTypes from 'prop-types'
import './TextBadge.scss'
import StyledText from '../StyledText/StyledText.jsx'

export default function TextBadge ({ text, children }) {
    return (
        <StyledText as='span' className='badge'>
            {children ?? text}
        </StyledText>
    )
}

TextBadge.propTypes = {
    children: PropTypes.node,
    text: PropTypes.node,
}
