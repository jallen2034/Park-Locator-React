const express = require("express");
const app = express();
const {db} = require('./db/db')

// middleware. allows us to parse json from client to back end
app.use(express.json());

// app listener
app.listen(5000, () => {
  console.log("Server has started on port 5000")
});