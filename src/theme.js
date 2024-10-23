import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode:'dark', //Default is Light
    primary: {
        //Debug Color ThemeJS
      main: red[550]
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