import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";

export default function Dashboard(props: any) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <PageTitle title="Dashboard">
        <Button variant="contained" size="medium" color="secondary">
          Latest Reports
        </Button>
      </PageTitle>
    </>
  );
}
