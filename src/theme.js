import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    AppBarHeight: '58px',
    BoardBarHeight: '60px',
  },
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': {borderWidth:'1px'}
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.785rem'}
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': {borderWidth: '0.5px !important'},
          '&:hover fieldset': {borderWidth: '1px !important'},
          '&.Mui-focused fieldset': {borderWidth: '1px !important'},
        }
      }
    }
  }
})
// ...orther properies

export default theme
