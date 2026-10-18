import PropTypes from 'prop-types'
import UiIcon from '../UiIcon/UiIcon.jsx'
import './ActionButton.scss'

export default function ActionButton({children, icon = null, variant = 'primary', type = 'button', className = '', ...props}) {
    const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ')

    return (
        <button className={classes} type={type} {...props}>
            {icon ? <UiIcon icon={icon} /> : null}
            {children}
        </button>
    )
}

ActionButton.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.elementType,
    variant: PropTypes.oneOf(['primary', 'ghost', 'save']),
    type: PropTypes.string,
    className: PropTypes.string,
}
