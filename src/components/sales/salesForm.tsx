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
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Sales } from "../../models/sales";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Autocomplete  from '@material-ui/lab/Autocomplete';

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

interface salesProps extends RouteComponentProps {
  registerSales: (sales: Sales) => void;
  location: any;
  product: any;
  role: any;
  auth: any;
  authError?: any;
  history: any;
}
const SalesForm: React.FC<salesProps> = ({
  registerSales,
  product,
  role,
  location,
}) => {
  const branch = location.state.branch;
  const [sale, setUser] = useState<Sales>({
    id: "",
    price: 0,
    productid: "",
    quantity: 0,
    branch: branch,
    productname:""
  });

  // const [value, setValue] = React.useState<Sales | null>(null);
  const [open, setOpen] = React.useState(false);
  const [opene, setOpenError] = React.useState(false);

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

 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await registerSales(sale);
    if (res != null) {
      setOpen(true);
    }
    else{
      setOpenError(true);
    }
  };

  const onTagsChange = (event:any, values:any) => {
    
      // This will output an array of objects
      // given by Autocompelte options property.
      if (values!=null) {
        setUser({...sale,productid:values.id,productname:values.name});
      console.log('values',values);
      }     
    
  }



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

  const classes = useStyles();

  var filteredElements = null;
  if (product != null && role != null) {
    if (role === "admin") {
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
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />

        <Paper>
          <br />
          <Typography component="h1" variant="h5">
            Register Sales
          </Typography>
          <br />
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                 
                  <Autocomplete
                    id="combo-box-demo"
                    options={filteredElements}
                    getOptionLabel={(option:any) => option.name}
                    onChange={onTagsChange}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
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
                    id="quantity"
                    label="Quantity"
                    name="quantity"
                    onChange={handleChange}
                    value={sale.quantity}
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
                    name="price"
                    label="Price"
                    id="price"
                    onChange={handleChange}
                    value={sale.price}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register Sale
              </Button>
            </Grid>
          </form>
        </Paper>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your sales is registered successfully
        </Alert>
      </Snackbar>

      <Snackbar open={opene} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Someting is wrong please check your data
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
