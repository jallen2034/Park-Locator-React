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

// component for our navbar
function Navbar () {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Park Locator
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar