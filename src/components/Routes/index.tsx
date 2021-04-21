import React from "react";
import { Route, Switch } from "react-router";
import RouteWrapper from "./RouteWrapper";

export type RouteType = {
  path: string;
  exact: boolean;
  redirect?: boolean;
  redirectTo?: string;
  component?: React.ComponentType<any>;
  guards?: Array<() => boolean> | false;
  guardsRedirect?: string;
  [item: string]: any;
};

export interface RoutersProps {
  routes: RouteType[];
}

function Routes(props: RoutersProps): JSX.Element {
  const { routes } = props;
  return (
    <Switch>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            render={(props: any) => <RouteWrapper route={route} {...props} />}
          />
        );
      })}
    </Switch>
  );
}

export default Routes;
