// db uses plaintext passwords - BAD! TODO - fix using bcrypt before publishing to production
const { db } = require('../db/db');
const bcrypt = require('bcrypt');

/* helper function to generate a 6 char random string, this is not my own implementation, all credit goes to its creator:
   https://stackoverflow.com/questions/16106701/how-to-generate-a-random-string-of-letters-and-numbers-in-javascript */
const generateRandomString = function () {
  const textLen = 6;
  let text = "";
  let charset = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < textLen; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text;
};

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
    SELECT password, uuid
    FROM users
    WHERE username = $1;
  `

  return db.query(query, parameters)
    .then(res => {
      const passwordFromDb = res.rows[0].password
      const uuid = res.rows[0].uuid

      if (bcrypt.compareSync(password, passwordFromDb)) {
        return { true: true, uuid: uuid }
      } else {
        return { false: false }
      }
    })
    .catch(error => {
      console.log("Error: ", error);
    })
}

// helper to add a user to the database
const addUserToDb = function (username, password) {
  const uuid = generateRandomString()
  const hashedPassword = bcrypt.hashSync(password, 10);
  const parameters = [username, hashedPassword, uuid]
  const query = `
    INSERT INTO users (username, password, uuid) 
    VALUES ($1, $2, $3)
  `

  return db.query(query, parameters)
    .then(res => {
      console.log("Sucessful query")
      return { uuid: uuid, true: true };
    })
    .catch(error => {
      console.log("Error: ", error);
      return { false: false }
    })
}

// helper to get all reviews for all skateparks from db and pass to client
const retrieveReviews = function () {
  const query = `
    SELECT name, all_skateparks.place_id, review_author, review_rating, review_text 
    FROM all_skateparks 
    JOIN reviews 
    ON all_skateparks.place_id = reviews.place_id;
  `

  return db.query(query)
    .then(res => {
      const skateparkReviews = res.rows
      return skateparkReviews
    })
    .catch(error => {
      console.log("Error: ", error)
    })
}

// helper to get all skateparks to display on the map/index page
const retrieveParksForMap = function () {
  const query = `
    SELECT all_skateparks.place_id, name, formatted_address, phone, website, location_lat, location_long
    FROM all_skateparks
    JOIN skatepark_location
    ON all_skateparks.place_id = skatepark_location.place_id;
  `

  return db.query(query)
    .then(res => {
      const skateparksForMap = res.rows
      return skateparksForMap
    })
    .catch(error => {
      console.log("Error: ", error)
    })
}

/* helper function to retrieve the saved parks for the current user signed in
 * https://towardsdatascience.com/how-to-solve-the-ambiguous-name-column-error-in-sql-d4c256f3d14c?gi=505204b5446d */
const usersSavedParks = function (uuid) {
  console.log(uuid)
  const parameters = [uuid]

  const query = `
    SELECT name, formatted_address, phone, website, location_lat, location_long, all_skateparks.place_id 
    FROM user_saved_parks 
    JOIN all_skateparks
    ON user_saved_parks.place_id = all_skateparks.place_id
    JOIN skatepark_location 
    ON all_skateparks.place_id = skatepark_location.place_id
    JOIN users
    ON user_saved_parks.user_id = users.id
    WHERE users.uuid = $1;
  `

  return db.query(query, parameters)
    .then(res => {
      const userSavedPakrs = res.rows
      console.log(userSavedPakrs)
      return userSavedPakrs
    })
    .catch(error => {
      console.log("Error: ", error)
    })
}

// export helper functions to be used elsewhere
module.exports = {
  userNameExists,
  addUserToDb,
  validUsernamePassword,
  retrieveReviews,
  retrieveParksForMap,
  usersSavedParks
}