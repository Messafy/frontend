import '@fontsource-variable/inter/opsz.css'
import '../src/styles/globals.scss'

const preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      options: { app: { name: 'Messafy', value: '#08090a' } },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'app' },
  },
}

export default preview
