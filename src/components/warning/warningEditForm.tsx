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

import { updateWarning } from "../../store/actions/warningActions";
import { Theme, Paper, makeStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Warning from "../../models/warning";

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

interface warningProps extends RouteComponentProps {
  updateWarning: (warning: Warning) => void;
  auth: any;
  authError?: any;
  history: any;
  location: any;
}
const WarningEditForm: React.FC<warningProps> = ({
  updateWarning,
  location,
}) => {
  const [warning, setUser] = useState<Warning>({
    id: "",
    date: "",
    text: "",
    licensenumber: "",
  });
  const warnin = location.state.warning;
  useEffect(() => {
    setUser({
      id: warnin.id,
      date: warnin.date,
      text: warnin.text,
      licensenumber: warnin.licensenumber,
    });
  }, [warnin.id, warnin.date, warnin.text, warnin.licensenumber]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setUser({
      ...warning,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await updateWarning(warning);
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
            Register Warning
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='licensenumber'
                  label='License Number'
                  id='licensenumber'
                  onChange={handleChange}
                  value={warning.licensenumber}
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
                  value={warning.date}
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
                  name='text'
                  label='Warning'
                  id='text'
                  onChange={handleChange}
                  value={warning.text}
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

export default connect(mapStateToProps, { updateWarning })(WarningEditForm);
