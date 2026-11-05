import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthFooterMessage from '../../molecules/AuthFooterMessage/AuthFooterMessage.jsx'
import AuthenticationPageHeader from '../../organisms/AuthenticationPageHeader/AuthenticationPageHeader.jsx'
import AuthenticationCard from '../../organisms/AuthenticationCard/AuthenticationCard.jsx'
import LoginCredentialsForm from '../../organisms/LoginCredentialsForm/LoginCredentialsForm.jsx'
import NavigationLink from '../../atoms/NavigationLink/NavigationLink.jsx'

import { useAuth } from '../../../context/authContext.js'
import { isValidEmail, loginAndLoadSession, validatePassword } from '../../../utils/authApi.js'

import './LoginScreen.scss'

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        email: null,
        password: null,
        form: null,
    })

    const navigate = useNavigate()
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

    async function handleSubmit(event) {
        event.preventDefault()

        if (error.email || error.password) {
            return
        }

        setLoading(true)

        try {
            login(await loginAndLoadSession({ email, password }))
            navigate('/notes', { replace: true })
        } catch (error) {
            console.error('Login error:', error)
            setError((currentError) => ({
                ...currentError,
                form: error instanceof Error ? error : new Error('Login failed'),
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='login-page'>
            <AuthenticationCard>
                <AuthenticationPageHeader
                    title='Welcome back'
                    subtitle='Sign in to continue writing your notes.'
                />

                <LoginCredentialsForm
                    email={email}
                    password={password}
                    onEmailChange={handleEmailChange}
                    onPasswordChange={handlePasswordChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    errors={error}
                />

                <AuthFooterMessage>
                    New here? <NavigationLink href='/register'>Create an account</NavigationLink>
                </AuthFooterMessage>
            </AuthenticationCard>
        </main>
    )
}
