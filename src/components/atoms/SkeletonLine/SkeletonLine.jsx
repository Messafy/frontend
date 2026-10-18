import PropTypes from 'prop-types'
import './SkeletonLine.scss'

export default function SkeletonLine({ width = '100%', variant = 'primary' }) {
    return <div className={`placeholder-line placeholder-line--${variant}`} style={{ width }} />
}

SkeletonLine.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    variant: PropTypes.oneOf(['primary', 'white', 'wither']),
}
