import PropTypes from 'prop-types';
import './Tag.scss';

export default function Tag({ children }) {
    return (
        <div className="tag">
            {children}
        </div>
    )
}

Tag.propTypes = {
    children: PropTypes.node,
};
