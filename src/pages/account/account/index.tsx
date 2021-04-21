import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import useStyles from './styles';
import PageTitle from "../../../components/PageTitle";

export default function Account() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <PageTitle title="Cuenta de usuario"/>
    </>
  );
}
