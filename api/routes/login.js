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

  console.log("username: ", username)
  console.log("password: ", password)

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
      console.log("value HERE: ", value)

      if (value) {
        return validUsernamePassword(username, password) 
      } else {
        res.send(errors.incorrect)
        throw new Error('error');
      }
    })
    .then((value) => {
      console.log("value from validUsernamePassword helper: ", value)
      if (value) {
        console.log("Huuur")
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