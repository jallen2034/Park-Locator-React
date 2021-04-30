const express = require("express")
const individualReviewRoute = express.Router()
const { retrieveIndividualReview } = require('./helpers')

// GET route to fetch reviews for only 1 skatepark the user selects in the park list on the map
individualReviewRoute.put("/", (req, res) => {
  const { place_id } = req.body
  let review = retrieveIndividualReview(place_id)
  review
    .then((value) => {
      if (value) {
        res.send(value)
      } else {
        throw new Error('error grabbing parks')
      }
    })
    .catch((error) => {
      console.log(error)
    })
})

// export module
module.exports = individualReviewRoute;