const express = require("express");
const registerRoute = express.Router();

// POST route to handle the user registering for a user - TODO
registerRoute.put("/", (req, res) => {
  const { email, password, passwordConfirm } = req.body
  console.log("email: ", email)
  console.log("password: ", password)
  console.log("passwordConfirm: ", passwordConfirm)
  res.send("Success")
})

// export module
module.exports = registerRoute;