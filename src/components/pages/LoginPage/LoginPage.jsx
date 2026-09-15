
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Brand from '../../molecules/Brand/Brand.jsx'
import AuthFooterNote from '../../molecules/AuthFooterNote/AuthFooterNote.jsx'
import AuthPageHeader from '../../organisms/AuthPageHeader/AuthPageHeader.jsx'
import AuthCard from '../../organisms/AuthCard/AuthCard.jsx'
import LoginForm from '../../organisms/LoginForm/LoginForm.jsx'
import Link from '../../atoms/Link/Link.jsx'

import { useAuth } from '../../../context/authContext.js'

import './LoginPage.scss'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)

        try {
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
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='login-page'>
            <AuthCard>
                <AuthPageHeader
                    title='Welcome back'
                    subtitle='Sign in to continue writing your notes.'
                />

                <LoginForm
                    email={email}
                    password={password}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onSubmit={handleSubmit}
                    loading={loading}
                />

                <AuthFooterNote>
                    New here? <Link href='/register'>Create an account</Link>
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
