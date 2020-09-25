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

import { registerDriver } from "../../store/actions/driverActions";
import { Driver } from "../../models/driver";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Theme,
  Paper,
  makeStyles,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

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

interface driverProps extends RouteComponentProps {
  registerDriver: (driver: Driver) => void;
  auth: any;
  authError?: any;
  history: any;
}
const DriverForm: React.FC<driverProps> = ({ registerDriver }) => {
  const [driver, setUser] = useState<Driver>({
    id: "",
    name: "",
    licensenumber: "",
    gender: "",
    issuedat: "",
    expirydate: "",
    birthdate: "",
    housenumber: "",
    kebele: "",
    phonenumber: "",
    region: "",
    subcity: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setUser({
      ...driver,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as string;
    setUser({ ...driver, [name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await registerDriver(driver);
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
            Register Driver
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='name'
                  label='Full Name'
                  name='name'
                  onChange={handleChange}
                  value={driver.name}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='licensenumber'
                  label='License Number'
                  id='licensenumber'
                  onChange={handleChange}
                  value={driver.licensenumber}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Gender
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={driver.gender}
                    onChange={handleSelectChange}
                    name='gender'
                    label='Gender'>
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='issuedat'
                  label='Issued Date'
                  type='date'
                  id='issuedat'
                  onChange={handleChange}
                  value={driver.issuedat}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='expirydate'
                  label='Expiry Date'
                  type='date'
                  id='expirydate'
                  onChange={handleChange}
                  value={driver.expirydate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='birthdate'
                  label='Birth Date'
                  type='date'
                  id='birthdate'
                  onChange={handleChange}
                  value={driver.birthdate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='region'
                  label='Region'
                  id='region'
                  onChange={handleChange}
                  value={driver.region}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='subcity'
                  label='Subcity'
                  id='subcity'
                  onChange={handleChange}
                  value={driver.subcity}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='kebele'
                  label='Kebele'
                  id='kebele'
                  onChange={handleChange}
                  value={driver.kebele}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='housenumber'
                  label='House Number'
                  id='housenumber'
                  onChange={handleChange}
                  value={driver.housenumber}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Register
            </Button>
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

export default connect(mapStateToProps, { registerDriver })(DriverForm);
