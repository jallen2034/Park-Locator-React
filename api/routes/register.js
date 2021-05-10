const express = require("express")
const registerRoute = express.Router()
const { userNameExists, addUserToDb, passwordVerifier } = require('./helpers')

// POST route to handle the user registering for a user - TODO
registerRoute.put("/", (req, res) => {

  const { username, password, passwordConfirm } = req.body
  const errors = {
    username: "Must provide username!",
    password: "Must provide password!",
    confirmation: "Must provide confirmation password!",
    passwordsNoMatch: "Password and password confirmation do not match!",
    usernameTaken: "Username is taken",
    passwordNotValid: "Your password must: "
  }

  // https://stackoverflow.com/questions/17720264/remove-last-comma-from-a-string
  if (!username) {
    res.send(errors.username)
    return
  } else if (!password) {
    res.send(errors.password)
    return
  } else if (!passwordConfirm) {
    res.send(errors.confirmation)
    return
  } else if (password !== passwordConfirm) {
    res.send(errors.passwordsNoMatch)
    return
  }

  let validUsername = userNameExists(username)
  validUsername
    .then((value) => {
      if (value) {
        res.send(errors.usernameTaken)
      } else {
        return passwordVerifier(password)
      }
    })
    .then((value) => {
      if (!value.status) {
        errors.passwordNotValid += value.error
        const finalError = errors.passwordNotValid.replace(/,\s*$/, ".")
        res.send(finalError)
      } else {
        return addUserToDb(username, password)
      }
    })
    .then((value) => {
      res.send(value)
    })
    .catch((error) => {
      console.log(error);
    })
})

// export module
module.exports = registerRoute;