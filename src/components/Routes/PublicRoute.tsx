import {Redirect, Route, RouteComponentProps} from "react-router";
import {useTypedSelector} from "../../redux";
import React from "react";

function PublicRoute(props: PublicRouteProps) {

  const {component, ...rest} = props;
  const isAuthenticated = useTypedSelector(state => state.account.token);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
}

interface PublicRouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  [items: string]: any;
}

export default PublicRoute;