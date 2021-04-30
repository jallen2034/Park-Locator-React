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
app.use(bodyParser.urlencoded({ extended: true }));

// separated Routes for each Resource
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const reviewsRoute = require('./routes/reviews')
const individualReviewRoute = require('./routes/individualReviews')
const indexRoute = require('./routes/index')
const savedParksRoute = require('./routes/savedParks')
const addSavedParkRoute = require('./routes/addSavedPark')
const deleteSavedParkRoute = require('./routes/deleteSavedPark')

// GET & POST requests here, mount all resource routes
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/reviews', reviewsRoute)
app.use('/individualReviews', individualReviewRoute)
app.use('/', indexRoute)
app.use('/userSavedParks', savedParksRoute)
app.use('/addSavedPark', addSavedParkRoute)
app.use('/deleteSavedPark', deleteSavedParkRoute)

// app listener
app.listen(5000, () => {
  console.log("Server has started on port 5000")
});