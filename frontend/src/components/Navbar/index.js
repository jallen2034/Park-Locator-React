import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';

// style component
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    height: '64px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#384da1'
  },
  menuIcon: {
    color: 'white'
  },
  login: {
    backgroundColor: '#384da1'
  },
  menuButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '15px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '22px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '22px',
  },
  hamBurger: {
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
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
  buttonDrawer: {
    textDecoration: 'none',
    color: 'black'
  },
  buttonDrawerLogout: {
    color: '#a60c56',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  testButton: {
    backgroundColor: 'orange'
  },
  list: {
    width: 200,
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
  const [state, setState] = React.useState({
    right: false,
  });

  // helper function to toggle the drawer of options as being open
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  }

  // create the list of buttons in our hamburger menu
  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.list}
    >
      <List>
        <ListItem>
          <Button color="inherit">
            <Link to="/" className={classes.buttonDrawer}>Homepage</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Button color="inherit">
            <Link to="/userSavedParks" className={classes.buttonDrawer}>My Saved Parks</Link>
          </Button>
        </ListItem>
        <ListItem>
          <div>
            <Button
              color="inherit"
            >
              <Link
                to="/"
                className={classes.buttonDrawerLogout}
                onClick={() =>
                  buttonClick(buttonStatus, setRegister, setKey, setCurrentUser, setMapCenter, setClickedParkInList, setClickedPark)
                }
              >
                {buttonStatus}
              </Link>
            </Button>
          </div>
        </ListItem>
      </List>
    </div>
  );


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
        <div className={classes.actionButtons}>
          <div className={classes.hamBurger}>
            <>
              <Button onClick={toggleDrawer('right', true)}>
                <MenuIcon className={classes.menuIcon} />
              </Button>
              <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                {list('right')}
              </Drawer>
            </>
          </div>
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