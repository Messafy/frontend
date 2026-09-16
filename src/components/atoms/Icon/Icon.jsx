import './Icon.scss';
import PropTypes from "prop-types";

export default function Icon({ icon: IconComponent, className = '', ...props }) {
    const variants = [
        'static',
        'animated',
    ]

    const isVariant = variants.includes(className)

    const classes = [
        'icon',
        `icon--${isVariant ? className : 'static'}`,
        !isVariant && className,
    ].filter(Boolean).join(' ')

    return <IconComponent className={classes} {...props} />;
}
Icon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string,
};
