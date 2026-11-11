import { useState } from 'react'
import LoginCredentialsForm from './LoginCredentialsForm.jsx'

function Form(args) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ width: 380 }}>
      <LoginCredentialsForm
        {...args}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={(event) => event.preventDefault()}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/LoginCredentialsForm',
  component: LoginCredentialsForm,
  tags: ['autodocs'],
  args: { loading: false, errors: {} },
  render: (args) => <Form {...args} />,
}

export default meta

export const Default = {}
export const Loading = { args: { loading: true } }
export const WithErrors = {
  args: {
    errors: {
      email: new Error('Enter a valid email address'),
      password: new Error('Incorrect password'),
    },
  },
}
