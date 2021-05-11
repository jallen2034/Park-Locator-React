import React from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '15px',
    marginRight: '15px',
  }
}))

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
const deleteSavedPark = function (place_id, currentUser, setUsersSavedParks) {
  axios.put("/api/deleteSavedPark", { place_id, currentUser })
    .then((response) => {
      toast.success(`${response.data} deleted from your saved parks!`)
      setUsersSavedParks((currentState) => {
        return [...currentState].filter((currentPark) => {
          return currentPark.name !== response.data
        })
      })
    })
}

// helper to navigate the user to the park they have saved on their map
const goToOnMap = function (place_id, setClickedPark, setMapCenter, setClickedParkInList) {
  axios.put("/api/individualParkLocation", { place_id })
    .then((response) => {
      const location_lat = response.data[0].location_lat
      const location_long = response.data[0].location_long
      setClickedPark(place_id)
      setMapCenter([location_lat, location_long])
      setClickedParkInList('')
    })
}

const UserSavedParksButton = ({ currentUser, place_id, setUsersSavedParks, setClickedPark, setMapCenter, setClickedParkInList }) => {
  const classes = useStyles()

  return (
    <div>
      <Button
        className={classes.root}
        variant="contained"
        color="secondary"
        disableElevation
        onClick={(e) => deleteSavedPark(place_id, currentUser, setUsersSavedParks)}
      >
        Remove
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.root}
        onClick={(e) => goToOnMap(place_id, setClickedPark, setMapCenter, setClickedParkInList)}
      >
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>Go to on Map</Link>
      </Button>
    </div>
  )
}

export default UserSavedParksButton