import { createMuiTheme } from "@material-ui/core";
import { esES } from "@material-ui/data-grid";
import tinycolor from "tinycolor2";

const primary = "#5e72e4";

const lightenRate = 7.5;
const darkenRate = 15;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(darkenRate).toHexString(),
    },
    background: {
      paper: "#f7fafc",
    },
  },
  overrides: {
    MuiCard: {},
  },
}, esES);

export default theme;
