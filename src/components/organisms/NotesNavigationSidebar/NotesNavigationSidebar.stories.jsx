import { useState } from 'react'
import NotesNavigationSidebar from './NotesNavigationSidebar.jsx'

function Sidebar({ initialFilter, account }) {
  const [filter, setFilter] = useState(initialFilter)

  return (
    <div style={{ width: 260, height: 520 }}>
      <NotesNavigationSidebar activeFilter={filter} onSelectFilter={setFilter} account={account} />
    </div>
  )
}

const meta = {
  title: 'Organisms/NotesNavigationSidebar',
  component: NotesNavigationSidebar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { initialFilter: 'all', account: { email: 'luis@example.com', publicCode: 'LUIS-4821' } },
  render: (args) => <Sidebar {...args} />,
}

export default meta

export const Default = {}
export const InboxSelected = { args: { initialFilter: 'inbox' } }
export const WithoutAccount = { args: { account: undefined } }
