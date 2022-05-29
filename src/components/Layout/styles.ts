import {Theme, makeStyles} from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  root: {
    // display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    padding: theme.spacing(2),
    minHeight: "100vh",
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  link: {
    '&:not(:first-child)': {
      paddingLeft: 15
    }
  }
}));
