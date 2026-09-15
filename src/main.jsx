import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import App from './app/App.jsx'
import Tag from "./components/atoms/Tag/Tag.jsx";
import Text from "./components/atoms/Text/Text.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
