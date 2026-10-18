import PropTypes from 'prop-types'
import './VerticalDivider.scss'

export default function VerticalDivider({ className = '', ...props }) {
    const classes = ['vertical-separator', className].filter(Boolean).join(' ')

    return <span className={classes} aria-hidden='true' {...props} />
}

VerticalDivider.propTypes = {
    className: PropTypes.string,
}
