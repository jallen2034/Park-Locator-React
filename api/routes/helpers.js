const { db } = require('../db/db');

/* helper to check if a users email address already exists in our database
 * vulnerable to injection - cant get this to work without doing this - bad need to fix! */
const userNameExists = function (username) {

  const query = `
    SELECT username
    FROM users
    WHERE username = '${username}';
  `

  return db.query(query)
    .then(res => {

      console.log("Sucessful query")
      if (res.rows.length === 0) {
        return false
      } else {
        return true
      }
    })
    .catch(error => {
      console.log("Error: ", error);
    })
}

// helper to add a user to the database
const addUserToDb = function (username, password) {
  const parameters = [username, password]
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
  addUserToDb
}