import AuthFooterMessage from './AuthFooterMessage.jsx'

const meta = {
  title: 'Molecules/AuthFooterMessage',
  component: AuthFooterMessage,
  tags: ['autodocs'],
  args: { children: 'Your notes are encrypted and only visible to you.', align: 'center' },
  argTypes: { align: { control: 'inline-radio', options: ['start', 'center', 'end'] } },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export default meta

export const Default = {}
