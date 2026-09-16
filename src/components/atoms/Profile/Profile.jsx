import PropTypes from 'prop-types';
import './Profile.scss';

export default function Profile ({ initial = null, size = 'md' }) {
    const classes = ['profile', size !== 'md' && `profile--${size}`]
        .filter(Boolean)
        .join(' ')

    return (
        <div className={classes} aria-label='Profile'>
            {initial && <span className='profile__initial'>{initial}</span>}
        </div>
    )
}

Profile.propTypes = {
    initial: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md']),
}
