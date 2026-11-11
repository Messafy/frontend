import TagList from './TagList.jsx'
import RemovableTag from '../../atoms/RemovableTag/RemovableTag.jsx'

const tags = ['Odoo', 'OCA', 'Accounting', 'Inventory', 'Sales', 'Projects', 'HR']

const meta = {
  title: 'Molecules/TagList',
  component: TagList,
  tags: ['autodocs'],
  args: { maxLength: 5 },
  render: (args) => (
    <TagList {...args}>
      {tags.map((tag) => <RemovableTag key={tag}>{tag}</RemovableTag>)}
    </TagList>
  ),
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export default meta

export const Default = {}
export const ShowingThree = { args: { maxLength: 3 } }
export const AllVisible = { args: { maxLength: 10 } }
