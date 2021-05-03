import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import UserSavedParks from '../UserSavedParks'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '75px'
  }
}))

// helper function to retrieveUsersSavedParks if the currentuser is set to null though dont run this
const retrieveUsersSavedParks = function (currentUser, setUsersSavedParks) {
  if (currentUser === null) return
  const uuid = currentUser.uuid
  axios.put("http://localhost:5000/userSavedParks", { uuid })
    .then((response) => {
      setUsersSavedParks(response.data)
    })
}

const UsersParksPage = ({ currentUser, setCurrentUser, key, setKey, register, setRegister, setClickedPark, setMapCenter, setClickedParkInList }) => {
  const classes = useStyles()
  const [usersSavedParks, setUsersSavedParks] = useState({})

  useEffect(() => {
    retrieveUsersSavedParks(currentUser, setUsersSavedParks)
  }, [ , currentUser]);

  return (
    <>
      <Navbar
        buttonStatus='Logout'
        setCurrentUser={setCurrentUser}
        key={key}
        setKey={setKey}
        register={register}
        setRegister={setRegister}
      />
        <div className={classes.root}>
          <UserSavedParks
            usersSavedParks={usersSavedParks}
            currentUser={currentUser}
            setUsersSavedParks={setUsersSavedParks}
            setClickedPark={setClickedPark}
            setMapCenter={setMapCenter}
            setClickedParkInList={setClickedParkInList}
          />
        </div>
    </>
  )
}

export default UsersParksPage