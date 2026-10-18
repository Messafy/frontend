import PropTypes from 'prop-types'
import './AuthenticationCard.scss'

export default function AuthenticationCard({children}) {
    return (
        <section className='auth-card' aria-label='Authentication'>
            {children}
        </section>
    )
}

AuthenticationCard.propTypes = {
    children: PropTypes.node.isRequired,
}
