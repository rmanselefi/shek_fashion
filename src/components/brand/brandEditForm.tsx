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

import { updateBrand } from "../../store/actions/brandActions";
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

interface brandProps extends RouteComponentProps {
  updateBrand: (brand: Category) => void;
  auth: any;
  authError?: any;
  history: any;
  location: any;
}
const BrandEditForm: React.FC<brandProps> = ({ updateBrand, location }) => {
  const [brand, setBrand] = useState<Category>({
    id: "",
    name: "",
  });

  const cat = location.state.brand;
  useEffect(() => {
    setBrand({
      id: cat.id,
      name: cat.name,
    });
  }, [cat.id, cat.name]);
  const [open, setOpen] = React.useState(false);
  const [opene, setOpenError] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setBrand({
      ...brand,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await updateBrand(brand);
    if (res != null || res === undefined) {
      setOpen(true);
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
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Paper
          style={{
            marginTop: "20",
          }}
        >
          <br />

          <Typography component="h1" variant="h5">
            Update Brand
          </Typography>
          <br />
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  {" "}
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Brand"
                    name="name"
                    onChange={handleChange}
                    value={brand.name}
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
                Update
              </Button>
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
});

// export default connect(mapStateToProps, { registerProduct })(SalesForm);

export default connect(mapStateToProps, { updateBrand })(BrandEditForm);
