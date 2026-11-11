import AuthenticationCard from './AuthenticationCard.jsx'
import AuthenticationPageHeader from '../AuthenticationPageHeader/AuthenticationPageHeader.jsx'
import AuthFooterMessage from '../../molecules/AuthFooterMessage/AuthFooterMessage.jsx'

const meta = {
  title: 'Organisms/AuthenticationCard',
  component: AuthenticationCard,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <AuthenticationPageHeader title='Welcome back' subtitle='Sign in to your notes' />
        <AuthFooterMessage>Your notes are encrypted and only visible to you.</AuthFooterMessage>
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
}

export default meta

export const Default = {}
