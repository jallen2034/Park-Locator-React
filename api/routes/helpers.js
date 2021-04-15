// db uses plaintext passwords - BAD! TODO - fix using bcrypt before publishing to production
const { db } = require('../db/db');
const bcrypt = require('bcrypt');

/* helper to check if a users email address already exists in our database
 * vulnerable to injection - cant get this to work yet without doing this - BAD need to fix! */
const userNameExists = function (username) {
  const parameters = [username]

  const query = `
    SELECT username
    FROM users
    WHERE username = $1;
  `

  return db.query(query, parameters)
    .then(res => {
      console.log("Sucessful query")

      if (res.rows.length === 0) {
        return false
      } else {
        return true
      }
    })
    .catch(error => {
      console.log("Error: ", error)
    })
}

/* helper to validate a user for login - cant get this to work yet without doing this - BAD need to fix!
 * https://node-postgres.com/features/queries#Parameterized%20query */
const validUsernamePassword = function (username, password) {
  const parameters = [username]

  const query = `
    SELECT password
    FROM users
    WHERE username = $1;
  `

  return db.query(query, parameters)
    .then(res => {
      const passwordFromDb = res.rows[0].password

      if (bcrypt.compareSync(password, passwordFromDb)) {
        return true
      } else {
        return false
      }
    })
    .catch(error => {
      console.log("Error: ", error);
    })
}

// helper to add a user to the database
const addUserToDb = function (username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const parameters = [username, hashedPassword]
  const query = `
    INSERT INTO users (username, password) 
    VALUES ($1, $2)
  `

  return db.query(query, parameters)
    .then(res => {
      console.log("Sucessful query")
      return true;
    })
    .catch(error => {
      console.log("Error: ", error);
      return false
    })
}

// export helper functions to be used elsewhere
module.exports = {
  userNameExists,
  addUserToDb,
  validUsernamePassword
}