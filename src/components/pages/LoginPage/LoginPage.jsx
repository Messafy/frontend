import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        const request = {
            email,
            rawPassword: password,
        }

        fetch('http://localhost:8080/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
            .then(response =>
                response.text().then(text => {
                    const data = text ? JSON.parse(text) : null

                    if (!response.ok) {
                        throw data ?? new Error('Login failed')
                    }

                    return data
                })
            )
            .then(data => {
                localStorage.setItem('token', data.token)

                navigate('/notes')
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }

    return (
        <main className='login-page'>
            <section className='login-page__card'>

                <div className='login-page__brand'>
                    <div className='login-page__logo'>G</div>

                    <Text
                        as='span'
                        size='body'
                        weight='semibold'
                    >
                        Ghost Notes
                    </Text>
                </div>

                <div className='login-page__header'>
                    <Text
                        as='h1'
                        size='h1'
                        weight='bold'
                    >
                        Welcome back
                    </Text>

                    <Text
                        as='p'
                        size='body'
                        color='secondary'
                    >
                        Sign in to continue writing your notes.
                    </Text>
                </div>

                <form
                    className='login-page__form'
                    onSubmit={handleSubmit}
                >
                    <Input
                        type='email'
                        placeholder='Email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type='submit'>
                        Sign in
                    </Button>
                </form>

                <Text
                    as='p'
                    size='small'
                    color='secondary'
                    align='center'
                >
                    No account yet? Create one later when auth is ready.
                </Text>

            </section>
        </main>
    )
}