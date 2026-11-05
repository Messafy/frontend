import { useState } from 'react'

import AuthFooterMessage from '../../molecules/AuthFooterMessage/AuthFooterMessage.jsx'
import ToastNotification from '../../molecules/ToastNotification/ToastNotification.jsx'
import AuthenticationPageHeader from '../../organisms/AuthenticationPageHeader/AuthenticationPageHeader.jsx'
import AuthenticationCard from '../../organisms/AuthenticationCard/AuthenticationCard.jsx'
import AccountRegistrationForm from '../../organisms/AccountRegistrationForm/AccountRegistrationForm.jsx'
import NavigationLink from '../../atoms/NavigationLink/NavigationLink.jsx'

import { useAuth } from '../../../context/authContext.js'
import {
    isValidEmail,
    loginAndLoadSession,
    registerAccount,
    validateLockerPassword,
    validatePassword,
} from '../../../utils/authApi.js'

import './RegistrationScreen.scss'

export default function RegistrationScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [lockerPassword, setLockerPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        lockerPassword: null,
        form: null,
    })

    const { login } = useAuth()

    function handleEmailChange(value) {
        setError((currentError) => ({
            ...currentError,
            email: isValidEmail(value) ? null : new Error('Invalid email address'),
            form: null,
        }))
        setEmail(value)
    }

    function handlePasswordChange(value) {
        const message = validatePassword(value)

        setError((currentError) => ({
            ...currentError,
            password: message ? new Error(message) : null,
            form: null,
        }))
        setPassword(value)
    }

    function handleConfirmPasswordChange(value) {
        setError((currentError) => ({
            ...currentError,
            confirmPassword: value === password ? null : new Error('Passwords do not match'),
            form: null,
        }))
        setConfirmPassword(value)
    }

    function handleLockerPasswordChange(value) {
        const message = validateLockerPassword(value)

        setError((currentError) => ({
            ...currentError,
            lockerPassword: message ? new Error(message) : null,
            form: null,
        }))
        setLockerPassword(value)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (error.email || error.password || error.confirmPassword || error.lockerPassword) {
            return
        }

        setLoading(true)

        try {
            await registerAccount({ email, password, lockerPassword })
            setNotification({
                title: 'Verification email sent',
                message: `Check ${email} for a link to activate your account.`,
            })
            login(await loginAndLoadSession({ email, password }))
        } catch (error) {
            console.error('Register error:', error)
            setError((currentError) => ({
                ...currentError,
                form: error instanceof Error ? error : new Error('Registration failed'),
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='register-page'>
            <AuthenticationCard>
                <AuthenticationPageHeader
                    title='Create your account'
                    subtitle='Sign up to start writing your notes.'
                />

                <AccountRegistrationForm
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    lockerPassword={lockerPassword}
                    onEmailChange={handleEmailChange}
                    onPasswordChange={handlePasswordChange}
                    onConfirmPasswordChange={handleConfirmPasswordChange}
                    onLockerPasswordChange={handleLockerPasswordChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    errors={error}
                />

                <AuthFooterMessage>
                    Already have an account? <NavigationLink href='/login'>Sign in</NavigationLink>
                </AuthFooterMessage>
            </AuthenticationCard>

            {notification && (
                <ToastNotification
                    title={notification.title}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </ToastNotification>
            )}
        </main>
    )
}
