import PropTypes from 'prop-types'
import Text from '../../atoms/Text/Text.jsx'
import './AuthFooterNote.scss'

export default function AuthFooterNote({children, align = 'center'}) {
    return (
        <Text as='p' size='small' color='secondary' align={align} className='auth-footer-note'>
            {children}
        </Text>
    )
}

AuthFooterNote.propTypes = {
    children: PropTypes.node.isRequired,
    align: PropTypes.string,
}
