// https://www.npmjs.com/package/dotenv
// https://www.npmjs.com/package/@googlemaps/google-maps-services-js
const { Client } = require("@googlemaps/google-maps-services-js");

// instantiate gmaps client to make a call to one of the APIs
const client = new Client({});

// export gmaps/places client + db object to be used in my fetch script
module.exports = {
  client
}