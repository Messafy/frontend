import './Label.scss';
import PropTypes from 'prop-types'
import Icon from '../Icon/Icon.jsx'
import Text from "../Text/Text.jsx";

export default function Label({ icon = null, text = "", className = "", ...props })
{
    return (
        <button type="button" className={`label ${className}`} {...props}>
            {icon && <Icon icon={icon} />}
            <Text size="small" as="span">
                {text}
            </Text>
        </button>
    );
}

Label.propTypes = {
    icon: PropTypes.elementType,
    text: PropTypes.string,
    className: PropTypes.string,
}
