import React from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px'
  }
}))

const addToSavedParks = function(place_id, currentUser) {
  const error = "Sorry, you already added this saved park!"
  axios.put("http://localhost:5000/addSavedPark", { place_id, currentUser })
  .then((response) => {

    if (response.data === error) {
      toast.error(error)
    } else {
      toast.success(`${response.data} has been successfully added to your saved parks list!`)
    }
  })
}

const MyParksButton = ({ place_id, currentUser }) => {
  const classes = useStyles()
  return (
    <div>
       <Button
        className={classes.root}
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
