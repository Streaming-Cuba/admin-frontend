import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import useStyles from "./styles";
import PageTitle from "../../../components/PageTitle";
import { useTypedSelector } from "../../../redux";
import UserAvatar from "../../../components/UserAvatar";

export default function Account() {
  const classes = useStyles();
  const theme = useTheme();

  const account = useTypedSelector((state) => state.account.account);

  return (
    <>
      <PageTitle title="Cuenta de usuario" />

      <Grid container spacing={4}>
        <Grid container item xs={12} sm={2}>
          <Grid item xs={12} sm={2}>
            <UserAvatar
              cover={account?.avatarPath}
              name={`${account?.name} ${account?.lastName}`}
              size="xl"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={10} spacing={4}>
          <Grid item xs={12} sm={5}>
            <TextField
              value={account?.name}
              label="Nombre"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              value={account?.lastName}
              label="Apellidos"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              value={account?.email}
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              value={account?.createdAt}
              label="Fecha de creación"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
