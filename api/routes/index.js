const express = require("express")
const indexRoute = express.Router()
const { retrieveParksForMap } = require('./helpers')

indexRoute.get("/", (req, res) => {
  let skateparkList = retrieveParksForMap()
  skateparkList
  .then((value) => {
    if (value) {
      res.send(value)
    } else {
      throw new Error('error grabbing parks')
    }
  })
  .catch((error) => {
    console.log(error);
  })
})

// export module
module.exports = indexRoute;