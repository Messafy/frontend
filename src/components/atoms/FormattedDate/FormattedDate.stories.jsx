import FormattedDate from './FormattedDate.jsx'

const meta = {
  title: 'Atoms/FormattedDate',
  component: FormattedDate,
  tags: ['autodocs'],
  args: { date: '2026-11-11', type: 'reduce' },
  argTypes: { type: { control: 'inline-radio', options: ['reduce', 'complete'] } },
}

export default meta

export const Reduced = {}
export const Complete = { args: { type: 'complete' } }
