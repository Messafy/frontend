import './Label.scss';
import PropTypes from 'prop-types'
import Icon from '../Icon/Icon.jsx'
import Text from "../Text/Text.jsx";

export default function Label({ icon = null, text = "", className = "" })
{
    return (
        <div className={`label ${className}`}>
            {icon && <Icon icon={icon} />}
            <Text size="small" as="span">
                {text}
            </Text>
        </div>
    );
}

Label.propTypes = {
    icon: PropTypes.elementType,
    text: PropTypes.string,
    className: PropTypes.string,
}
