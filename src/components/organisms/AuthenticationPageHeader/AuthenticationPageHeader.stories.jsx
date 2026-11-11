import AuthenticationPageHeader from './AuthenticationPageHeader.jsx'

const meta = {
  title: 'Organisms/AuthenticationPageHeader',
  component: AuthenticationPageHeader,
  tags: ['autodocs'],
  args: { title: 'Welcome back', subtitle: 'Sign in to your notes' },
}

export default meta

export const Default = {}
export const WithoutSubtitle = { args: { subtitle: undefined } }
