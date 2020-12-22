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

import Product from "./components/product/product";
import ProductEditForm from "./components/product/productEditForm";
import ProductForm from "./components/product/productForm";

import Sales from "./components/sales/sales";
import SalesEditForm from "./components/sales/salesEditForm";
import SalesForm from "./components/sales/salesForm";
import Users from './components/users/users'



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
      {location.pathname !== "/login" &&  (
        <Navbar />
      )}
      <Route exact path='/login' component={SignIn} />
      <PrivateRoute exact path='/signup' component={SignUp} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      
      <PrivateRoute exact path='/products' component={Product} />
      <PrivateRoute exact path='/products/add' component={ProductForm} />
      <PrivateRoute exact path='/products/edit' component={ProductEditForm} />

      <PrivateRoute exact path='/sales' component={Sales} />
      <PrivateRoute exact path='/sales/add' component={SalesForm} />
      <PrivateRoute exact path='/sales/edit' component={SalesEditForm} />

      <PrivateRoute exact path='/users' component={Users} />
      
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
