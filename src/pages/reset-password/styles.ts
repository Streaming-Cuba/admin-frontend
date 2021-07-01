import { makeStyles } from "@material-ui/core";
import bg1 from '../../assets/images/bg1.webp'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: "100vh",
    height: "100vh",
    backgroundImage: `url(${bg1})`,
    backgroundSize: 'cover',
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: "center",
    fontWeight: 600,
    fontStyle: "italic",
  },
  signInButton: {
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  progress: {
      marginTop: 5,
  }
}));

export default useStyles;
