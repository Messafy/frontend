import PropTypes from 'prop-types';
import './Profile.scss';

export default function Profile ({ name = 'U' }) {
    return (
      <div className='profile'>
          <span>{name.charAt(0).toUpperCase()}</span>
      </div>
    );
}

Profile.propTypes = {
    name: PropTypes.string,
};
