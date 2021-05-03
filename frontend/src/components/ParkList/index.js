import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ParkListItem from '../ParkListItem'

// update state of the clicked park in our list of parks, also updates our map center state too
const listItemClick = function (event, place_id, setClickedPark, setMapCenter, location_lat, location_long, setClickedParkInList, ) {
  setClickedParkInList(place_id)
  setClickedPark('')
  setMapCenter([location_lat, location_long])
}

/* loop through array of data and create a parklistitem with prop info for each park
 * https://reactjs.org/docs/hooks-reference.html#useref */
const ParkList = ({ parksForMap, currentUser, setClickedPark, clickedPark, setMapCenter, clickedParkInList, setClickedParkInList }) => {
  let listOfParks
  
  if (parksForMap.length > 0) {
    listOfParks = parksForMap.map(({ place_id, name, formatted_address, phone, website, location_lat, location_long }) => {
      let selected = false
      let selectedStyle = false
      if (clickedPark === place_id) selected = true
      if (clickedParkInList === place_id) selectedStyle = true
     
      return (
          <ParkListItem
            place_id={place_id}
            name={name}
            formattedAddress={formatted_address}
            phone={phone}
            website={website}
            currentUser={currentUser}
            selected={selected}
            selectedStyle={selectedStyle}
            listItemClick={listItemClick}
            setClickedPark={setClickedPark}
            setMapCenter={setMapCenter}
            setClickedParkInList={setClickedParkInList}
            location_lat={location_lat}
            location_long={location_long}
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