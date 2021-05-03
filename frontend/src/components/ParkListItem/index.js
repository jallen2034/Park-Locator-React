import { useEffect, useRef, useState } from 'react'
import ParkData from '../ParkData'
import Button from '../Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 260,
    margin: '20px',
    borderRadius: 10
  },
  selected: {
    backgroundColor: '#e6e6e6',
    padding: '20px',
  },
  notSelected: {
    backgroundColor: 'white',
    padding: '20px',
  },
});

/* SimpleDialog component 
 * https://material-ui.com/components/dialogs/
 * https://material-ui.com/customization/components/ */
const SimpleDialog = function ({ open, handleClose, data, name }) {
  const classes = useStyles()
  const closeDialog = () => {
    handleClose()
  }

  return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitle id="simple-dialog-title">Reviews For {name}</DialogTitle>
      <List>
        {data.map((review) => (
            <div>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <ListItem>
                    <ListItemText primary={review.review_author} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={review.review_rating} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={review.review_text} />
                  </ListItem>
                </CardContent>
              </Card>
            </div>
        ))}
      </List>
    </Dialog>
  )
}

// park ListItem component
const ParkListItem = ({ place_id, name, formattedAddress, phone, website, currentUser, selected, selectedStyle, listItemClick, setClickedPark, setMapCenter, setClickedParkInList, location_lat, location_long }) => {
  const classes = useStyles()
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
        block: 'start',
        inline: 'nearest',
      })
    }
  }, [selected, parkDiv])

  return (
    <div
      ref={parkDiv}
      place_id={place_id} 
      onClick={(event) => listItemClick(event, place_id, setClickedPark, setMapCenter, location_lat, location_long, setClickedParkInList)}
      className={(selected === true || selectedStyle === true) ? classes.selected : classes.notSelected}
    >
      <div id={place_id}>
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
        {data && <SimpleDialog
          open={open}
          handleClose={handleClose}
          data={data}
          name={name}
        />}
      </div>
    </div>
  )
}

export default ParkListItem