import React from 'react'
import IndividualPark from '../IndividualPark'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '90px',
  }
}))

// component to render out all the reviews for parks
const ReviewParkList = ({ reviews }) => {
  const classes = useStyles()
  const parkReviews = [] 

  for (const [park, value] of Object.entries(reviews)) {
    parkReviews.push(
      <div>
        <IndividualPark
          park={park}
          value={value}
        />
      </div>
    ) 
  }

  return (
    <div className={classes.root}>
      {parkReviews}
    </div>
  )
}

export default ReviewParkList
