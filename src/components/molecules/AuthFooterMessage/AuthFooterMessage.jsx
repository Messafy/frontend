import PropTypes from 'prop-types'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import './AuthFooterMessage.scss'

export default function AuthFooterMessage({children, align = 'center'}) {
    return (
        <StyledText as='p' size='small' color='secondary' align={align} className='auth-footer-note'>
            {children}
        </StyledText>
    )
}

AuthFooterMessage.propTypes = {
    children: PropTypes.node.isRequired,
    align: PropTypes.string,
}
