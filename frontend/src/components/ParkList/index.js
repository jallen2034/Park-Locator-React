import { makeStyles } from '@material-ui/core/styles'
import ParkListItem from '../ParkListItem'

// helper to update state of the clicked park in our list of parks
const listItemClick = function (event, place_id, setClickedPark) {
  setClickedPark(place_id)
}

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: '#e6e6e6'
  },
  notSelected: {
    backgroundColor: 'white'
  }
}))

/* loop through array of data and create a parklistitem with prop info for each park
 * https://reactjs.org/docs/hooks-reference.html#useref */
const ParkList = ({ parksForMap, currentUser, setClickedPark, clickedPark }) => {
  const classes = useStyles()
  let listOfParks
  
  if (parksForMap.length > 0) {
    listOfParks = parksForMap.map(({ place_id, name, formatted_address, phone, website }) => {
      let selected = false
      if (clickedPark === place_id) selected = true
      
      return (
        <div
          place_id={place_id} 
          onClick={(event) => listItemClick(event, place_id, setClickedPark)}
          className={(selected === true) ? classes.selected : classes.notSelected}
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