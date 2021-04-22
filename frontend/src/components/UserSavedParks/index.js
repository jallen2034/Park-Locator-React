import React from 'react'
import ParkData from '../ParkData'
import UserSavedParksButton from '../Button/index.2'

const UserSavedParks = ({ usersSavedParks }) => {
  let savedParks

  if (usersSavedParks.length > 0) {
    savedParks = usersSavedParks.map(({name, formattedAddress, phone, website}) => {
      return (
        <div>
          <ParkData
            name={name}
            formattedAddress={formattedAddress}
            phone={phone}
            website={website}
          />
          <UserSavedParksButton />
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
