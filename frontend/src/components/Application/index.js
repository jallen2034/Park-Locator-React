import React, { useState } from 'react'
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

const Application = ({ currentUser, setCurrentUser, key, setKey, register, setRegister, clickedPark, setClickedPark, clickedParkInList, setClickedParkInList, mapCenter, setMapCenter }) => {
  const classes = useStyles()

  if (!register && !currentUser.uuid) {
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
    return (
      <div className={classes.root}>
        <Navbar
          buttonStatus='Logout'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <div style={{ marginTop: "64px" }}>
          <HomePage
            currentUser={currentUser}
            clickedPark={clickedPark}
            setClickedPark={setClickedPark}
            clickedParkInList={clickedParkInList}
            setClickedParkInList={setClickedParkInList}
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
          />
        </div>
      </div>
    )
  }
}

export default Application
