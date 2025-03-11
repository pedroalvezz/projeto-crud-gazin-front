import { createTheme } from '@mui/material';
import { cyan, red, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#000000',

        },
        secondary: {
            main: red[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#000000',
        },
        background: {
            paper: '#303134',
            default: '#202124',
        },
        text: {
            primary: '#ffffffff', // Texto preto no tema claro
            secondary: '#ffffffff', // Texto secundário em cinza escuro
        }

    }
});