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
import { deleteSales } from "../../store/actions/salesAction";

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

interface salesProp extends RouteComponentProps {
  sales: any;
  deleteSales: (salesId: string) => void;
  role:any;
  history: any;
  location: any;
  match: any;
}

const Sales: React.FC<salesProp> = ({
  history,
  location,
  match,
  sales,
  deleteSales,
  role
}) => {
  const classes = useStyles();
  const branch = location.state.branch;
  const handelDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (window.confirm("are you sure you want to delete this?")) {
      await deleteSales(id);
    }
  };

  var filteredElements = null;
  if (sales != null) {
    filteredElements = sales.filter((object: any) => {
      return object.branch.toLowerCase().indexOf(branch.toLowerCase()) !== -1;
    });
  }
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
              {/* <Grid item xs={4} md={4} lg={4}>
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
                    to='/sales/add'>
                    Register
                  </Link>
                </Button>
              </Grid> */}

              <Title>Sales</Title>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>  
                    <TableCell>Action</TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                  {filteredElements != null
                    ? filteredElements.map((row: any,index:any) => (
                        <TableRow key={row.id}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          <TableCell>{row.quantity}</TableCell>                         
                          <TableCell>
                            {
                              branch===role?(
                                <>
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
                                  pathname: `/sales/edit`,
                                  state: { sales: row },
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
                             </>
                              ):null
                            }
                            
                           
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
    sales: state.firestore.ordered.sales,
    role: state.firebase.profile.role,
  };
};
export default compose(
  connect(mapStateToProps, { deleteSales }),
  firestoreConnect([
    {
      collection: "sales",
    },
  ])
)(Sales);
