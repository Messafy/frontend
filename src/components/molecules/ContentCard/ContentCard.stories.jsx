import ContentCard from './ContentCard.jsx'
import StyledText from '../../atoms/StyledText/StyledText.jsx'

const meta = {
  title: 'Molecules/ContentCard',
  component: ContentCard,
  tags: ['autodocs'],
  args: {
    as: 'article',
    children: (
      <>
        <StyledText as='h3' size='display' weight='semibold'>Card title</StyledText>
        <StyledText as='p' color='secondary'>Card content goes here.</StyledText>
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}

export default meta

export const Default = {}
