import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import { RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";

import { registerProduct } from "../../store/actions/productActions";
import { Theme, Paper, makeStyles, FormControl } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Product } from "../../models/product";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
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

interface penaltyProps extends RouteComponentProps {
  registerProduct: (penalty: Product) => void;
  auth: any;
  authError?: any;
  history: any;
}
const ProductForm: React.FC<penaltyProps> = ({ registerProduct }) => {
  const [product, setUser] = useState<Product>({
    id: "",
    name: "",
    brand: "",
    code: "",
    color: "",
    size: "",
    type: "",
    baseprice: 0.0,
    stock: "",
  });
  const [open, setOpen] = React.useState(false);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await registerProduct(product);
    if (res != null) {
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const classes = useStyles();
  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <br />
        <br />
        <Paper
          style={{
            marginTop: "20",
          }}>
          <br />
          <Typography component='h1' variant='h5'>
            Register Product
          </Typography>
          <br />
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='name'
                    label='Product Name'
                    name='name'
                    onChange={handleChange}
                    value={product.name}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='brand'
                    label='Brand'
                    id='brand'
                    onChange={handleChange}
                    value={product.brand}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='stock'
                    label='Stock'
                    name='stock'
                    onChange={handleChange}
                    value={product.stock}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='baseprice'
                    label='Base Price'
                    id='baseprice'
                    onChange={handleChange}
                    value={product.baseprice}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='type'
                    label='Type'
                    type='text'
                    id='type'
                    onChange={handleChange}
                    value={product.type}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='size'
                    label='Size'
                    id='size'
                    onChange={handleChange}
                    value={product.size}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='code'
                    label='Code'
                    id='code'
                    onChange={handleChange}
                    value={product.code}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='color'
                    label='Color'
                    id='color'
                    onChange={handleChange}
                    value={product.color}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Update
              </Button>
            </Grid>
          </form>
        </Paper>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          This is a success message!
        </Alert>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, { registerProduct })(ProductForm);
