import React from 'react'
import ParkList from '../ParkList'
import Map from '../Map'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  }
}))

const HomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <ParkList />
      </div>
      <div>
        <Map />
      </div>
    </div>
  )
}

export default HomePage
