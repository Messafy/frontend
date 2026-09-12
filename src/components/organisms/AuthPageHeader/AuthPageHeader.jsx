import PropTypes from 'prop-types'
import Text from '../../atoms/Text/Text.jsx'
import './AuthPageHeader.scss'

export default function AuthPageHeader({title, subtitle}) {
    return (
        <header className='auth-page-header'>
            <Text as='h1' size='h1' weight='bold'>{title}</Text>
            {subtitle ? (
                <Text as='p' size='body' color='secondary'>{subtitle}</Text>
            ) : null}
        </header>
    )
}

AuthPageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
}
