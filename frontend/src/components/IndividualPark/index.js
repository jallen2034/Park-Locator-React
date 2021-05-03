import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '25px',
    paddingRight: '25px',
  },
  cardContent: {
    "&:hover": {
      backgroundColor: "#f8f8f8"
    },
    marginTop: '20px',
    marginBottom: '20px',
    borderRadius: 12,
  },
  h4: {
    fontSize: '24px'
  },
  h5: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '10px'
  },
  h6: {
    fontSize: '16px',
    marginTop: '10px',
    marginBottom: '10px'
  },
}))

// child component to handle an individual review 
const IndividualReview = ({ review }) => {
  const classes = useStyles()

  return (
    <Card variant="outlined" className={classes.cardContent}>
      <CardContent className={classes.cardContent}>
        <Typography variant='h5' className={classes.h5}>
          {review.review_author}
        </Typography>
        <Typography variant='h6' className={classes.h6}>
          {review.review_rating}
        </Typography>
        <Typography variant='h6' className={classes.h6}>
          {review.review_text}
        </Typography>
      </CardContent>
    </Card>
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
       <Typography variant='h4' className={classes.h4}>
         {park}
       </Typography>
      {individualParkReviews}
    </div>
  )
}

export default IndividualPark