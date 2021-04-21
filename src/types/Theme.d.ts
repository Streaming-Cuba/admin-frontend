import { TypeBackground as BaseTypeBackground } from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core" {
  interface TypeBackground extends BaseTypeBackground {      
    light: string
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    palette: {
      background: {
        light: string;
      };
    };
  }
}
