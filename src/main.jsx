// Chương Trình Chạy File Này Đầu Tiên.
// import React from 'react'
import ReactDom from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'

// Cau hinh react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

ReactDom.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: 'lg'},
        buttonOrder: ['confirm', 'cancel'],
        confirmationButtonProps: { color: 'success', variant: 'outlined' },
        cancellationButtonProps: { color: 'primary' }   
      }}>
        <CssBaseline/>
        <App />
        <ToastContainer theme= "colored" position= "bottom-left" />
      </ConfirmProvider>
    </CssVarsProvider>
  // {/* </React.StrictMode>, */}
)
