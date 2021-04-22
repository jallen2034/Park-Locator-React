import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ParkListItem from '../ParkListItem'

// loop through array of data and create a parklistitem with prop info for each park
const ParkList = ({ parksForMap, currentUser }) => {
  let listOfParks

  if (parksForMap.length > 0) {
    listOfParks = parksForMap.map(({ place_id, name, formatted_address, phone, website }) => {
      return (
        <ParkListItem
          place_id={place_id}
          name={name}
          formattedAddress={formatted_address}
          phone={phone}
          website={website}
          currentUser={currentUser}
        />
      )
    })
  }

  return (
    <div>
      {listOfParks}
    </div>
  )
}

export default ParkList