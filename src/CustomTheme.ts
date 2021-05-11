import { createMuiTheme } from "@material-ui/core";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#266867",
      light: "#348a88",
    },
    secondary: {
      main: "#fb8800", //f9b565 nije losa, mirnija
      light: "#f8bc24",
    },

    background: {
      default: "#26686754",
    },
  },
});

export default customTheme;
