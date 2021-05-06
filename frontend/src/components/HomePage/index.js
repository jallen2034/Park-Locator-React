import { useState, useEffect } from 'react'
import ParkList from '../ParkList'
import Map from '../Map'
import { makeStyles } from '@material-ui/core/styles'
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
  },
  parkList: {
    overflowY: 'scroll',
    width: '580px',
    float: 'left',
    height: '95vh',
    position: 'relative',
  },
  map: {
    // marginTop: '250px',
  }
}))

const HomePage = ({ currentUser, clickedPark, setClickedPark, clickedParkInList, setClickedParkInList, mapCenter, setMapCenter }) => {
  const classes = useStyles()
  const [parksForMap, setParksForMap] = useState([])

  useEffect(() => {
    retrieveParksForMap(setParksForMap)
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.parkList}>
        <ParkList
          parksForMap={parksForMap}
          currentUser={currentUser}
          setClickedPark={setClickedPark}
          clickedPark={clickedPark}
          setMapCenter={setMapCenter}
          clickedParkInList={clickedParkInList}
          setClickedParkInList={setClickedParkInList}
        />
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
        />
      </div>
    </div>
  )
}

export default HomePage