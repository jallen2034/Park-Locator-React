import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import UserSavedParks from '../UserSavedParks'
import axios from 'axios';

// helper function to retrieveUsersSavedParks if the currentuser is set to null though dont run this
const retrieveUsersSavedParks = function (currentUser, setUsersSavedParks) {
  if (currentUser === null) return
  const uuid = currentUser.uuid
  axios.put("http://localhost:5000/userSavedParks", { uuid })
    .then((response) => {
      setUsersSavedParks(response.data)
    })
}

const UsersParksPage = ({ currentUser, setCurrentUser, key, setKey, register, setRegister }) => {
  const [usersSavedParks, setUsersSavedParks] = useState({})

  useEffect(() => {
    retrieveUsersSavedParks(currentUser, setUsersSavedParks)
  }, [, currentUser]);

  return (
    <div>
      <Navbar
        buttonStatus='Logout'
        setCurrentUser={setCurrentUser}
        key={key}
        setKey={setKey}
        register={register}
        setRegister={setRegister}
      />
      <UserSavedParks
        usersSavedParks={usersSavedParks}
        currentUser={currentUser}
        setUsersSavedParks={setUsersSavedParks}
      />
    </div>
  )
}

export default UsersParksPage