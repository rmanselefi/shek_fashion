import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// import Link from "@material-ui/core/Link";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";

import { signup } from "../../store/actions/authActions";
import { User } from "../../models/user";
import { isLoaded, isEmpty } from "react-redux-firebase";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <a href='https://material-ui.com/'>Your Website</a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

interface signupProps extends RouteComponentProps {
  signup: (user: User) => void;
  auth: any;
  authError: any;
}

const SignUp: React.FC<signupProps> = ({ signup, auth, history }) => {
  const [user, setUser] = useState<User>({ name:"", email: "", password: "",role:"" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.currentTarget!.id]: event.currentTarget!.value,
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as string;
    setUser({ ...user, [name]: event.target.value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var res = await signup(user);
    // if (res != null) {
    //   history.push("/dashboard");
    // }
  };

  const classes = useStyles();
  
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component='h1' variant='h5'>
          Create User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
              <TextField
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Full Name'
                name='name'
                autoComplete='name'
                onChange={handleChange}
                value={user.name}
                />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
                value={user.email}
                />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined' className={classes.formControl}>
                  {" "}
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleChange}
                value={user.password}
                />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
        <Select
          native
          id='role'
          onChange={handleSelectChange}
                  label="Role"
                  name="role"
                  value={user.role}
          inputProps={{
            name: 'role',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value='admin'>admin</option>
          <option value='branch-1'>branch-1</option>
          <option value='branch-2'>branch-2</option>
          <option value='branch-3'>branch-3</option>
        </Select>
              </FormControl>
              </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Create
          </Button>
          {/* <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login'>Already have an account? Sign in</Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, { signup })(SignUp);
