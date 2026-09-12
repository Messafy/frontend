import PropTypes from 'prop-types'
import Icon from '../Icon/Icon.jsx'
import './Button.scss'

export default function Button({children, icon = null, variant = 'primary', type = 'button', className = '', ...props}) {
    const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ')

    return (
        <button className={classes} type={type} {...props}>
            {icon ? <Icon icon={icon} /> : null}
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.elementType,
    variant: PropTypes.oneOf(['primary', 'ghost', 'icon']),
    type: PropTypes.string,
    className: PropTypes.string,
}
