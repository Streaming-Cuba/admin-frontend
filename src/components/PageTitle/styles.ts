import {Theme, makeStyles} from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  disableMarginBottom: {
    marginBottom: theme.spacing(0),
  },
  typo: {
    color: theme.palette.text.hint,
    whiteSpace: "pre"
  },
  grow: {
    flexGrow: 1
  },
  content: {
    // "& *:nth-child(n)": {
    //   marginRight: '5px'
    // }
  }
}));
