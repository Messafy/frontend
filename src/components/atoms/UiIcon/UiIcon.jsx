import PropTypes from 'prop-types'
import './UiIcon.scss'

export default function UiIcon({ icon: IconComponent, className = '', ...props }) {
    const classes = ['icon', className].filter(Boolean).join(' ')

    return <IconComponent className={classes} {...props} />
}

UiIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string,
}
