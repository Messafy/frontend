import './Icon.scss';
import PropTypes from "prop-types";

export default function Icon({ icon: IconComponent, className = '', ...props }) {
    const classTypes = [
        'static',
        'animated',
        'bubble',
    ]

    return <IconComponent className={`icon icon--${classTypes.includes(className) ? className : 'static'}`} {...props} />;
}
Icon.propTypes = {
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string,
};
