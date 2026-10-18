
import { useState } from 'react'

import AuthFooterMessage from '../../molecules/AuthFooterMessage/AuthFooterMessage.jsx'
import ToastNotification from '../../molecules/ToastNotification/ToastNotification.jsx'
import AuthenticationPageHeader from '../../organisms/AuthenticationPageHeader/AuthenticationPageHeader.jsx'
import AuthenticationCard from '../../organisms/AuthenticationCard/AuthenticationCard.jsx'
import AccountRegistrationForm from '../../organisms/AccountRegistrationForm/AccountRegistrationForm.jsx'
import NavigationLink from '../../atoms/NavigationLink/NavigationLink.jsx'

import { useAuth } from '../../../context/authContext.js'
import { API_URL } from '../../../utils/apiUrl.js'

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

    function handleConfirmPasswordChange(value) {
        setError((currentError) => ({
            ...currentError,
            confirmPassword: value === password ? null : new Error('Passwords do not match'),
            form: null,
        }))

        setConfirmPassword(value)
    }

    function handleLockerPasswordChange(value) {
        const valid = value.length >= 8
            && value.length <= 64
            && /^[\x21-\x7E]+$/.test(value)

        setError((currentError) => ({
            ...currentError,
            lockerPassword: valid
                ? null
                : new Error('Locker password must be 8–64 printable characters with no spaces'),
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
            const registerResponse = await fetch(
                `${API_URL}/v1/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        rawPassword: password,
                        rawLockerPassword: lockerPassword,
                    }),
                }
            )

            if (!registerResponse.ok) {
                const errorData = await parseResponse(registerResponse)

                throw new Error(
                    errorData?.message ?? 'Registration failed'
                )
            }

            setNotification({
                title: 'Verification email sent',
                message: `Check ${email} for a link to activate your account.`,
            })

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
                    type='success'
                    title={notification.title}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </ToastNotification>
            )}
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
