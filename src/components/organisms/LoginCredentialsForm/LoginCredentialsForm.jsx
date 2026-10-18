import PropTypes from 'prop-types'
import {IoLockClosedOutline, IoMailOutline} from 'react-icons/io5'
import TextInput from '../../atoms/TextInput/TextInput.jsx'
import ActionButton from '../../atoms/ActionButton/ActionButton.jsx'
import UiIcon from '../../atoms/UiIcon/UiIcon.jsx'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import './LoginCredentialsForm.scss'

export default function LoginCredentialsForm({email, password, onEmailChange, onPasswordChange, onSubmit, loading = false, errors}) {
    return (
        <form className='login-form' autoComplete='off' onSubmit={onSubmit}>
            <div className='login-form__field'>
                <StyledText as='span' size='small' color='secondary' className='login-form__label'>
                    Email address
                </StyledText>
                <TextInput
                    required
                    type='email'
                    placeholder='you@example.com'
                    aria-label='Email address'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    disabled={loading}
                    error={errors.email}
                    aria-describedby={errors.email ? 'login-email-error' : undefined}
                >
                    <UiIcon icon={IoMailOutline} />
                </TextInput>
                {errors.email && (
                    <StyledText id='login-email-error' as='p' size='small' color='danger' role='alert'>
                        {errors.email.message}
                    </StyledText>
                )}
            </div>

            <div className='login-form__field'>
                <StyledText as='span' size='small' color='secondary' className='login-form__label'>
                    Password
                </StyledText>
                <TextInput
                    required
                    type='password'
                    placeholder='••••••••'
                    aria-label='Password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    disabled={loading}
                    error={errors.password}
                    aria-describedby={errors.password ? 'login-password-error' : undefined}
                >
                    <UiIcon icon={IoLockClosedOutline} />
                </TextInput>
                {errors.password && (
                    <StyledText id='login-password-error' as='p' size='small' color='danger' role='alert'>
                        {errors.password.message}
                    </StyledText>
                )}
            </div>

            {errors.form && (
                <StyledText as='p' size='small' color='danger' role='alert'>
                    {errors.form.message}
                </StyledText>
            )}

            <ActionButton type='submit' disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
            </ActionButton>
        </form>
    )
}

LoginCredentialsForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    errors: PropTypes.shape({
        email: PropTypes.instanceOf(Error),
        password: PropTypes.instanceOf(Error),
        form: PropTypes.instanceOf(Error),
    }).isRequired,
}
