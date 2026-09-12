import PropTypes from 'prop-types';
import './Tag.scss';
import Text from '../Text/Text.jsx';

export default function Tag({ children }) {
    return (
        <Text as='span' className='tag'>
            {children}
        </Text>
    )
}

Tag.propTypes = {
    children: PropTypes.node,
};
