import React, { useState, useEffect } from 'react'
import NavBar from '../Navbar'
import UserSavedParks from '../UserSavedParks'
import axios from 'axios';

const retrieveUsersSavedParks = function (currentUser, setUsersSavedParks) {
  const uuid = currentUser.uuid
  axios.put("http://localhost:5000/userSavedParks", { uuid })
  .then((response) => {
    setUsersSavedParks(response.data)
  })
}

const UsersParksPage = ({ currentUser, setCurrentUser }) => {
  const [usersSavedParks, setUsersSavedParks] = useState({})
  console.log("usersSavedParks on frontend: ", usersSavedParks)

  useEffect(() => {
    retrieveUsersSavedParks(currentUser, setUsersSavedParks)
  }, []);

  return (
    <div>
      <NavBar
        buttonStatus='Logout'
        setCurrentUser={setCurrentUser}
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