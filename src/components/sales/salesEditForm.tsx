import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import { RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";

import { updateSales } from "../../store/actions/salesAction";
import { Theme, Paper, makeStyles, FormControl, InputLabel, Select } from "@material-ui/core";
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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface salesProps extends RouteComponentProps {
    updateSales: (sales: Sales) => void;
  product:any;
  auth: any;
  authError?: any;
  history: any;
  location: any;
}
const SalesEditForm: React.FC<salesProps> = ({ updateSales,product,location }) => {
  const [sale, setUser] = useState<Sales>({
    id: "",
    price:0,
    productid:"",
    quantity:0
  });

  const salee = location.state.sales;
  useEffect(() => {
    setUser({
      id: salee.id,
      price:salee.price,
    productid:salee.productid,
    quantity:salee.quantity
      
    });
  }, [
    salee.id,
      salee.price,
    salee.productid,
    salee.quantity
  ]);
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
    var res = await updateSales(sale);
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
        <Paper
          style={{
            marginTop: "20",
          }}>
          <Typography component='h1' variant='h5'>
            Update Sales
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
        <Select
          native
          id='productid'
          onChange={handleSelectChange}
                  label="Product"
                  name="productid"
                  value={sale.productid}
          inputProps={{
            name: 'productid',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {
              product != null? product.map((row: any) => (
                <option value={row.id}>{row.name}</option>
              )):null
          }
         
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
});

// export default connect(mapStateToProps, { registerProduct })(SalesForm);

export default compose(
    connect(mapStateToProps, { updateSales }),
    firestoreConnect([
      {
        collection: "product",
      },      
    ])
  )(SalesEditForm);
