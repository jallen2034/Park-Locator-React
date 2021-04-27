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
  },
  parkList: {
    overflowY: 'scroll',
    width:'550px',
    float: 'left',
    height:'100vh',
    position:'relative'
  }
}))

const HomePage = ({ currentUser }) => {
  const classes = useStyles()
  const [parksForMap, setParksForMap] = useState([])

  useEffect(() => {
    retrieveParksForMap(setParksForMap)
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.parkList}>
        <ParkList parksForMap={parksForMap} currentUser={currentUser} />
      </div>
      <div>
        <Map 
          parksForMap={parksForMap} 
        />
      </div>
    </div>
  )
}

export default HomePage