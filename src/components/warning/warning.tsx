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
import { deleteWarning } from "../../store/actions/warningActions";

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

interface warningProp extends RouteComponentProps {
  warning: any;
  deleteWarning: (warningId: string) => void;
}

const Warning: React.FC<warningProp> = ({
  history,
  location,
  match,
  warning,
  deleteWarning,
}) => {
  const classes = useStyles();
  const handelDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (window.confirm("are you sure you want to delete this?")) {
      await deleteWarning(id);
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
                    to='/warnings/add'>
                    Register
                  </Link>
                </Button>
              </Grid>

              <Title>Warnings</Title>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Warning</TableCell>
                    <TableCell>License Number</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warning != null
                    ? warning.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.text}</TableCell>
                          <TableCell>{row.licensenumber}</TableCell>
                          <TableCell>{row.date}</TableCell>

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
                                  pathname: `/warnings/edit`,
                                  state: { warning: row },
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
    warning: state.firestore.ordered.warning,
  };
};
export default compose(
  connect(mapStateToProps, { deleteWarning }),
  firestoreConnect([
    {
      collection: "warning",
    },
  ])
)(Warning);