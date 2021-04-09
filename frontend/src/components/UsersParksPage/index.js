import React from 'react'
import NavBar from '../Navbar'
import UserSavedParks from '../UserSavedParks'

const UsersParksPage = () => {
  return (
    <div>
      <NavBar
        buttonStatus='Logout'
      />
      <UserSavedParks/>
    </div>
  )
}

export default UsersParksPage
