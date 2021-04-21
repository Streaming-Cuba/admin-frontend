import React from 'react';
import {CircularProgress, Typography} from "@material-ui/core";
import useStyles from "./styles";

function LoadingOverlay() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress/>
      <Typography color="primary">
        Cargando...
      </Typography>
    </div>
  )
}

export default LoadingOverlay;