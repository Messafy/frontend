import { useState } from 'react'
import TagListEditor from './TagListEditor.jsx'

function Editor({ initialTags, placement }) {
  const [tags, setTags] = useState(initialTags)

  return (
    <div style={{ position: 'relative', width: 320, height: 280 }}>
      <TagListEditor
        tags={tags}
        placement={placement}
        onAdd={(tag) => setTags((current) => [...current, tag])}
        onRemove={(tag) => setTags((current) => current.filter((item) => item !== tag))}
        onClose={() => {}}
      />
    </div>
  )
}

const meta = {
  title: 'Molecules/TagListEditor',
  component: TagListEditor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { initialTags: ['Odoo', 'Accounting'], placement: 'below' },
  argTypes: { placement: { control: 'inline-radio', options: ['above', 'below'] } },
  render: (args) => <Editor {...args} />,
}

export default meta

export const WithTags = {}
export const Empty = { args: { initialTags: [] } }
