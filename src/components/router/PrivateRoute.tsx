import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

interface routeProps extends RouteProps {
  auth?: any;
  component: any;
}

const PrivateRoute: FC<routeProps> = ({
  component: Component,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoaded(auth) && !isEmpty(auth)) {
          return <Component {...props} />;
        }

        // not authorised so return to login
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, null)(PrivateRoute);
