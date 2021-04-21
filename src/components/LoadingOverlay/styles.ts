import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '70vh',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}));

export default useStyles;