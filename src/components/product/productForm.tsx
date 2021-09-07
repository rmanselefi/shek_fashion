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

import { registerProduct } from "../../store/actions/productActions";
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
import { Size } from "../../models/size";
import { Autocomplete } from "@material-ui/lab";

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
  registerProduct: (penalty: Product, sizes: Size[]) => void;
  auth: any;
  authError?: any;
  history: any;
  category: any;
  brand: any;
  saved: boolean;
  hasError: boolean;
}
const ProductForm: React.FC<productProps> = ({
  registerProduct,
  category,
  brand,
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
    branch: "",
    category: "",
    image: null,
    size: "",
    sizeQuantity: 0,
  });

  const [open, setOpen] = React.useState(false);
  const [opene, setOpenError] = React.useState(false);
  const [sizes, setSizes] = React.useState<Size[]>([
    {
      id: 0,
      size: "",
      sizeQuantiy: 0,
    },
  ]);
  useEffect(() => {
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
  }, [hasError, saved]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sizes.length === 1) {
      sizes.map((siz) => {
        if (siz.size === "") {
          setOpenError(true);
          return false;
        } else {
          registerProduct(product, sizes);
          return true;
        }
      });
    } else if (sizes.length > 1) {
      sizes.map((siz, i) => {
        if (siz.size === "") {
          sizes.splice(i, 1);
        }
        return false;
      });
      registerProduct(product, sizes);
    } else {
      await registerProduct(product, sizes);
    }

    // setOpen(true);
  };
  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as string;
    setUser({ ...product, [name]: event.target.value });
  };

  const onSoldByChange = (event: any, values: any) => {
    // This will output an array of objects
    // given by Autocompelte options property.
    if (values != null) {
      setUser({ ...product, brand: values.name });
      // console.log('values',values);
    }
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
        sizeQuantiy: 0,
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
        <form onSubmit={handleSubmit} noValidate>
          <br />
          <Paper
            style={{
              marginTop: "20",
            }}
          >
            <br />
            <Typography component="h1" variant="h5">
              Register Product
            </Typography>
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
                  
                  {/* <Select
                    native
                    id="brand"
                    onChange={handleSelectChange}
                    label="Brand"
                    name="brand"
                    value={product.brand}
                    inputProps={{
                      name: "brand",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    {brand != null
                      ? brand.map((cat: any, index: any) => {
                          return (
                            <option key={index} value={cat.name}>
                              {cat.name}
                            </option>
                          );
                        })
                      : null}
                  </Select> */}
                  <Autocomplete
                    size={"small"}
                    id="combo-box-demo"
                    options={brand}
                    getOptionLabel={(option: any) => {
                      return option.name;
                    }}
                    onChange={onSoldByChange}
                    style={{ width: 300 }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Brand"
                        variant="outlined"
                      />
                    )}
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
                <input type="file" onChange={handleImageChange} />
              </Grid>
            </Grid>
          </Paper>
          <br />
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
                    <React.Fragment key={index}>
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
                            name="sizeQuantiy"
                            label="Quantity"
                            id="sizeQuantiy"
                            onChange={(e) => handleSizeChange(e, index)}
                            value={filter.sizeQuantiy}
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
                    </React.Fragment>
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
                Regsiter
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
        <Alert onClose={handleCloseError} severity="error">
          Something is wrong Please check your data
        </Alert>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  category: state.firestore.ordered.category,
  brand: state.firestore.ordered.brand,
  saved: state.product.saved,
  hasError: state.product.hasError,
});

// export default connect(mapStateToProps, { registerProduct })(ProductForm);

export default compose(
  connect(mapStateToProps, { registerProduct }),
  firestoreConnect([
    {
      collection: "category",
    },
    {
      collection: "brand",
    },
  ])
)(ProductForm);
