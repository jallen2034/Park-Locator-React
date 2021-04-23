const express = require("express")
const addSavedParksRoute = express.Router()
const { addSavedParkForUser, getUserId, getParkName, parkVerification } = require('./helpers')

// POST route/backend logic to handle the users saved parks
addSavedParksRoute.put("/", (req, res) => {
  const { place_id, currentUser } = req.body
  
  let getUsersId = getUserId(currentUser.uuid)
  getUsersId.then((value) => {
    console.log("value: ", value)

    if (value.length > 0) {
      return parkVerification(place_id, value)
    } else {
      throw new Error('error grabbing parks')
    } 
  })
  .then((value) => {
  
    if (value === true) {
      res.send("Sorry, you already added this saved park!")
    } else {
      return addSavedParkForUser(place_id, value.currentUser)
    } 
  })
  .then((value) => {

    if (value) {
      return getParkName(place_id)
    } else {
      throw new Error('error grabbing parks')
    }
  })
  .then((value) => {
    res.send(value)
  })
  .catch((error) => {
    console.log(error)
  })
})

// export module
module.exports = addSavedParksRoute;