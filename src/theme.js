import { createTheme } from '@mui/material/styles';
import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { red } from '@mui/material/colors';
import { dark } from '@mui/material/styles/createPalette';

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                // primary: {
                //     main: '#ff5252'
                // }
            }
        },
        dark: {
            palette: {
                // primary: {
                //     // main: '#000'
                // }
            }
        }
    },
  // ... các thuộc tính khác của theme
});

export default theme