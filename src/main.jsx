import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 🌙 Inicializar tema
const theme = localStorage.getItem('theme')

if (!theme) {
  localStorage.setItem('theme', 'dark')
  document.documentElement.classList.add('dark')
} else if (theme === 'dark') {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)