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
    height: '100vh',
    overflow: 'hidden'
  },
  parkList: {
    overflowY: 'scroll',
    width:'550px',
    float: 'left',
    height:'100vh',
    position:'relative',
  },
  map: {
    marginTop: '250px',
  }
}))

const HomePage = ({ currentUser }) => {
  const classes = useStyles()
  const [parksForMap, setParksForMap] = useState([])
  const [clickedPark, setClickedPark] = useState('')

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
        />
      </div>
      <div classname={classes.map}>
        <Map
          parksForMap={parksForMap}
          setClickedPark={setClickedPark}
          clickedPark={clickedPark}
        />
      </div>
    </div>
  )
}

export default HomePage