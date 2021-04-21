import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: "100vh",
    height: "100vh",
    background: `linear-gradient(150deg, ${theme.palette.primary.dark} 40%, ${theme.palette.primary.main} 95%)`,
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
