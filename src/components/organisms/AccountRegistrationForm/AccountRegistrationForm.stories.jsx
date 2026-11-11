import { useState } from 'react'
import AccountRegistrationForm from './AccountRegistrationForm.jsx'

function Form(args) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [lockerPassword, setLockerPassword] = useState('')

  return (
    <div style={{ width: 380 }}>
      <AccountRegistrationForm
        {...args}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        lockerPassword={lockerPassword}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onLockerPasswordChange={setLockerPassword}
        onSubmit={(event) => event.preventDefault()}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/AccountRegistrationForm',
  component: AccountRegistrationForm,
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
      password: new Error('The password must have at least 8 characters'),
      confirmPassword: new Error('The passwords do not match'),
    },
  },
}
