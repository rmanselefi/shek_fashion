// @ts-ignore
import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Orders from "../layout/orders";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { RouteComponentProps } from "react-router-dom";
import ReportTable from "./reportTable";
import { FormControl, InputLabel, Select } from "@material-ui/core";

import ReportTotalCard from "./reportTotalCard";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
  fixedHeight: {
    height: 240,
  },
  depositContext: {
    flex: 1,
  },
}));

interface reportProps extends RouteComponentProps {
  sales: any;
  location: any;
}

const Report: React.FC<reportProps> = ({ sales, location }) => {
  const classes = useStyles();
  // const branch = location.state.branch;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [branch, setBranch] = useState("");
  const handleBranchSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.value as string;
    setBranch(name);
  };
  var filteredElements = null;
  if (sales != null) {
    filteredElements = sales.filter((object: any) => {
      return object.branch.toLowerCase().indexOf(branch.toLowerCase()) !== -1;
    });
  }

  

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Branch
              </InputLabel>
              <Select
                native
                id="branch"
                onChange={handleBranchSelectChange}
                label="Branch"
                name="branch"
                value={branch}
                inputProps={{
                  name: "branch",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value="branch-1">branch-1</option>
                <option value="branch-2">branch-2</option>
                <option value="branch-3">branch-3</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} md={4} lg={4}>
              <ReportTotalCard sales={filteredElements} day={"Daily"} />
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <ReportTotalCard sales={filteredElements} day={"Weekly"} />
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <ReportTotalCard sales={filteredElements} day={"Monthly"} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders sales={filteredElements} />
              </Paper>
            </Grid>
          </Grid>
         
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={6} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <ReportTable sales={filteredElements} day={"Daily"} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={6} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <ReportTable sales={filteredElements} day={"Weekly"} />
              </Paper>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <ReportTable sales={filteredElements} day={"Monthly"} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
           
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  sales: state.firestore.ordered.sales,
});

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
    {
      collection: "sales",
    },
  ])
)(Report);
