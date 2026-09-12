import PropTypes from 'prop-types';
import './Profile.scss';
import Text from '../Text/Text.jsx';

export default function Profile ({ name = 'U' }) {
    return (
      <div className='profile'>
          <Text as='span' size='small' weight='semibold'>{name.charAt(0).toUpperCase()}</Text>
      </div>
    );
}

Profile.propTypes = {
    name: PropTypes.string,
};
