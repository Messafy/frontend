import PropTypes from 'prop-types'
import {IoKeyOutline, IoLockClosedOutline, IoMailOutline} from 'react-icons/io5'
import Input from '../../atoms/Input/Input.jsx'
import Button from '../../atoms/Button/Button.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'
import Text from '../../atoms/Text/Text.jsx'
import './RegisterForm.scss'

export default function RegisterForm({email, password, confirmPassword, lockerPassword, onEmailChange, onPasswordChange, onConfirmPasswordChange, onLockerPasswordChange, onSubmit, loading = false, errors}) {
    return (
        <form className='register-form' autoComplete='off' onSubmit={onSubmit}>
            <div className='register-form__field'>
                <Text as='span' size='small' color='secondary' className='register-form__label'>
                    Email address
                </Text>
                <Input
                    required
                    type='email'
                    placeholder='you@example.com'
                    aria-label='Email address'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    disabled={loading}
                    error={errors.email}
                    aria-describedby={errors.email ? 'register-email-error' : undefined}
                >
                    <Icon icon={IoMailOutline} />
                </Input>
                {errors.email && (
                    <Text id='register-email-error' as='p' size='small' color='danger' role='alert'>
                        {errors.email.message}
                    </Text>
                )}
            </div>

            <div className='register-form__field'>
                <Text as='span' size='small' color='secondary' className='register-form__label'>
                    Locker password
                </Text>
                <Text as='p' size='small' color='muted' className='register-form__notice'>
                    Keep your locker password safe. You’ll need it to receive shared notes from other people.
                </Text>
                <Input
                    required
                    type='password'
                    placeholder='Choose a password to keep safe'
                    aria-label='Locker password'
                    autoComplete='new-password'
                    value={lockerPassword}
                    onChange={(e) => onLockerPasswordChange(e.target.value)}
                    disabled={loading}
                    error={errors.lockerPassword}
                    aria-describedby={errors.lockerPassword ? 'register-locker-password-error' : undefined}
                >
                    <Icon icon={IoKeyOutline} />
                </Input>
                {errors.lockerPassword && (
                    <Text id='register-locker-password-error' as='p' size='small' color='danger' role='alert'>
                        {errors.lockerPassword.message}
                    </Text>
                )}
            </div>

            <div className='register-form__field'>
                <Text as='span' size='small' color='secondary' className='register-form__label'>
                    Password
                </Text>
                <Input
                    required
                    type='password'
                    placeholder='••••••••'
                    aria-label='Password'
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    disabled={loading}
                    error={errors.password}
                    aria-describedby={errors.password ? 'register-password-error' : undefined}
                >
                    <Icon icon={IoLockClosedOutline} />
                </Input>
                {errors.password && (
                    <Text id='register-password-error' as='p' size='small' color='danger' role='alert'>
                        {errors.password.message}
                    </Text>
                )}
            </div>

            <div className='register-form__field'>
                <Text as='span' size='small' color='secondary' className='register-form__label'>
                    Confirm password
                </Text>
                <Input
                    required
                    type='password'
                    placeholder='••••••••'
                    aria-label='Confirm password'
                    autoComplete='new-password'
                    value={confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    disabled={loading}
                    error={errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'register-confirm-password-error' : undefined}
                >
                    <Icon icon={IoKeyOutline} />
                </Input>
                {errors.confirmPassword && (
                    <Text id='register-confirm-password-error' as='p' size='small' color='danger' role='alert'>
                        {errors.confirmPassword.message}
                    </Text>
                )}
            </div>

            {errors.form && (
                <Text as='p' size='small' color='danger' role='alert'>
                    {errors.form.message}
                </Text>
            )}

            <Button type='submit' disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
            </Button>
        </form>
    )
}

RegisterForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    lockerPassword: PropTypes.string.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onConfirmPasswordChange: PropTypes.func.isRequired,
    onLockerPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    errors: PropTypes.shape({
        email: PropTypes.instanceOf(Error),
        password: PropTypes.instanceOf(Error),
        confirmPassword: PropTypes.instanceOf(Error),
        lockerPassword: PropTypes.instanceOf(Error),
        form: PropTypes.instanceOf(Error),
    }).isRequired,
}
