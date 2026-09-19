import PropTypes from 'prop-types'
import {IoArrowForward, IoKeyOutline, IoLockClosedOutline, IoMailOutline} from 'react-icons/io5'
import Input from '../../atoms/Input/Input.jsx'
import Button from '../../atoms/Button/Button.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'
import Text from '../../atoms/Text/Text.jsx'
import './RegisterForm.scss'

export default function RegisterForm({email, password, confirmPassword, onEmailChange, onPasswordChange, onConfirmPasswordChange, onSubmit, loading = false, errors}) {
    return (
        <form className='register-form' onSubmit={onSubmit}>
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
                {loading ? 'Creating account...' : (
                    <>
                        Create account
                        <Icon className='register-form__arrow' icon={IoArrowForward} />
                    </>
                )}
            </Button>
        </form>
    )
}

RegisterForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onConfirmPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    errors: PropTypes.shape({
        email: PropTypes.instanceOf(Error),
        password: PropTypes.instanceOf(Error),
        confirmPassword: PropTypes.instanceOf(Error),
        form: PropTypes.instanceOf(Error),
    }).isRequired,
}
