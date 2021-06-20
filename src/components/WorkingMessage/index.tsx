import { makeStyles, Typography } from "@material-ui/core";
import { AccountHardHat as AccountHardHatIcon } from "mdi-material-ui";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    opacity: 0.7,
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    width: "5em",
    height: "5em",
    color: theme.palette.primary.main,
  },
}));

function WorkingMessage() {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <AccountHardHatIcon className={classes.icon} />
      <Typography variant="h5" color="primary" align="center">
        Esta sección se encuentra en desarrollo. Proximamente estará disponible.
      </Typography>
    </div>
  );
}

export default WorkingMessage;
