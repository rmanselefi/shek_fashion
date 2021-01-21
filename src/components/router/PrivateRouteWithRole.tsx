import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

interface routeProps extends RouteProps {
  auth?: any;
  component: any;
  role?:any;
}

const PrivateRouteWithRole: FC<routeProps> = ({
  component: Component,
  auth,
  role,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoaded(auth) && !isEmpty(auth)&&role==='admin') {
          return <Component {...props} />;
        }

        // not authorised so return to login
        return (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  role: state.firebase.profile.role,
});

export default connect(mapStateToProps, null)(PrivateRouteWithRole);
