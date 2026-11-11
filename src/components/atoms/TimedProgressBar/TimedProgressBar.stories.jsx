import TimedProgressBar from './TimedProgressBar.jsx'

const meta = {
  title: 'Atoms/TimedProgressBar',
  component: TimedProgressBar,
  tags: ['autodocs'],
  args: { duration: 5000 },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}

export default meta

export const Default = {}
export const Short = { args: { duration: 2000 } }
