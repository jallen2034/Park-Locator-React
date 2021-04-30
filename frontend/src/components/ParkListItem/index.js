import { useEffect, useRef, useState } from 'react'
import ParkData from '../ParkData'
import Button from '../Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios'

// SimpleDialog component
const SimpleDialog = function ({ open, handleClose, data, name }) {

  const closeDialog = () => {
    handleClose()
  }

  return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitle id="simple-dialog-title">Reviews For {name}</DialogTitle>
      <List>
        {data.map((review) => (
          <div>
            <ListItem>
              <ListItemText primary={review.review_author} />
            </ListItem>
            <ListItem>
              <ListItemText primary={review.review_rating} />
            </ListItem>
            <ListItem>
              <ListItemText primary={review.review_text} />
            </ListItem>
          </div>
        ))}
      </List>
    </Dialog>
  )
}

// park ListItem component
const ParkListItem = ({ place_id, name, formattedAddress, phone, website, currentUser, selected }) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)
  const parkDiv = useRef(null)

  // helper to fetch individal review from park - note this mutates state - TODO fix
  const handleClickOpen = function (place_id) {
    axios.put("http://localhost:5000/individualReviews", { place_id })
      .then((response) => {
        const apiData = response.data
        setData(apiData)
        setOpen(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClose = function () {
    setOpen(false)
    setData(null)
  }

  useEffect(() => {
    if (parkDiv.current && selected) {
      parkDiv.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [selected, parkDiv])

  if (data) {
    return (
      <div id={place_id} ref={parkDiv}>
        <ParkData
          name={name}
          formattedAddress={formattedAddress}
          phone={phone}
          website={website}
        />
        <Button
          place_id={place_id}
          currentUser={currentUser}
          onClick={handleClickOpen}
        />
        <SimpleDialog
          open={open}
          handleClose={handleClose}
          data={data}
          name={name}
        />
      </div>
    )
  } else {
    return (
      <div id={place_id} ref={parkDiv}>
        <ParkData
          name={name}
          formattedAddress={formattedAddress}
          phone={phone}
          website={website}
        />
        <Button
          place_id={place_id}
          currentUser={currentUser}
          handleClickOpen={handleClickOpen}
        />
      </div>
    )
  }
}

export default ParkListItem