import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import NotePage from "./components/pages/NotePage/NotePage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotePage/>
  </StrictMode>,
)
