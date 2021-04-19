import React from 'react'
import IndividualPark from '../IndividualPark'

// component to render out all the reviews for parks
const ReviewParkList = ({ reviews }) => {

  const parkReviews = [] 

  for (const [park, value] of Object.entries(reviews)) {
    console.log(`Hello there ${park}: ${value}`);

    parkReviews.push(
      <div>
        <IndividualPark
          park={park}
          value={value}
        />
      </div>
    ) 
  }

  console.log("parkReviews", parkReviews)
  
  return (
    <div>
      {parkReviews}
    </div>
  )
}

export default ReviewParkList
