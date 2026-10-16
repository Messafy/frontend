import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter/opsz.css'
import '@fontsource/jetbrains-mono/400.css'
import './styles/globals.scss'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
