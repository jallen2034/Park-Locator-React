const express = require("express")
const addSavedParksRoute = express.Router()
const { addSavedParkForUser, getUserId, getParkName } = require('./helpers')

// POST route/backend logic to handle the users saved parks
addSavedParksRoute.put("/", (req, res) => {
  const { place_id, currentUser } = req.body
  
  let getUsersId = getUserId(currentUser.uuid)
  getUsersId.then((value) => {
    if (value) {
      return addSavedParkForUser(place_id, value)
    } else {
      throw new Error('error grabbing parks')
    } 
  })
  .then((value) => {
    console.log("here your valid user id yee: ", value)

    if (value) {
      return getParkName(place_id)
    } else {
      throw new Error('error grabbing parks')
    }
  })
  .then((value) => {
    console.log("Park name!: ", value)
    res.send(value)
  })
  .catch((error) => {
    console.log(error)
  })
})

// export module
module.exports = addSavedParksRoute;