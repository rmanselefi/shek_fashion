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

import { registerSales } from "../../store/actions/salesAction";
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
import { Sales } from "../../models/sales";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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

interface salesProps extends RouteComponentProps {
  registerSales: (sales: Sales) => void;
  location:any;
  product: any;
  role: any;
  auth: any;
  authError?: any;
  history: any;
}
const SalesForm: React.FC<salesProps> = ({ registerSales, product, role,location, }) => {
  
  const branch = location.state.branch;
  const [sale, setUser] = useState<Sales>({
    id: "",
    price: 0,
    productid: "",
    quantity: 0,
    branch: branch,
  });
  const [open, setOpen] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setUser({
      ...sale,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as string;
    setUser({ ...sale, [name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await registerSales(sale);
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

  var filteredElements = null;
  if (product != null && role != null) {   
    
    if (role == "admin") {
      filteredElements = product;
    } else {
      filteredElements = product.filter((object: any) => {
        return object.branch.toLowerCase().indexOf(role.toLowerCase()) !== -1;
      });
    }
  }
  return (
    <Container>
      <CssBaseline />
      <div
        style={{
          marginTop: "100",
        }}>
        <br />
        <br />
        <br />
        <br />
        <br />

        <Paper>
          <br />
          <Typography component='h1' variant='h5'>
            Register Sales
          </Typography>
          <br />
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='outlined-age-native-simple'>
                    Product
                  </InputLabel>
                  <Select
                    native
                    id='productid'
                    onChange={handleSelectChange}
                    label='Product'
                    name='productid'
                    value={sale.productid}
                    inputProps={{
                      name: "productid",
                      id: "outlined-age-native-simple",
                    }}>
                    <option aria-label='None' value='' />
                    {filteredElements != null
                      ? filteredElements.map((row: any,index:any) => (
                          <option key={index} value={row.id}>
                            {row.name},{row.brand},
                            {row.type != null ? row.type : ""}
                          </option>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='quantity'
                    label='Quantity'
                    name='quantity'
                    onChange={handleChange}
                    value={sale.quantity}
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
                    name='price'
                    label='Price'
                    id='price'
                    onChange={handleChange}
                    value={sale.price}
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
                Register Sale
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
  product: state.firestore.ordered.product,
  role: state.firebase.profile.role,
});

// export default connect(mapStateToProps, { registerProduct })(SalesForm);

export default compose(
  connect(mapStateToProps, { registerSales }),
  firestoreConnect([
    {
      collection: "product",
    },
  ])
)(SalesForm);
