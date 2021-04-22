import React from 'react'
import ParkData from '../ParkData'
import UserSavedParksButton from '../Button/index.2'

const UserSavedParks = ({ usersSavedParks, currentUser, setUsersSavedParks }) => {
  let savedParks

  if (usersSavedParks.length > 0) {
    savedParks = usersSavedParks.map(({ place_id, name, formattedAddress, phone, website }) => {
      return (
        <div>
          <ParkData
            name={name}
            formattedAddress={formattedAddress}
            phone={phone}
            website={website}
          />
          <UserSavedParksButton 
            currentUser={currentUser} 
            place_id={place_id} 
            setUsersSavedParks={setUsersSavedParks}
          />
        </div>
      )
    })
  }

  if (savedParks) {
    return (
      <div>
        {savedParks}
      </div>
    )
  } else {
    return (
      <div>
        Loading
      </div>
    )
  }
}

export default UserSavedParks
