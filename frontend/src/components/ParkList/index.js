import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ParkListItem from '../ParkListItem'

// update state of the clicked park in our list of parks, also updates our map center state too
const listItemClick = function (event, place_id, setClickedPark, setMapCenter, location_lat, location_long, setClickedParkInList, ) {
  setClickedParkInList(place_id)
  setClickedPark('')
  setMapCenter([location_lat, location_long])
}

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: '#e6e6e6',
    padding: '20px'
  },
  notSelected: {
    backgroundColor: 'white',
    padding: '20px'
  },
}))

/* loop through array of data and create a parklistitem with prop info for each park
 * https://reactjs.org/docs/hooks-reference.html#useref */
const ParkList = ({ parksForMap, currentUser, setClickedPark, clickedPark, setMapCenter, clickedParkInList, setClickedParkInList }) => {
  const classes = useStyles()
  let listOfParks
  
  if (parksForMap.length > 0) {
    listOfParks = parksForMap.map(({ place_id, name, formatted_address, phone, website, location_lat, location_long }) => {
      let selected = false
      let selectedStyle = false
      if (clickedPark === place_id) selected = true
      if (clickedParkInList === place_id) selectedStyle = true

      return (
        <div
          place_id={place_id} 
          onClick={(event) => listItemClick(event, place_id, setClickedPark, setMapCenter, location_lat, location_long, setClickedParkInList)}
          className={(selected === true || selectedStyle === true) ? classes.selected : classes.notSelected}
          >
          <ParkListItem
            place_id={place_id}
            name={name}
            formattedAddress={formatted_address}
            phone={phone}
            website={website}
            currentUser={currentUser}
            selected={selected}
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