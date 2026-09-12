import PropTypes from 'prop-types'
import Text from '../../atoms/Text/Text.jsx'
import './Brand.scss'

export default function Brand({name = 'Ghost Notes', logo = 'G'}) {
    return (
        <div className='brand'>
            <div className='brand__logo'>{logo}</div>
            <Text as='span' size='body' weight='semibold'>{name}</Text>
        </div>
    )
}

Brand.propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
}
