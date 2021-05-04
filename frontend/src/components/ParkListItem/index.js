import { useEffect, useRef, useState } from 'react'
import ParkData from '../ParkData'
import Button from '../Button'
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 260,
    margin: '20px',
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "#f8f8f8"
    }
  },
  selected: {
    backgroundColor: '#e6e6e6',
    padding: '20px',
  },
  notSelected: {
    backgroundColor: 'white',
    padding: '20px',
    "&:hover": {
      backgroundColor: "#f8f8f8"
    }
  },
  h4: {
    fontSize: '24px',
    padding: '15px'
  },
  h5: {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px',
  },
  h6: {
    fontSize: '16px',
    padding: '10px'
  }
});

/* SimpleDialog component 
 * https://material-ui.com/components/dialogs
 * https://material-ui.com/customization/components */
const SimpleDialog = function ({ open, handleClose, data, name }) {
  console.log("data with photo info: ", data)
  const classes = useStyles()
  const closeDialog = () => {
    handleClose()
  }

  return (
    <Dialog onClose={closeDialog} open={open}>
      <Typography variant='h4' className={classes.h4}>
        Reviews For {name}
      </Typography>
      <List>
        {data.map((review) => (
            <div>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant='h5' className={classes.h5}>
                    {review.review_author}
                  </Typography>
                  <Typography variant='h6' className={classes.h6}>
                    {review.review_rating} Stars
                  </Typography>
                  <Typography variant='h6' className={classes.h6}>
                    {review.review_text}
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <div>
                        Test test test
                      </div>
                    </CardContent>
                  </Card>
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
  const [mapsApiKey, setMapsApiKey] = useState('')
  const parkDiv = useRef(null)

  console.log("mapsApiKey", mapsApiKey)

  // helper to fetch individal review from park - note this mutates state - TODO fix
  const handleClickOpen = function (place_id) {
    axios.put("http://localhost:5000/individualReviews", { place_id })
      .then((response) => {
        const apiData = response.data.resRows
        const apiKey = response.data.key
        setMapsApiKey(apiKey)
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