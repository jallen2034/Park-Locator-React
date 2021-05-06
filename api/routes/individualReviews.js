const express = require("express")
const individualReviewRoute = express.Router()
const { retrieveIndividualReview } = require('./helpers')

// reshape our park review data so each review has multiple photos vs being duplicated from our db - bandaid and slow - janky AF - TODO fix later
const reshapeData = function (value) {
  const key = value.key
  let reshapedObjectOfParks = {}
  const parkCache = []
  const reshapedArray = []

  // create inital non-duplicated reviews with an empty array to store photos
  for (const index in value.resRows) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    if (!parkCache.includes(value.resRows[index].review_author_url)) {
      parkCache.push(value.resRows[index].review_author_url)
      reshapedArray.push({
        name: value.resRows[index].name,
        place_id: value.resRows[index].place_id,
        review_author: value.resRows[index].review_author,
        review_author_url: value.resRows[index].review_author_url,
        review_rating: value.resRows[index].review_rating,
        review_text: value.resRows[index].review_text,
        photos: []
      })
    }

    for (const reshapedIndex in reshapedArray) {

      if (value.resRows[index].review_author_url === reshapedArray[reshapedIndex].review_author_url) {
        reshapedArray[reshapedIndex].photos.push({
          height: value.resRows[index].height,
          width: value.resRows[index].width,
          html_attribute: value.resRows[index].html_attribute,
          photoref: value.resRows[index].photoref
        })

      }
    }
  }

  reshapedObjectOfParks = { key: key, resRows: reshapedArray }
  return reshapedObjectOfParks;
}

// GET route to fetch reviews for only 1 skatepark the user selects in the park list on the map
individualReviewRoute.put("/", (req, res) => {
  const { place_id } = req.body
  let review = retrieveIndividualReview(place_id)
  review
    .then((value) => {
      if (value) {
        const data = reshapeData(value)
        res.send(data)
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