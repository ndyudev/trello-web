import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode:'dark', //Default is Light
    primary: {
      main: green[500]// git branch
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
        secondary: red[500]
    }
  }
})

export default theme;