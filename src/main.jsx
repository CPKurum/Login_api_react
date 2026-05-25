import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 🌙 Inicializar tema
const theme = localStorage.getItem('theme') || 'dark'
document.documentElement.classList.toggle('dark', theme === 'dark')
localStorage.setItem('theme', theme)  // if (!localStorage.getItem('theme')) // antes de localStorage.__

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)