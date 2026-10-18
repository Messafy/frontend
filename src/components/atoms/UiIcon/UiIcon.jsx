import './UiIcon.scss';
import PropTypes from "prop-types";

export default function UiIcon({ icon: IconComponent, className = '', ...props }) {
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
UiIcon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string,
};
