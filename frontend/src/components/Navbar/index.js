import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link } from "react-router-dom";

// style component
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    height: '64px',
  },
  toolbar: {
    height: '64px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  button: {
    textDecoration: 'none',
    color: 'white'
  }
}))

// helper function to act as the button switcher
const buttonClick = function (buttonStatus, setRegister, setKey, setCurrentUser) {

  if (buttonStatus === 'Logout') {
    setRegister(false)
    setKey(false)
    setCurrentUser({uuid: null})
    window.localStorage.removeItem('Uuid')
  } else if (buttonStatus === 'Login') {
    setRegister(false)
  } else if (buttonStatus === 'Register') {
    setRegister(true)
  }
}

// component for our navbar
function Navbar ({ buttonStatus, setRegister, setKey, setCurrentUser }) {
  const classes = useStyles()

  if (buttonStatus === 'Logout') {
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Park Locator
          </Typography>
          <Button color="inherit">
            <Link to="/" className={classes.button}>Homepage</Link>
          </Button>
          <Button color="inherit">
            <Link to="/userSavedParks" className={classes.button}>User Saved Parks</Link>
          </Button>
          <Button color="inherit">
            <Link to="/reviews" className={classes.button}>Reviews</Link>
          </Button>
          <Button 
            color="inherit"
            onClick={() =>
              buttonClick(buttonStatus, setRegister, setKey, setCurrentUser)
            }
          >
            <Link to="/" className={classes.button}>{buttonStatus}</Link>
          </Button>
        </Toolbar>
      </AppBar>
    )
  } else {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Park Locator
          </Typography>
          <Button
            color="inherit"
            onClick={() =>
              buttonClick(buttonStatus, setRegister, setKey, setCurrentUser)
            }
          >{buttonStatus}
          </Button>
        </Toolbar>
      </AppBar>
    )
  } 
}

export default Navbar