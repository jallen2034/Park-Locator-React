const express = require("express")
const deleteSavedParkRoute = express.Router()
const { deleteSavedParkForUser, getUserId, getParkName } = require('./helpers')

deleteSavedParkRoute.put("/", (req, res) => {
  console.log("GOT HERE")
  const { place_id, currentUser } = req.body
  console.log("currentUser: ", currentUser)
  
  let getUsersId = getUserId(currentUser.uuid)
  getUsersId.then((value) => {
    if (value) {
      return deleteSavedParkForUser(place_id, value)
    } else {
      throw new Error('error deleting park')
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

module.exports = deleteSavedParkRoute;