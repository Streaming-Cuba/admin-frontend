import { RotateLeft } from "@material-ui/icons";
import React from "react";
import { Redirect } from "react-router";
import { RouteType } from ".";

export interface RouteWrapperProps {
  route: RouteType;
}

const RouteWrapper = (props: RouteWrapperProps): JSX.Element => {
  const { route } = props;
  let ok = true;

  if (!route.guards && Array.isArray(route.guards))
    for (const guard of route.guards) {
      if (!guard()) {
        ok = false;
      }
    }

  if (route.redirect) {
    return <Redirect to={route.redirectTo || ""} />;
  }

  if (!ok) {
    return <Redirect to={route.guardsRedirect || ""} />;
  }

  if (route.component) return <route.component {...props} />;

  return <div>Empty route</div>
};

export default RouteWrapper;
