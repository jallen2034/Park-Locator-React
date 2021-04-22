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
  }
}))

const HomePage = () => {
  const classes = useStyles()
  const [parksForMap, setParksForMap] = useState({})
  console.log("parksForMap: ", parksForMap)

  useEffect(() => {
    retrieveParksForMap(setParksForMap)
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <ParkList parksForMap={parksForMap} />
      </div>
      <div>
        <Map />
      </div>
    </div>
  )
}

export default HomePage
