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
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import InputBase from "@material-ui/core/InputBase";
import { RouteComponentProps } from "react-router-dom";
import { Title } from "../layout/title";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

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
    marginTop:10,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
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
  category: any;  
  history: any;
  location: any;
  role: any;
  match: any;
  brands: any;
  branch: string;
  name: string;
  profile: any;
}

const LowStock: React.FC<productProp> = ({
  location,
  product,
  category,
  role  ,
  brands,
  branch,
  name,
  profile,
}) => {
  const classes = useStyles();
  // const [currentPage] = useState(1);
  // const [postsPerPage] = useState(5);
  const [filterStr, setFilterStr] = useState("");

  const [categ, setCategory] = useState("");

  const [branche, setBranch] = useState("");
  const [brand, setBrand] = useState("");

  const handleBranchSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.value as string;
    setBranch(name);
  };
  // const indexOfLastPost = currentPage * postsPerPage;
  // const currentMall =
  //   mall != null ? mall.slice(indexOfFirstPost, indexOfLastPost) : null;

  var filteredBybranch = null;
  if (product != null) {
    filteredBybranch = product.filter((object: any) => {
      return object.branch.toLowerCase().indexOf(branche.toLowerCase()) !== -1;
    });
  }

  var filteredByStock = null;
  if (filteredBybranch != null) {
    filteredByStock = filteredBybranch.filter((object: any) => {
      return object.stock < 4;
    });
  }

  var filteredByCategory = null;
  if (filteredByStock != null) {
    filteredByCategory = filteredByStock.filter((object: any) => {
      return object.category.name.toLowerCase().indexOf(categ.toLowerCase()) !== -1;
    });
  }

  var filteredByBrand = null;
  if (filteredByCategory != null) {
    filteredByBrand = filteredByCategory.filter((object: any) => {
      return object.brand.toLowerCase().indexOf(brand.toLowerCase()) !== -1;
    });
  }

  var filteredElements = null;
  if (filteredByBrand != null) {
    filteredElements = filteredByBrand.filter((object: any) => {
      return object.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1;
    });
  }

  
  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.value as string;
    setCategory(name);
  };

  const handleBrandSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.value as string;
    setBrand(name);
  };

  return (
    <React.Fragment>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Paper
              style={{
                width: "100%",
                paddingLeft: "10",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={3} md={3} lg={3}>
                  
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
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

                <Grid item xs={3}>
                  <FormControl
                    variant="outlined" 
                    className={classes.formControl} size="small"
                  >
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

                <Grid item xs={3}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl} size="small"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Category
                    </InputLabel>
                    <Select
                      native
                      id="category"
                      onChange={handleSelectChange}
                      label="Category"
                      name="category"
                      value={categ}
                      
                      inputProps={{
                        name: "category",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {category != null
                        ? category.map((cat: any, index: any) => {
                            return (
                              <option key={index} value={cat.id}>
                                {cat.name}
                              </option>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl} size="small"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Brand
                    </InputLabel>
                    <Select
                      native
                      id="brand"
                      onChange={handleBrandSelectChange}
                      label="Brand"
                      name="brand"
                      value={brand}
                      inputProps={{
                        name: "brand",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {brands != null
                        ? brands.map((cat: any, index: any) => {
                            return (
                              <option key={index} value={cat.name}>
                                {cat.name}
                              </option>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Title>Low Stock Products</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Product Size</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Base Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredElements != null
                    ? filteredElements.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.size}</TableCell>
                          <TableCell>{row.brand}</TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.stock < 0 ? 0 : row.stock}</TableCell>
                          <TableCell>{row.color}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          
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
    category: state.firestore.ordered.category,
    role: state.firebase.profile.role,
    brands: state.firestore.ordered.brand,
    branch: state.firebase.profile.branch,
    name: state.firebase.profile.name,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps, {  }),
  firestoreConnect([
    {
      collection: "product",
    },
    {
      collection: "category",
    },
    {
      collection: "brand",
    },
  ])
)(LowStock);
