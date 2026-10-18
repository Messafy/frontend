import './IconTextLabel.scss';
import PropTypes from 'prop-types'
import UiIcon from '../UiIcon/UiIcon.jsx'
import StyledText from "../StyledText/StyledText.jsx";

export default function IconTextLabel({ icon = null, text = "", className = "", ...props })
{
    return (
        <button type="button" className={`label ${className}`} {...props}>
            {icon && <UiIcon icon={icon} />}
            <StyledText size="small" as="span">
                {text}
            </StyledText>
        </button>
    );
}

IconTextLabel.propTypes = {
    icon: PropTypes.elementType,
    text: PropTypes.string,
    className: PropTypes.string,
}
