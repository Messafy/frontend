
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthFooterNote from '../../molecules/AuthFooterNote/AuthFooterNote.jsx'
import AuthPageHeader from '../../organisms/AuthPageHeader/AuthPageHeader.jsx'
import AuthCard from '../../organisms/AuthCard/AuthCard.jsx'
import RegisterForm from '../../organisms/RegisterForm/RegisterForm.jsx'
import Link from '../../atoms/Link/Link.jsx'

import { useAuth } from '../../../context/authContext.js'

import './RegisterPage.scss'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        email: null,
        password: null,
        confirmPassword: null,
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

    function handleConfirmPasswordChange(value) {
        setError((currentError) => ({
            ...currentError,
            confirmPassword: value === password ? null : new Error('Passwords do not match'),
            form: null,
        }))

        setConfirmPassword(value)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (error.email || error.password || error.confirmPassword) {
            return
        }

        setLoading(true)

        try {
            const registerResponse = await fetch(
                'http://localhost:8080/v1/auth/register',
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

            if (!registerResponse.ok) {
                const errorData = await parseResponse(registerResponse)

                throw new Error(
                    errorData?.message ?? 'Registration failed'
                )
            }

            const loginResponse = await fetch(
                'http://localhost:8080/v1/auth/login',
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
                'http://localhost:8080/v1/accounts/me',
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
            <AuthCard>
                <AuthPageHeader
                    title='Create your account'
                    subtitle='Sign up to start writing your notes.'
                />

                <RegisterForm
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    onEmailChange={handleEmailChange}
                    onPasswordChange={handlePasswordChange}
                    onConfirmPasswordChange={handleConfirmPasswordChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    errors={error}
                />

                <AuthFooterNote>
                    Already have an account? <Link href='/login'>Sign in</Link>
                </AuthFooterNote>
            </AuthCard>
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
