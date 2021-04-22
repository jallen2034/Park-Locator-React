import React from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { toast } from 'react-toastify'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
const deleteSavedPark = function (place_id, currentUser, setUsersSavedParks) {
  axios.put("http://localhost:5000/deleteSavedPark", { place_id, currentUser })
    .then((response) => {
      toast.success(`${response.data} deleted from your saved parks!`)
      setUsersSavedParks((currentState) => {
        return [...currentState].filter((currentPark) => {
          return currentPark.name !== response.data
        })
      })
    })
}

const UserSavedParksButton = ({ currentUser, place_id, setUsersSavedParks }) => {

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={(e) => deleteSavedPark(place_id, currentUser, setUsersSavedParks)}
      >
        Remove From Saved Parks
       </Button>
      <Button variant="contained" color="default" disableElevation>
        Reviews
       </Button>
      <Button variant="contained" color="primary" disableElevation>
        Go to on Map
       </Button>
    </div>
  )
}

export default UserSavedParksButton