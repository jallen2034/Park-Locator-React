import React from 'react'
import IndividualPark from '../IndividualPark'

// component to render out all the reviews for parks
const ReviewParkList = ({ reviews }) => {
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
    <div>
      {parkReviews}
    </div>
  )
}

export default ReviewParkList
