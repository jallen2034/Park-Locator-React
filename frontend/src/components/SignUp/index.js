import { useState } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// helper that can render the login component conditonally when the "need an account?" link is clicked
const renderRegister = function (event, setRegister) {
  event.preventDefault()
  setRegister(false)
}

// style our component
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1536318431364-5cc762cfc8ec?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// login component
function SignUp({setRegister, setKey}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const classes = useStyles();
  
  // helper callback routes to the registerRoute express endpoint to register + log the user in automatically
  const registerUser = function (event) {
    event.preventDefault()

    axios.put("http://localhost:5000/register", { username, password, passwordConfirm })
    .then((response) => {

      if (response.data.true === true) {
        setKey(true)
        window.localStorage.setItem('Uuid', response.data.uuid)
      } else {
        toast.error(response.data)
      }
    })
  }
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              onChange={(event) => {
                setUsername(event.target.value)
              }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              autoComplete="current-confirm-password"
              onChange={(event) => {
                setPasswordConfirm(event.target.value)
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={registerUser}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link 
                  href="#" 
                  variant="body2"
                  onClick={(event) => renderRegister(event, setRegister)}
                >
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUp