import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import WorkingMessage from "../../components/WorkingMessage";

export default function Dashboard(props: any) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <PageTitle title="Dashboard"/>

      <WorkingMessage/>
    </>
  );
}
