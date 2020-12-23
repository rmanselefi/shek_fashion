// @ts-ignore
import React, { useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
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
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import PlusOneOutlined from "@material-ui/icons/Add";

import InputBase from "@material-ui/core/InputBase";
import { RouteComponentProps, Link } from "react-router-dom";
import { Title } from "../layout/title";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteProduct } from "../../store/actions/productActions";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  appBarSpacer: theme.mixins.toolbar,
}));

interface productProp extends RouteComponentProps {
  product: any;
  deleteProduct: (productId: string) => void;
}

const Product: React.FC<productProp> = ({
  history,
  location,
  match,
  product,
  deleteProduct,
}) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [filterStr, setFilterStr] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentMall =
  //   mall != null ? mall.slice(indexOfFirstPost, indexOfLastPost) : null;
  var filteredElements = null;
  if (product != null) {
    filteredElements = product.filter((object: any) => {
      return object.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1;
    });
  }

  const handelDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (window.confirm("are you sure you want to delete this?")) {
      var res = await deleteProduct(id);
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
                  size='small'
                  color='primary'
                  className={classes.button}>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to='/products/add'>
                    <PlusOneOutlined />
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <br />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search product" }}
                    value={filterStr}
                    onChange={(e) => setFilterStr(e.target.value)}
                  />
                </div>
              </Grid>

              <Title>Products</Title>

              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Product Type</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredElements != null
                    ? filteredElements.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>{row.brand}</TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.stock}</TableCell>
                          <TableCell>{row.color}</TableCell>
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
                                  pathname: `/products/edit`,
                                  state: { product: row },
                                }}>
                                Edit
                              </Link>
                            </Button>

                            <Button
                              variant='outlined'
                              size='small'
                              color='secondary'
                              className={classes.button}
                              onClick={(e) => handelDelete(e, row.id)}>
                              <DeleteIcon />
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
    product: state.firestore.ordered.product,
  };
};
export default compose(
  connect(mapStateToProps, { deleteProduct }),
  firestoreConnect([
    {
      collection: "product",
    },
  ])
)(Product);
