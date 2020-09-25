// @ts-ignore
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import { RouteComponentProps, Link } from "react-router-dom";
import { Title } from "../layout/title";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteDriver } from "../../store/actions/driverActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    marginLeft: 20,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

interface driverProp extends RouteComponentProps {
  driver: any;
  deleteDriver: (driverId: string) => void;
}

const Driver: React.FC<driverProp> = ({
  history,
  location,
  match,
  driver,
  deleteDriver,
}) => {
  const classes = useStyles();
  const handelDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (window.confirm("are you sure you want to delete this?")) {
      await deleteDriver(id);
    }
  };
  return (
    <React.Fragment>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <Paper
              style={{
                width: "100%",
                paddingLeft: "10",
              }}>
              <Grid item xs={4} md={4} lg={4}>
                <br />
                <Button
                  variant='outlined'
                  size='medium'
                  color='primary'
                  className={classes.button}>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to='/drivers/add'>
                    Add
                  </Link>
                </Button>
              </Grid>

              <Title>Drivers</Title>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>License Number</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Issued Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {driver != null
                    ? driver.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.licensenumber}</TableCell>
                          <TableCell>{row.gender}</TableCell>
                          <TableCell>{row.issued_date}</TableCell>
                          <TableCell>{row.expiry_date}</TableCell>
                          <TableCell>
                            <Button
                              variant='outlined'
                              size='small'
                              color='primary'
                              className={classes.button}>
                              <Link
                                style={{
                                  textDecoration: "none",
                                }}
                                to={{
                                  pathname: `/drivers/edit`,
                                  state: { driver: row },
                                }}>
                                Edit
                              </Link>
                            </Button>
                            /
                            <Button
                              variant='outlined'
                              size='small'
                              color='secondary'
                              className={classes.button}
                              onClick={(e) => handelDelete(e, row.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    driver: state.firestore.ordered.driver,
  };
};
export default compose(
  connect(mapStateToProps, { deleteDriver }),
  firestoreConnect([
    {
      collection: "driver",
    },
  ])
)(Driver);
