// Chương Trình Chạy File Này Đầu Tiên.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import './theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline/>
    <App />
  </StrictMode>,
)