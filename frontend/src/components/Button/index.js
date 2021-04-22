import React from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { toast } from 'react-toastify'

const addToSavedParks = function(place_id, currentUser) {
  console.log("Park place id when button clicked", place_id)
  axios.put("http://localhost:5000/addSavedPark", { place_id, currentUser })
  .then((response) => {
    console.log("response from server with adding a saved park name: ", response.data)
    toast.success(`${response.data} has been successfully added to your saved parks list!`)
  })
}

const MyParksButton = ({ place_id, currentUser }) => {
  return (
    <div>
       <Button 
        variant="contained" 
        color="primary" 
        disableElevation
        onClick={(e) => addToSavedParks(place_id, currentUser)}
        >
         Add to my parks
       </Button>
       <Button variant="contained" color="default" disableElevation>
         Reviews
       </Button>
    </div>
  )
}

export default MyParksButton
