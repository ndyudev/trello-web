import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { deepOrange, orange, cyan, teal } from '@mui/material/colors'

//Create a theme instance.
const theme = extendTheme({
    trello: {
        AppBarHeight:'48px',
        BoardBarHeight:'58px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange,
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange
            },
        }
    }
    // ...other properties
})

export default theme