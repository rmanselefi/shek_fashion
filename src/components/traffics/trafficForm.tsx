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

import { registerTraffic } from "../../store/actions/trafficActions";
import { Theme, Paper, makeStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Traffic from "../../models/traffic";

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

interface trafficProps extends RouteComponentProps {
  registerTraffic: (traffic: Traffic) => void;
  auth: any;
  authError?: any;
  history: any;
}
const TrafficForm: React.FC<trafficProps> = ({ registerTraffic }) => {
  const [traffic, setUser] = useState<Traffic>({
    id: "",
    email: "",
    password: "",
    idnum: "",
    level: "",
    name: "",
    role: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setUser({
      ...traffic,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await registerTraffic(traffic);
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
            Register Traffic
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='name'
                  label='Full Name'
                  id='name'
                  onChange={handleChange}
                  value={traffic.name}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='level'
                  label='Level'
                  id='level'
                  onChange={handleChange}
                  value={traffic.level}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='email'
                  label='Email Address'
                  id='email'
                  type='email'
                  onChange={handleChange}
                  value={traffic.email}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  id='password'
                  type='password'
                  onChange={handleChange}
                  value={traffic.password}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='idnum'
                  label='ID Number'
                  id='idnum'
                  onChange={handleChange}
                  value={traffic.idnum}
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

export default connect(mapStateToProps, { registerTraffic })(TrafficForm);
