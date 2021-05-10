const express = require("express")
const loginRoute = express.Router()
const { userNameExists, validUsernamePassword } = require('./helpers')

// POST route/backend logic to handle the user logging in
loginRoute.put("/", (req, res) => {
  const { username, password } = req.body
  const errors = {
    username: "Must provide username!",
    password: "Must provide password!",
    incorrect: "The username or password is incorrect!"
  }

  /* TODO - refactor into switch statement
  /* https://stackoverflow.com/questions/43772154/how-do-i-break-a-promise-chain */
  if (!username) {
    res.send(errors.username)
    return
  } else if (!password) {
    res.send(errors.password)
    return
  }

  let validUsername = userNameExists(username)
  validUsername
    .then((value) => {

      if (value) {
        return validUsernamePassword(username, password)
      } else {
        res.send(errors.incorrect)
        throw new Error('error');
      }
    })
    .then((value) => {

      if (value.true) {
        res.send(value)
      } else {
        res.send(errors.incorrect)
      }
    })
    .catch((error) => {
      console.log(error);
    })
})

// export module
module.exports = loginRoute;