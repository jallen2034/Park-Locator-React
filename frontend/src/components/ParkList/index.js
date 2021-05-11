import ParkListItem from '../ParkListItem'

// update state of the clicked park in our list of parks, also updates our map center state too
const listItemClick = function (event, place_id, setClickedPark, setMapCenter, location_lat, location_long, setClickedParkInList) {
  setClickedParkInList(place_id)
  setClickedPark('')
  setMapCenter([location_lat, location_long])
}

/* loop through array of data and create a parklistitem with prop info for each park - also implement search functionality
 * https://reactjs.org/docs/hooks-reference.html#useref
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf */
const ParkList = ({ parksForMap, currentUser, setClickedPark, clickedPark, setMapCenter, clickedParkInList, setClickedParkInList, searchQuery, setSearchQuery, setMarkersToHide, markersToHide }) => {
  let listOfParks

  if (parksForMap.length > 0) {
    listOfParks = parksForMap.map(({ place_id, name, formatted_address, phone, website, location_lat, location_long }) => {
      let selected = false
      let selectedStyle = false
      const searchTerm = searchQuery.toLowerCase()
      const parkName = name.toLowerCase()
      if (clickedPark === place_id) selected = true
      if (clickedParkInList === place_id) selectedStyle = true
      if (searchQuery && parkName.indexOf(searchTerm) !== -1) {
        return (
          <ParkListItem
            key={place_id}
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
      } else if (searchQuery && parkName.indexOf(searchTerm) === -1) {
        return (null)
      } else {
        return (
          <ParkListItem
            key={place_id}
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
      }
    })
  }

  return (
    <div>
      {listOfParks}
    </div>
  )
}

export default ParkList