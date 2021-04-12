const express = require("express");
const app = express();
const morgan = require("morgan")
const bodyParser = require('body-parser')
const cors = require('cors')

// middleware. allows us to parse json from client to back end
// http://expressjs.com/en/resources/middleware/morgan.html
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

// separated Routes for each Resource
// const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

// GET & POST requests here, mount all resource routes
// app.use("/login", loginRoute);
app.use('/register', registerRoute)

// app listener
app.listen(5000, () => {
  console.log("Server has started on port 5000")
});