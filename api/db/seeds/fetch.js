require('dotenv').config()
// const {db} = require('../db');
const {client} = require('../../mapsApi')

// hit API to get back our skateparks
client
  .placesNearby({
    params: {
      location: { lat: 49.2827, lng: -123.1207 },
      radius: 40000,
      keyword: 'skatepark',
      key: process.env.KEY,
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });