import './LoginPage.scss'
import Button from '../../atoms/Button/Button.jsx'
import Input from '../../atoms/Input/Input.jsx'
import Text from '../../atoms/Text/Text.jsx'

export default function LoginPage() {
    return (
        <main className='login-page'>
            <section className='login-page__card'>
                <div className='login-page__brand'>
                    <div className='login-page__logo'>G</div>
                    <Text as='span' size='body' weight='semibold'>Ghost Notes</Text>
                </div>

                <div className='login-page__header'>
                    <Text as='h1' size='h1' weight='bold'>Welcome back</Text>
                    <Text as='p' size='body' color='secondary'>Sign in to continue writing your notes.</Text>
                </div>

                <form className='login-page__form'>
                    <Input type='email' placeholder='Email address' />
                    <Input type='password' placeholder='Password' />
                    <Button type='submit'>Sign in</Button>
                </form>

                <Text as='p' size='small' color='secondary' align='center'>
                    No account yet? Create one later when auth is ready.
                </Text>
            </section>
        </main>
    )
}
