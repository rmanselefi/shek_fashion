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
  Divider,
  Select,
  InputLabel,
  
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Sales } from "../../models/sales";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { User } from "../../models/user";
import { Size } from "../../models/size";

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
  registerSales: (sales: Sales,size:any) => void;
  location: any;
  product: any;
  role: any;
  auth: any;
  authError?: any;

  history: any;
  users: User[];
}
const SalesForm: React.FC<salesProps> = ({
  registerSales,
  product,
  role,
  users,
  location,
  auth,
}) => {
  const branch = location.state.branch;
  const profile = location.state.profile;
  const prod = location.state.product;

  const [sale, setUser] = useState<Sales>({
    id: "",
    price: 0,
    productid: prod.id,
    quantity: 0,
    branch: branch,
    cashier: profile.name,
    cashierid: auth.uid,
    productname: "",
  });

  // const [value, setValue] = React.useState<Sales | null>(null);
  const [open, setOpen] = React.useState(false);
  const [opene, setOpenError] = React.useState(false);
  const [openError, setOpenValidationError] = React.useState(false);
  const [errorMessage,setErrorMessage]=React.useState("");

  const [size, setSize] = React.useState<Size>({
    size:"",
    sizeQuantiy:0
  });


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
    const name = event.target.value as string;
    setSize({
      size:name,
      sizeQuantiy:size.sizeQuantiy
    });
  };

  const handleSizeChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setSize({
      ...size,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sale.price===0 || sale.soldby==="") {
      setErrorMessage("Sales Price and Sold By is required! Please Provide Value for Both");
      setOpenValidationError(true);
    }
    else if(size.size==="" || size.sizeQuantiy===0){
      setErrorMessage("Size and its quantity is required! Please Provide value for both");
      setOpenValidationError(true);
    }
    else{
      var res = await registerSales(sale,size);
      if (res != null) {
        setOpen(true);
      } else {
        setOpenError(true);
      }
    }
    
  };

  const onSoldByChange = (event: any, values: any) => {
    // This will output an array of objects
    // given by Autocompelte options property.
    if (values != null) {
      setUser({ ...sale, sellerid: values.id, soldby: values.name });
      // console.log('values',values);
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

  const handleCloseOpenError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenValidationError(false);
  };

  const classes = useStyles();


  var filteredUsers: User[] = [];
  var salesRole = "sales";
  if (users != null && role != null) {
    if (role === "admin") {
      filteredUsers = users;
    } else {
      filteredUsers = users.filter((object: User) => {
        return (
          object.role.toLowerCase().indexOf(salesRole.toLowerCase()) !== -1
        );
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
                <div
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bolder",
                    }}
                  >
                    Product
                  </span>
                  <br />
                  <Typography>
                    <ul>
                      <li>{prod.name}</li>
                      <li>{prod.brand}</li>
                      <li>{prod.code}</li>
                      </ul>,
                  </Typography>
                </div>
                
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl} size='small'>
                  <Autocomplete size={"small"} 
                    id="combo-box-demo"
                    options={filteredUsers}
                    getOptionLabel={(option: User) => {
                      return option.name;
                    }}
                    onChange={onSoldByChange}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sold By"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={4}>
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
              </Grid> */}
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
                    value={sale.price} size='small'
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>Slect size and quantity sold</Typography>
              </Grid>
              <Grid item xs={4}>
              <FormControl
                    variant="outlined"
                    className={classes.formControl} size="small"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Select Size
                    </InputLabel>
                    <Select
                      native
                      id="size"
                      onChange={handleSelectChange}
                      label="Size"
                      name="size"
                      value={size.size}
                      inputProps={{
                        name: "size",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {prod.size != null
                        ? prod.size.map((cat: any, index: any) => {
                            return (
                              <option key={index} value={cat.size}>
                                {cat.size}
                              </option>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl} size='small'
                >
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="sizeQuantiy"
                    label="Quantity"
                    id="sizeQuantiy"
                    onChange={ handleSizeChange}
                    value={size.sizeQuantiy} size='small'
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

      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseOpenError}>
        <Alert onClose={handleCloseOpenError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  product: state.firestore.ordered.product,
  users: state.firestore.ordered.users,
  role: state.firebase.profile.role,
  branch: state.firebase.profile.branch,
  profile: state.firebase.profile,
});

// export default connect(mapStateToProps, { registerProduct })(SalesForm);

export default compose(
  connect(mapStateToProps, { registerSales }),
  firestoreConnect([
    {
      collection: "product",
    },
    {
      collection: "users",
    },
  ])
)(SalesForm);
