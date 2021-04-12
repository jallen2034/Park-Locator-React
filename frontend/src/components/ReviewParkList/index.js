import React from 'react'
import IndividualPark from '../IndividualPark'

// mock AXIOS data from API
const data = [
  {'Bonsor/Metrotown Skatepark': 
    [
      {
        place_id: "ChIJJ-1Xnlx2hlQRRAhzvmN_39U",
        review_author: 'Shelly Schram',
        review_rating: 5,
        review_text: 'Awesome skatepark for the kids. Great for doing tricks. My son loves it'
      },
      {
        place_id: "ChIJJ-1Xnlx2hlQRRAhzvmN_39U",
        review_author: "Ehtesham Sajid",
        review_rating: 5,
        review_text: "It's an amazing facility for a beginner and advanced. Gets 'very crowded in evening."
      },
      {
        place_id: "ChIJJ-1Xnlx2hlQRRAhzvmN_39U",
        review_author: "Sandeep Kumar",
        review_rating: 5,
        review_text: "Nice clean place..lots of activities to do."
      },
    ]
  },
  {'Confederation Skatepark': 
    [
      {
        place_id: "ChIJk4KuKbdwhlQRiCD25HtBHng",
        review_author: "Graham Cottons",
        review_rating: 3,
        review_text: "Please fix the hole on the northern mound. My wife just went down hard after her skate got caught in it."
      }
    ]
  }
]

// component to render out all the reviews for parks
const ReviewParkList = () => {
  const parkReviews = data.map((park) => {
    return (
      <div>
        <IndividualPark
          park={park}
        />
      </div>
    )
  })
  return (
    <div>
      {parkReviews}
    </div>
  )
}

export default ReviewParkList
