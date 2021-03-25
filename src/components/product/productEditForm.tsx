import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import { RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { connect } from "react-redux";

import { updateProduct } from "../../store/actions/productActions";
import {
  Theme,
  Paper,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Product } from "../../models/product";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  fixedHeight: {
    height: 500,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface productProps extends RouteComponentProps {
  updateProduct: (product: Product, sizes: any) => Promise<Product | null>;
  auth: any;
  authError?: any;
  history: any;
  location: any;
  category: any;
  saved: boolean;
  hasError: boolean;
}
const ProductEditForm: React.FC<productProps> = ({
  updateProduct,
  location,
  history,
  category,
  saved,
  hasError,
}) => {
  const [product, setUser] = useState<Product>({
    id: "",
    name: "",
    brand: "",
    code: "",
    color: "",
    type: "",
    baseprice: 0.0,
    stock: "",
    branch: "",
    category: "",
  });
  const [sizes, setSizes] = React.useState([
    {
      id: 0,
      size: "",
      sizeQuantity: 0,
    },
  ]);
  const produc = location.state.product;
  useEffect(() => {
    setUser({
      id: produc.id,
      name: produc.name,
      brand: produc.brand,
      color: produc.color,
      type: produc.type,
      code: produc.code,
      baseprice: produc.price,
      stock: produc.stock,
      branch: produc.branch,
      category: produc.category.id,
      file: produc.image,
    });
    if(produc.size!=null){
      setSizes(produc.size);
    }
    
    if (hasError) {
      setOpenError(true);
      setOpen(false);
    }
    if (!hasError) {
      setOpenError(false);
    }
    if (saved) {
      setOpen(true);
      setOpenError(false);
    }
    if (!saved) {
      setOpen(false);
    }
  }, [
    produc.id,
    produc.name,
    produc.brand,
    produc.color,
    produc.type,
    produc.code,
    produc.price,
    produc.stock,
    produc.image,
    produc.category,
    produc.branch,
    hasError,
    saved,
    produc.size,
  ]);
  const [open, setOpen] = React.useState(false);
  const [opene, setOpenError] = React.useState(false);

  const handleSizeChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
    index: any
  ) => {
    setSizes(
      sizes.map((obj) =>
        obj.id === index
          ? Object.assign(obj, {
              [event.currentTarget.id]: event.currentTarget.value,
            })
          : obj
      )
    );
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setUser({
      ...product,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as string;
    setUser({ ...product, [name]: event.target.value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateProduct(product, sizes);
  };

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setUser({ ...product, image: image });
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleDelete = (i: any) => {
    return (e: any) => {
      e.preventDefault();
      var sizess = [...sizes.slice(0, i), ...sizes.slice(i + 1)];
      setSizes(sizess);
    };
  };

  const addSizes = (e: any) => {
    e.preventDefault();
    let filters = sizes.concat([
      {
        id: sizes.length,
        size: "",
        sizeQuantity: 0,
      },
    ]);
    setSizes(filters);
    console.log(sizes);
  };

  const classes = useStyles();
  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <br />
        <br />
        <form onSubmit={handleSubmit} noValidate>
          <Typography component="h5" variant="h5">
            Update Product
          </Typography>
          <br />

          <Paper
            style={{
              marginTop: "20",
            }}
          >
            <br />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    name="name"
                    onChange={handleChange}
                    value={product.name}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="brand"
                    label="Brand"
                    id="brand"
                    onChange={handleChange}
                    value={product.brand}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="stock"
                    label="Stock"
                    name="stock"
                    onChange={handleChange}
                    value={product.stock}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="baseprice"
                    label="Base Price"
                    id="baseprice"
                    onChange={handleChange}
                    value={product.baseprice}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="type"
                    label="Type"
                    type="text"
                    id="type"
                    onChange={handleChange}
                    value={product.type}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="code"
                    label="Code"
                    id="code"
                    onChange={handleChange}
                    value={product.code}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="color"
                    label="Color"
                    id="color"
                    onChange={handleChange}
                    value={product.color}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Branch
                  </InputLabel>
                  <Select
                    native
                    id="branch"
                    onChange={handleSelectChange}
                    label="Branch"
                    name="branch"
                    value={product.branch}
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
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Category
                  </InputLabel>
                  <Select
                    native
                    id="category"
                    onChange={handleSelectChange}
                    label="Category"
                    name="category"
                    value={product.category}
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
              <Grid item xs={4}>
                <img src={product.file} width="100" height="100" alt="" />
              </Grid>

              <Grid item xs={4}>
                <input type="file" onChange={handleImageChange} />
              </Grid>
            </Grid>
          </Paper>

          <Divider />
          <Paper
            style={{
              marginTop: "20",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Sizes
            </Typography>
            <br />
            <Button
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={addSizes}
            >
              Add Size
            </Button>
            <Grid container>
              {sizes != null
                ? sizes.map((filter, index) => (
                    <>
                      <Grid item xs={4}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          {" "}
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="size"
                            label="Size"
                            id="size"
                            onChange={(e) => handleSizeChange(e, index)}
                            value={filter.size}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          {" "}
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="sizeQuantity"
                            label="Quantity"
                            id="sizeQuantity"
                            onChange={(e) => handleSizeChange(e, index)}
                            value={filter.sizeQuantity}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          color="secondary"
                          startIcon={<HighlightOffIcon />}
                          onClick={handleDelete(index)}
                        >
                          Remove Size
                        </Button>
                      </Grid>
                    </>
                  ))
                : null}
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save Changes
              </Button>
            </Grid>
          </Paper>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>

      <Snackbar open={opene} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleClose} severity="error">
          Something is wrong. Please check your data
        </Alert>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  category: state.firestore.ordered.category,
  saved: state.product.saved,
  hasError: state.product.hasError,
});

// export default connect(mapStateToProps, { updateProduct })(ProductEditForm);

export default compose(
  connect(mapStateToProps, { updateProduct }),
  firestoreConnect([
    {
      collection: "category",
    },
  ])
)(ProductEditForm);
