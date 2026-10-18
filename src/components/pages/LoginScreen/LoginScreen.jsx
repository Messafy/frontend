
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthFooterMessage from '../../molecules/AuthFooterMessage/AuthFooterMessage.jsx'
import AuthenticationPageHeader from '../../organisms/AuthenticationPageHeader/AuthenticationPageHeader.jsx'
import AuthenticationCard from '../../organisms/AuthenticationCard/AuthenticationCard.jsx'
import LoginCredentialsForm from '../../organisms/LoginCredentialsForm/LoginCredentialsForm.jsx'
import NavigationLink from '../../atoms/NavigationLink/NavigationLink.jsx'

import { useAuth } from '../../../context/authContext.js'
import { API_URL } from '../../../utils/apiUrl.js'

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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        setError((currentError) => ({
            ...currentError,
            email: emailRegex.test(value) ? null : new Error('Invalid email address'),
            form: null,
        }))
        setEmail(value)
    }

    function handlePasswordChange(value) {
        const hasValidLength = value.length >= 8 && value.length <= 128;
        const hasNumber = /\d/.test(value);
        const hasSpecialCharacter = /[^\p{L}\p{N}\s]/u.test(value);

        setError((currentError) => ({
            ...currentError,
            password: !hasValidLength || !hasNumber || !hasSpecialCharacter
                ? new Error(
                    'Password must be 8–128 characters and contain a number and a special character'
                )
                : null,
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
            const loginResponse = await fetch(
                `${API_URL}/v1/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        rawPassword: password,
                    }),
                }
            )

            if (!loginResponse.ok) {
                const errorData = await parseResponse(loginResponse)

                throw new Error(
                    errorData?.message ?? 'Login failed'
                )
            }

            const loginData = await loginResponse.json()

            const accountResponse = await fetch(
                `${API_URL}/v1/accounts/me`,
                {
                    headers: {
                        Authorization: `Bearer ${loginData.token}`,
                    },
                }
            )

            if (!accountResponse.ok) {
                const errorData = await parseResponse(accountResponse)

                throw new Error(
                    errorData?.message ?? 'Failed to fetch account'
                )
            }

            const accountData = await accountResponse.json()

            const session = {
                token: loginData.token,

                account: {
                    id: accountData.id,
                    email: accountData.email,
                    publicCode: accountData.publicCode,
                    role: accountData.role,
                    status: accountData.status,
                    verified: accountData.verified,
                    createdAt: accountData.createdAt,
                    lastLoginAt: accountData.lastLoginAt,
                },
            }

            login(session)

            navigate('/notes', {
                replace: true,
            })
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

async function parseResponse(response) {
    const text = await response.text()

    if (!text) {
        return null
    }

    try {
        return JSON.parse(text)
    } catch {
        return {
            message: text,
        }
    }
}
