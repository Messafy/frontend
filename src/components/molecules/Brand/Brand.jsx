import PropTypes from 'prop-types'
import logo from '../../../assets/messafy_logo.webp'
import './Brand.scss'

export default function Brand({name = 'Messafy', logo: logoSrc = logo}) {
    return (
        <img src={logoSrc} alt={name} className='brand' />
    )
}

Brand.propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
}
