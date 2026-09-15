import PropTypes from 'prop-types'
import './Placeholder.scss'

export default function PlaceholderLine({ width = '100%', variant = 'primary' }) {
    return <div className={`placeholder-line placeholder-line--${variant}`} style={{ width }} />
}

PlaceholderLine.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    variant: PropTypes.oneOf(['primary', 'white', 'wither']),
}
