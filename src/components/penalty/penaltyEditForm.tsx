import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import { RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";

import { registerPenalty } from "../../store/actions/penaltyActions";
import { Theme, Paper, makeStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Penalty } from "../../models/penalty";

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

interface penaltyProps extends RouteComponentProps {
  registerPenalty: (penalty: Penalty) => void;
  auth: any;
  authError?: any;
  history: any;
  location: any;
}
const PenaltyEditForm: React.FC<penaltyProps> = ({
  registerPenalty,
  location,
}) => {
  const [penalty, setUser] = useState<Penalty>({
    id: "",
    date: "",
    erken: "",
    licensenumber: "",
    penaltycode: "",
    vehicletype: "",
  });
  const penalt = location.state.penalty;
  useEffect(() => {
    setUser({
      id: penalt.id,
      vehicletype: penalt.vehicletype,
      licensenumber: penalt.licensenumber,
      penaltycode: penalt.penaltycode,
      date: penalt.date,
      erken: penalt.erken,
    });
  }, [
    penalt.id,
    penalt.vehicletype,
    penalt.licensenumber,
    penalt.penaltycode,
    penalt.date,
    penalt.erken,
  ]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setUser({
      ...penalty,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await registerPenalty(penalty);
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
            Update Penalty
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='vehicletype'
                  label='Vehicle Type'
                  name='vehicletype'
                  onChange={handleChange}
                  value={penalty.vehicletype}
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
                  value={penalty.licensenumber}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='date'
                  label='Date'
                  type='date'
                  id='date'
                  onChange={handleChange}
                  value={penalty.date}
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
                  name='erken'
                  label='Erken'
                  id='erken'
                  onChange={handleChange}
                  value={penalty.erken}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='penaltycode'
                  label='Penalty Code'
                  id='penaltycode'
                  onChange={handleChange}
                  value={penalty.penaltycode}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Update
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

export default connect(mapStateToProps, { registerPenalty })(PenaltyEditForm);
