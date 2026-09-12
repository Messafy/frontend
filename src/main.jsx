import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import App from './app/App.jsx'
import Title from "./components/atoms/Title/Title.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
      <Title/>
  </StrictMode>,
)
