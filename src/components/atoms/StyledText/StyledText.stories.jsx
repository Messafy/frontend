import StyledText from './StyledText.jsx'

const meta = {
  title: 'Atoms/StyledText',
  component: StyledText,
  tags: ['autodocs'],
  args: { children: 'The quick brown fox jumps over the lazy dog', size: 'body', color: 'inherit' },
  argTypes: {
    size: { control: 'select', options: ['small', 'body', 'display', 'h2', 'h1'] },
    color: { control: 'select', options: ['inherit', 'secondary', 'muted', 'danger'] },
    weight: { control: 'select', options: [undefined, 'regular', 'medium', 'semibold'] },
    align: { control: 'select', options: [undefined, 'start', 'center', 'end'] },
  },
}

export default meta

export const Playground = {}
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['h1', 'h2', 'display', 'body', 'small'].map((size) => (
        <StyledText key={size} size={size}>{size} - Messafy notes</StyledText>
      ))}
    </div>
  ),
}
export const Colors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['inherit', 'secondary', 'muted', 'danger'].map((color) => (
        <StyledText key={color} color={color}>{color}</StyledText>
      ))}
    </div>
  ),
}
