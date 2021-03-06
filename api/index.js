const express = require("express");
const app = express();
const morgan = require("morgan")
const bodyParser = require('body-parser')
const cors = require('cors')

/* middleware. allows us to parse json from client to back end
 * http://expressjs.com/en/resources/middleware/morgan.html */
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('build'))

// separated Routes for each Resource
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const reviewsRoute = require('./routes/reviews')
const individualReviewRoute = require('./routes/individualReviews')
const retrieveParkLocationRoute = require('./routes/individualParkLocation')
const indexRoute = require('./routes/index')
const savedParksRoute = require('./routes/savedParks')
const addSavedParkRoute = require('./routes/addSavedPark')
const deleteSavedParkRoute = require('./routes/deleteSavedPark')
const photosRoute = require('./routes/photos')

// GET & POST requests here, mount all resource routes
app.use('/api/register', registerRoute)
app.use('/api/login', loginRoute)
app.use('/api/reviews', reviewsRoute)
app.use('/api/individualReviews', individualReviewRoute)
app.use('/api/individualParkLocation', retrieveParkLocationRoute)
app.use('/api/', indexRoute)
app.use('/api/userSavedParks', savedParksRoute)
app.use('/api/addSavedPark', addSavedParkRoute)
app.use('/api/deleteSavedPark', deleteSavedParkRoute)
app.use('/api/photos', photosRoute)

// app listener
app.listen(5000, () => {
  console.log("Server has started on port 5000")
});