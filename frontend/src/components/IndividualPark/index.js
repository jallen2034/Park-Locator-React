import React from 'react'

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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
const IndividualPark = ({ park }) => {
  let individualParkReviews
  const value = Object.values(park)[0]
  const parkName = Object.keys(park)[0]

  individualParkReviews = value.map((review) => <IndividualReview review={review} id={review.place_id} />)

  return (
    <div>
      <h2>{parkName}</h2>
      {individualParkReviews}
    </div>
  )
}

export default IndividualPark