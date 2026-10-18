import PropTypes from 'prop-types'
import {IoKeyOutline, IoLockClosedOutline, IoMailOutline} from 'react-icons/io5'
import TextInput from '../../atoms/TextInput/TextInput.jsx'
import ActionButton from '../../atoms/ActionButton/ActionButton.jsx'
import UiIcon from '../../atoms/UiIcon/UiIcon.jsx'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import './AccountRegistrationForm.scss'

export default function AccountRegistrationForm({email, password, confirmPassword, lockerPassword, onEmailChange, onPasswordChange, onConfirmPasswordChange, onLockerPasswordChange, onSubmit, loading = false, errors}) {
    return (
        <form className='register-form' autoComplete='off' onSubmit={onSubmit}>
            <div className='register-form__field'>
                <StyledText as='span' size='small' color='secondary' className='register-form__label'>
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
                    aria-describedby={errors.email ? 'register-email-error' : undefined}
                >
                    <UiIcon icon={IoMailOutline} />
                </TextInput>
                {errors.email && (
                    <StyledText id='register-email-error' as='p' size='small' color='danger' role='alert'>
                        {errors.email.message}
                    </StyledText>
                )}
            </div>

            <div className='register-form__field'>
                <StyledText as='span' size='small' color='secondary' className='register-form__label'>
                    Locker password
                </StyledText>
                <StyledText as='p' size='small' color='muted' className='register-form__notice'>
                    Keep your locker password safe. You’ll need it to receive shared notes from other people.
                </StyledText>
                <TextInput
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
                    <UiIcon icon={IoKeyOutline} />
                </TextInput>
                {errors.lockerPassword && (
                    <StyledText id='register-locker-password-error' as='p' size='small' color='danger' role='alert'>
                        {errors.lockerPassword.message}
                    </StyledText>
                )}
            </div>

            <div className='register-form__field'>
                <StyledText as='span' size='small' color='secondary' className='register-form__label'>
                    Password
                </StyledText>
                <TextInput
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
                    <UiIcon icon={IoLockClosedOutline} />
                </TextInput>
                {errors.password && (
                    <StyledText id='register-password-error' as='p' size='small' color='danger' role='alert'>
                        {errors.password.message}
                    </StyledText>
                )}
            </div>

            <div className='register-form__field'>
                <StyledText as='span' size='small' color='secondary' className='register-form__label'>
                    Confirm password
                </StyledText>
                <TextInput
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
                    <UiIcon icon={IoKeyOutline} />
                </TextInput>
                {errors.confirmPassword && (
                    <StyledText id='register-confirm-password-error' as='p' size='small' color='danger' role='alert'>
                        {errors.confirmPassword.message}
                    </StyledText>
                )}
            </div>

            {errors.form && (
                <StyledText as='p' size='small' color='danger' role='alert'>
                    {errors.form.message}
                </StyledText>
            )}

            <ActionButton type='submit' disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
            </ActionButton>
        </form>
    )
}

AccountRegistrationForm.propTypes = {
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
