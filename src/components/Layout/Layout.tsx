import React, { useEffect } from "react";
import { withRouter, useHistory, Route, Redirect } from "react-router-dom";
import clsx from "clsx";
import { useTypedSelector } from "../../redux";
import useStyles from "./styles";

import Header from "../Header";
import Sidebar from "../Sidebar";
import { Paths } from "../../pages";
import { useDispatch } from "react-redux";
import { useServerManager } from "../ServerManagerProvider";
import { setAccount } from "../../redux/reducers/account";
import PrivateRoute from "../Routes/PrivateRoute";
import Media from "../../pages/media";
import Accounts from "../../pages/security/accounts";
import Roles from "../../pages/security/roles";
import Events from "../../pages/events";
import EventDetails from "../../pages/events/event-details";
import Dashboard from "../../pages/dashboard";
import { CircularProgress, Typography } from "@material-ui/core";
import EventEdit from "../../pages/events/event-edit";
import StatisticsVotes from "../../pages/statistics/votes";
import Account from "../../pages/account/account";
import Settings from "../../pages/account/settings";

function Layout(props: LayoutProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const serverManager = useServerManager();

  const isAuthenticated = useTypedSelector(
    (state) => state.account.isAuthenticated
  );

  useEffect(() => {
    serverManager.refreshInstance();
    serverManager
      .getCurrentUserInfo()
      .then((reponse) => {
        dispatch(setAccount(reponse.data));
      })
      .catch((error) => {
        if (error?.response?.status === 401) history.push(Paths.SignIn);
      });
  }, []);

  if (!isAuthenticated)
    return (
      <div>
        <CircularProgress variant="indeterminate" />
        <Typography>Cargando....</Typography>
      </div>
    );

  return (
    <div className={classes.root}>
      <Header history={history} />

      <Sidebar />

      <div className={clsx(classes.content)}>
        <div className={classes.fakeToolbar} />
        <PrivateRoute component={Dashboard} path={Paths.Dashboard} exact/>
        <PrivateRoute component={Events} path={Paths.Events} exact/>
        <PrivateRoute component={EventDetails} path={Paths.EventDetails} exact/>
        <PrivateRoute component={EventEdit} path={Paths.EventEdit} exact/>
        <PrivateRoute component={Media} path={Paths.Media} exact/>
        <PrivateRoute component={Accounts} path={Paths.Accounts} exact/>
        <PrivateRoute component={Roles} path={Paths.Roles} exact/>
        <PrivateRoute component={StatisticsVotes} path={Paths.StatisticsVotes} exact/>
        <PrivateRoute component={Account} path={Paths.Account} exact/>
        <PrivateRoute component={Settings} path={Paths.Settings} exact/>
      </div>
    </div>
  );
}

interface LayoutProps {}

export default withRouter(Layout);
