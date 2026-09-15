import PropTypes from 'prop-types'
import {IoArrowForward, IoLockClosedOutline, IoMailOutline} from 'react-icons/io5'
import Input from '../../atoms/Input/Input.jsx'
import Button from '../../atoms/Button/Button.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'
import Text from '../../atoms/Text/Text.jsx'
import './LoginForm.scss'

export default function LoginForm({email, password, onEmailChange, onPasswordChange, onSubmit, loading = false}) {
    return (
        <form className='login-form' onSubmit={onSubmit}>
            <div className='login-form__field'>
                <Text as='span' size='small' color='secondary' className='login-form__label'>
                    Email address
                </Text>
                <Input
                    type='email'
                    placeholder='you@example.com'
                    aria-label='Email address'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    disabled={loading}
                >
                    <Icon icon={IoMailOutline} />
                </Input>
            </div>

            <div className='login-form__field'>
                <Text as='span' size='small' color='secondary' className='login-form__label'>
                    Password
                </Text>
                <Input
                    type='password'
                    placeholder='••••••••'
                    aria-label='Password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    disabled={loading}
                >
                    <Icon icon={IoLockClosedOutline} />
                </Input>
            </div>

            <Button type='submit' disabled={loading}>
                {loading ? 'Signing in...' : (
                    <>
                        Sign in
                        <Icon className='login-form__arrow' icon={IoArrowForward} />
                    </>
                )}
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