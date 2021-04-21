import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import useStyles from './styles';
import PageTitle from "../../../components/PageTitle";

export default function Settings() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <PageTitle title="Configuración"/>
    </>
  );
}
