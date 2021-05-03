import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link } from "react-router-dom";

// style component
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    height: '64px',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '15px'
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '22px'
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
          <div className={classes.menuButtons}>
            <Button color="inherit">
              <Link to="/" className={classes.button}>Homepage</Link>
            </Button>
            <Button color="inherit">
              <Link to="/userSavedParks" className={classes.button}>My Saved Parks</Link>
            </Button>
            <Button color="inherit">
              <Link to="/reviews" className={classes.button}>All Reviews</Link>
            </Button>
          </div>
        </Toolbar>
          <div className={classes.actionButton}>
            <Button 
              color="inherit"
              onClick={() =>
                buttonClick(buttonStatus, setRegister, setKey, setCurrentUser)
              }
            >
              <Link to="/" className={classes.button}>{buttonStatus}</Link>
            </Button>
          </div>
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