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

import { registerCategory } from "../../store/actions/categoryActions";
import { Theme, Paper, makeStyles, FormControl } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Category } from "../../models/category";

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

interface settingsProps extends RouteComponentProps {
  registerCategory: (category: Category) => void;
  location: any;
  role: any;
  auth: any;
  authError?: any;
  history: any;
}
const CategoryForm: React.FC<settingsProps> = ({ registerCategory }) => {
  const [category, setUser] = useState<Category>({
    id: "",
    name: "",
  });
  const [open, setOpen] = React.useState(false);
  const [opene, setOpenError] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setUser({
      ...category,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (category.name === "") {
      setOpenError(true);
    } else {
      var res = await registerCategory(category);
      if (res != null || res === undefined) {
        setOpen(true);
      } else {
        setOpenError(true);
      }
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
  const classes = useStyles();

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
            Register Category
          </Typography>
          <br />
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Category"
                    name="name"
                    onChange={handleChange}
                    value={category.name}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Category
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
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
  role: state.firebase.profile.role,
});

// export default connect(mapStateToProps, { registerProduct })(SalesForm);

export default connect(mapStateToProps, { registerCategory })(CategoryForm);
