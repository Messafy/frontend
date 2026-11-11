import ToastNotification from './ToastNotification.jsx'

const meta = {
  title: 'Molecules/ToastNotification',
  component: ToastNotification,
  tags: ['autodocs'],
  args: { title: 'Note saved', children: 'Your changes have been saved.', onClose: () => {} },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export default meta

export const Default = {}
export const WithoutTitle = { args: { title: undefined } }
