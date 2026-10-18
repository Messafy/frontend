import PropTypes from 'prop-types';
import './RemovableTag.scss';
import StyledText from '../StyledText/StyledText.jsx';
import UiIcon from '../UiIcon/UiIcon.jsx';
import { LuX } from 'react-icons/lu';

export default function RemovableTag({ children, onRemove, removeLabel }) {
    return (
        <StyledText as='span' className='tag'>
            <span className='tag__label'>{children}</span>
            {onRemove && (
                <button
                    className='tag__remove'
                    type='button'
                    aria-label={removeLabel ?? `Remove ${children} tag`}
                    onClick={onRemove}
                >
                    <UiIcon icon={LuX} aria-hidden='true' />
                </button>
            )}
        </StyledText>
    )
}

RemovableTag.propTypes = {
    children: PropTypes.node,
    onRemove: PropTypes.func,
    removeLabel: PropTypes.string,
};
