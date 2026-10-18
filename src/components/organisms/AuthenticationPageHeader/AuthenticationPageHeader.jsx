import PropTypes from 'prop-types'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import './AuthenticationPageHeader.scss'

export default function AuthenticationPageHeader({title, subtitle}) {
    return (
        <header className='auth-page-header'>
            <StyledText as='h1' size='h1' weight='bold'>{title}</StyledText>
            {subtitle ? (
                <StyledText as='p' size='body' color='secondary'>{subtitle}</StyledText>
            ) : null}
        </header>
    )
}

AuthenticationPageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
}
