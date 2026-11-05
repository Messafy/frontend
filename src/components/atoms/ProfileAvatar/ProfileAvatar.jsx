import PropTypes from 'prop-types'
import './ProfileAvatar.scss'

export default function ProfileAvatar({ initial = null }) {
    return (
        <div className='profile' aria-label='Profile'>
            {initial && <span className='profile__initial'>{initial}</span>}
        </div>
    )
}

ProfileAvatar.propTypes = {
    initial: PropTypes.string,
}
