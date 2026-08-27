import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './common/index/index.scss'
import Input from "./components/atoms/input/input.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Input/>
  </StrictMode>,
)
