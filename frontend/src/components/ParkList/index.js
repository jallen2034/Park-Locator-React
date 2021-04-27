import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ParkListItem from '../ParkListItem'

// helper to update state of the clicked park in our list of parks
const listItemClick = function (event, place_id, setClickedPark) {
  setClickedPark(place_id)
}

// loop through array of data and create a parklistitem with prop info for each park
const ParkList = ({ parksForMap, currentUser, setClickedPark, clickedPark }) => {
  let listOfParks

  if (parksForMap.length > 0) {
    listOfParks = parksForMap.map(({ place_id, name, formatted_address, phone, website }) => {
      return (
        <div place_id={place_id} onClick={(event) => listItemClick(event, place_id, setClickedPark)}>
          <ParkListItem
            place_id={place_id}
            name={name}
            formattedAddress={formatted_address}
            phone={phone}
            website={website}
            currentUser={currentUser}
          />
        </div>
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