import React from "react";
import { ifAuthenticated } from "./../utils/localStorage";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({
  component: Component,
  path,
  exact = false,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      ifAuthenticated() ? (
        <Component {...rest} {...props}></Component>
      ) : (
        <Redirect to="/"></Redirect>
      )
    }
  ></Route>
);

export default ProtectedRoute;
