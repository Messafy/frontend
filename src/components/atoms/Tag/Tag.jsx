import PropTypes from 'prop-types';
import './Tag.scss';
import Text from '../Text/Text.jsx';
import Icon from '../Icon/Icon.jsx';
import { LuX } from 'react-icons/lu';

export default function Tag({ children, onRemove, removeLabel }) {
    return (
        <Text as='span' className='tag'>
            <span className='tag__label'>{children}</span>
            {onRemove && (
                <button
                    className='tag__remove'
                    type='button'
                    aria-label={removeLabel ?? `Remove ${children} tag`}
                    onClick={onRemove}
                >
                    <Icon icon={LuX} aria-hidden='true' />
                </button>
            )}
        </Text>
    )
}

Tag.propTypes = {
    children: PropTypes.node,
    onRemove: PropTypes.func,
    removeLabel: PropTypes.string,
};
