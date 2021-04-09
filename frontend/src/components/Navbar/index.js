import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core'

// style component
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 1201,
    height: '64px'
  },
  toolbar: {
    height: '64px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

// helper function to act as the button switcher
const buttonClick = function (buttonStatus, setRegister, setKey) {

  if (buttonStatus === 'Logout') {
    setRegister(false)
    setKey(false)
  } else if (buttonStatus === 'Login') {
    setRegister(false)
  } else if (buttonStatus === 'Register') {
    setRegister(true)
  }
}

// component for our navbar
function Navbar ({ buttonStatus, setRegister, setKey }) {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Park Locator
        </Typography>
        <Button 
          color="inherit"
          onClick={() =>
            buttonClick(buttonStatus, setRegister, setKey)}
        >{buttonStatus}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar