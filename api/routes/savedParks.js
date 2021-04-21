const express = require("express")
const savedParksRoute = express.Router()
const { usersSavedParks } = require('./helpers')

// POST route/backend logic to handle the users saved parks
savedParksRoute.put("/", (req, res) => {
  const { uuid } = req.body
  let userSavedParksList = usersSavedParks(uuid)
  userSavedParksList
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
module.exports = savedParksRoute;