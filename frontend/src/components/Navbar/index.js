import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link } from "react-router-dom";

// style component
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    height: '64px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#384da1'
  },
  login: {
    backgroundColor: '#384da1'
  },
  menuButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '15px',
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '22px',
  },
  toolbar: {
    // backgroundColor: 'orange'
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
  },
  testButton: {
    backgroundColor: 'orange'
  }
}))

// helper function to act as the button switcher
const buttonClick = function (buttonStatus, setRegister, setKey, setCurrentUser, setMapCenter, setClickedParkInList, setClickedPark) {

  // TODO - fix later by not directly mutating state
  if (buttonStatus === 'Logout') {
    setRegister(false)
    setKey(false)
    setCurrentUser((prev) => ({ ...prev, uuid: null }))
    setClickedParkInList('')
    setClickedPark('')
    setMapCenter([49.282, -123.120])
    window.localStorage.removeItem('Uuid')
  } else if (buttonStatus === 'Login') {
    setRegister(false)
  } else if (buttonStatus === 'Register') {
    setRegister(true)
  }
}

// component for our navbar
function Navbar({ buttonStatus, setRegister, setKey, setCurrentUser, setMapCenter, setClickedParkInList, setClickedPark }) {
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
          </div>
        </Toolbar>
        <div className={classes.actionButton}>
          <Button
            color="inherit"
          >
            <Link
              to="/"
              className={classes.button}
              onClick={() =>
                buttonClick(buttonStatus, setRegister, setKey, setCurrentUser, setMapCenter, setClickedParkInList, setClickedPark)
              }
            >
              {buttonStatus}
            </Link>
          </Button>
        </div>
      </AppBar>
    )
  } else {
    return (
      <AppBar position="static" className={classes.login}>
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