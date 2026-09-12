import PropTypes from 'prop-types'
import './AuthCard.scss'

export default function AuthCard({children}) {
    return (
        <section className='auth-card'>
            {children}
        </section>
    )
}

AuthCard.propTypes = {
    children: PropTypes.node.isRequired,
}
