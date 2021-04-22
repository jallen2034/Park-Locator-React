import React from 'react'
import ParkData from '../ParkData'
import Button from '../Button'

const ParkListItem = ({place_id, name, formattedAddress, phone, website, currentUser}) => {
  return (
    <div id={place_id}>
      <ParkData
        name={name}
        formattedAddress={formattedAddress}
        phone={phone}
        website={website}
      />
      <Button place_id={place_id} currentUser={currentUser}/>
    </div>
  )
}

export default ParkListItem
