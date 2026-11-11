import ClampedLabelList from './ClampedLabelList.jsx'
import IconTextLabel from '../../atoms/IconTextLabel/IconTextLabel.jsx'

const labels = ['Work', 'Personal', 'Ideas', 'Recipes', 'Travel', 'Finance', 'Health']

const meta = {
  title: 'Molecules/ClampedLabelList',
  component: ClampedLabelList,
  tags: ['autodocs'],
  args: { maxLength: 5 },
  render: (args) => (
    <ClampedLabelList {...args}>
      {labels.map((label) => <IconTextLabel key={label} text={label} />)}
    </ClampedLabelList>
  ),
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
}

export default meta

export const Default = {}
export const ShowingThree = { args: { maxLength: 3 } }
