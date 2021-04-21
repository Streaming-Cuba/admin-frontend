import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  rotating: {
    animationIterationCount: "infinite",
    animation: `$rotate 3000ms linear`,
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  dataGrid: {
    marginBottom: "10px",
  },
}));

export default useStyles;
