import { useState, useEffect } from 'react'
import ParkList from '../ParkList'
import Map from '../Map'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

const retrieveParksForMap = function (setParksForMap) {
  axios.get("http://localhost:5000/")
    .then((response) => {
      setParksForMap(response.data)
    })
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap-reverse',
    },
  },
  parkList: {
    overflowY: 'scroll',
    width: '580px',
    float: 'left',
    height: '85vh',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    }
  },
  map: {
    // marginTop: '250px'
  },
  searchBar: {
    '& > *': {
      margin: theme.spacing(1),
      width: '90%',
      marginLeft: '25px',
      marginRight: '25px',
      marginBottom: '20px',
      marginTop: '18px'
    },
  },
  mapSearch: {
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    }
  }
}))

const HomePage = ({ currentUser, clickedPark, setClickedPark, clickedParkInList, setClickedParkInList, mapCenter, setMapCenter }) => {
  const classes = useStyles()
  const [parksForMap, setParksForMap] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    retrieveParksForMap(setParksForMap)
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.mapSearch}>
        <form className={classes.searchBar} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Search Skateparks"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value)
            }}
          />
        </form>
        <div className={classes.parkList}>
          <ParkList
            parksForMap={parksForMap}
            currentUser={currentUser}
            setClickedPark={setClickedPark}
            clickedPark={clickedPark}
            setMapCenter={setMapCenter}
            clickedParkInList={clickedParkInList}
            setClickedParkInList={setClickedParkInList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <div className={classes.map}>
        <Map
          parksForMap={parksForMap}
          setClickedPark={setClickedPark}
          clickedPark={clickedPark}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          clickedParkInList={clickedParkInList}
          setClickedParkInList={setClickedParkInList}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}

export default HomePage