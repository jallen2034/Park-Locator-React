const express = require("express")
const reviewsRoute = express.Router()
const { retrieveReviews } = require('./helpers')

/* reshape data into an array of objects for each park, with an aray of reviews inside
 * conditionally make a new key for each skatepark name, for each new park found
 * push each review being looped through with a matching key/park name to the reshaped array for that park */
const reshapeParkData = function (value) {
  console.log("value in all reviews:", value)
  const reshapedObjectOfParks = {}

  for (const index of value) {

    if (!(index.name in reshapedObjectOfParks)) {
      reshapedObjectOfParks[index.name] = []
    }
    reshapedObjectOfParks[index.name].push(index)
  }

  return reshapedObjectOfParks
}

// GET route to fetch reviews for all skateparks in vancouver from database
reviewsRoute.get("/", (req, res) => {
  let reviews = retrieveReviews()
  reviews
    .then((value) => {
      if (value) {
        const reshapedParkData = reshapeParkData(value)
        res.send(reshapedParkData)
      } else {
        throw new Error('error grabbing parks')
      }
    })
    .catch((error) => {
      console.log(error);
    })
})

// export module
module.exports = reviewsRoute;