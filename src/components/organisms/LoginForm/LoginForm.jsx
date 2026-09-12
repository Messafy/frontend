import PropTypes from 'prop-types'
import Input from '../../atoms/Input/Input.jsx'
import Button from '../../atoms/Button/Button.jsx'
import './LoginForm.scss'

export default function LoginForm({email, password, onEmailChange, onPasswordChange, onSubmit, loading = false}) {
    return (
        <form className='login-form' onSubmit={onSubmit}>
            <Input
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                disabled={loading}
            />
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                disabled={loading}
            />
            <Button type='submit' disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
            </Button>
        </form>
    )
}

LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
}
