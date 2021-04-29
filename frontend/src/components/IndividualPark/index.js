import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '25px',
    marginTop: '40px'
  }
}))

// child component to handle an individual review 
const IndividualReview = ({ review }) => {
  return (
    <>
      <h4>{review.review_author}</h4>
      <h4>{review.review_rating}</h4>
      <h4>{review.review_text}</h4>
    </>
  )
}

/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values */
const IndividualPark = ({ park, value }) => {
  const classes = useStyles()
  let individualParkReviews
  individualParkReviews = value.map((review) => <IndividualReview review={review} id={review.place_id} />)

  return (
    <div className={classes.root}>
      <h2>{park}</h2>
      {individualParkReviews}
    </div>
  )
}

export default IndividualPark