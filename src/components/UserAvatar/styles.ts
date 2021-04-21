import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  text: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    fontSize: "2rem"
  },
  normal: {
    width: 30,
    height: 30,
  },
  lg: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));
