import React from "react";
import SignIn from "./components/auth/signin";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import SignUp from "./components/auth/signup";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/router/PrivateRoute";
import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./components/layout/navbar";
import Driver from "./components/driver/driver";
import DriverForm from "./components/driver/driver_form";
import DriverEditForm from "./components/driver/driverEditForm";
import Penalty from "./components/penalty/penalty";
import penaltyEditForm from "./components/penalty/penaltyEditForm";
import penaltyForm from "./components/penalty/penaltyForm";

import Warning from "./components/warning/warning";
import warningForm from "./components/warning/warningForm";
import warningEditForm from "./components/warning/warningEditForm";
import whistleForm from "./components/whistle/whistleForm";
import whistleEditForm from "./components/whistle/whistleEditForm";
import Whistle from "./components/whistle/whistle";

import Traffic from "./components/traffics/traffic";
import trafficEditForm from "./components/traffics/trafficEditForm";
import trafficForm from "./components/traffics/trafficForm";

interface isAuthProps {
  children: any;
}

const AuthIsLoaded: React.FC<isAuthProps> = ({ children }) => {
  const auth = useSelector((state: any) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div>
        <CircularProgress color='secondary' />
      </div>
    );
  return children;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Main = withRouter(({ location }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <Route exact path='/login' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/drivers' component={Driver} />
      <PrivateRoute exact path='/drivers/add' component={DriverForm} />
      <PrivateRoute exact path='/drivers/edit' component={DriverEditForm} />
      <PrivateRoute exact path='/penalties' component={Penalty} />
      <PrivateRoute exact path='/penalties/add' component={penaltyForm} />
      <PrivateRoute exact path='/penalties/edit' component={penaltyEditForm} />
      <PrivateRoute exact path='/warnings' component={Warning} />
      <PrivateRoute exact path='/warnings/add' component={warningForm} />
      <PrivateRoute exact path='/warnings/edit' component={warningEditForm} />

      <PrivateRoute exact path='/whistles' component={Whistle} />
      <PrivateRoute exact path='/whistles/add' component={whistleForm} />
      <PrivateRoute exact path='/whistles/edit' component={whistleEditForm} />

      <PrivateRoute exact path='/traffics' component={Traffic} />
      <PrivateRoute exact path='/traffics/add' component={trafficForm} />
      <PrivateRoute exact path='/traffics/edit' component={trafficEditForm} />
    </div>
  );
});

function App() {
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <Main />
      </AuthIsLoaded>
    </BrowserRouter>
  );
}

export default App;
