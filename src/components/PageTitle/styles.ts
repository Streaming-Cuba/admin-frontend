import {makeStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  typo: {
    color: theme.palette.text.hint,
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
