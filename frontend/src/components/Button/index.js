import React from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '15px',
    marginRight: '15px',
    marginBottom: '15px'
  },
  button: {
    backgroundColor: '#898a91',
    color: 'white',
    "&:hover": {
      backgroundColor: "#5e5e5e"
    }
  }
}))

const addToSavedParks = function (place_id, currentUser) {
  const error = "Sorry, you already added this saved park!"
  axios.put("/api/addSavedPark", { place_id, currentUser })
    .then((response) => {

      if (response.data === error) {
        toast.error(error)
      } else {
        toast.success(`${response.data} has been successfully added to your saved parks list!`)
      }
    })
}

const MyParksButton = ({ place_id, currentUser, handleClickOpen }) => {
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
      <Button
        className={classes.button}
        variant="contained"
        color="default"
        disableElevation
        onClick={(e) => handleClickOpen(place_id)}
      >
        Reviews
       </Button>
    </div>
  )
}

export default MyParksButton
