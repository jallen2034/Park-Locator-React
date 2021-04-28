import React, {useState} from 'react'
import Navbar from '../Navbar'
import HomePage from '../HomePage'
import SignUp from '../SignUp'
import Login from '../Login'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    position: 'fixed'
  }
}))

const Application = ({ currentUser, setCurrentUser, key, setKey, register, setRegister }) => {
  const classes = useStyles()
 
  if (!register && !currentUser.uuid) {
    console.log("FIRST")
    return (
      <div>
        <Navbar
          buttonStatus='Register'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <Login 
          setRegister={setRegister} 
          setKey={setKey} 
          setCurrentUser={setCurrentUser}
        />
      </div>
    )
  } else if (register && !currentUser.uuid) {
    console.log("SECOND")
    return (
      <div>
        <Navbar
          buttonStatus='Login'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <SignUp 
          setRegister={setRegister} 
          setKey={setKey} 
          setCurrentUser={setCurrentUser}
        />
      </div>
    )
  } else {
    console.log("THIRD")
    return (
      <div className={classes.root}>
        <Navbar 
          // style={{marginBottom: "64px"}}
          buttonStatus='Logout'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <div style={{marginTop: "64px"}}>
          <HomePage currentUser={currentUser}/>
        </div>
      </div>
    )
  }
}

export default Application
