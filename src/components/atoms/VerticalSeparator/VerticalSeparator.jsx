import PropTypes from 'prop-types'
import './VerticalSeparator.scss'

export default function VerticalSeparator({ className = '', ...props }) {
    const classes = ['vertical-separator', className].filter(Boolean).join(' ')

    return <span className={classes} aria-hidden='true' {...props} />
}

VerticalSeparator.propTypes = {
    className: PropTypes.string,
}
