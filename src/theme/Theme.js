import { createMuiTheme } from '@material-ui/core/styles';

export const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#F72A1F"
        },
        secondary: {
            main: "#DA1F26"
        }
    },
    typography: {
        fontFamily: "'Poppins',sans-serif",
        h1: {
            fontSize: "1.5rem",
            fontWeight: "500"
        },
        h2: {
            fontSize: "2rem",
            fontWeight: "400"
        },
        h3: {
            fontSize: "2.15rem"
        },
        h4: {
            fontSize: "6rem",
            fontWeight: "500"
        },
        subtitle1: {
            fontSize: "1.3rem"
        },
        body1: {
            fontSize: "0.9rem"
        },
    }

});

