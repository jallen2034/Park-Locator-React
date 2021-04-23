import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Login from '../Login'
import SignUp from '../SignUp'
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

  if (!key && !register && !currentUser) {
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
  } else if (!key && register && !currentUser) {
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
}

export default UsersParksPage