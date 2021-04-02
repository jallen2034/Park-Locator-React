// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// inital script to populate skateparks in db - DO NOT RUN THIS SCRIPT IN PRODUCTION
;(async () => {
  require('dotenv').config();
  const {db, db} = require('../db');
  const {client} = require('../../mapsApi');
  await require('../schema/dbReset')();
  
  // hit API to get back our skateparks
  client
    .placesNearby({
      params: {
        location: { lat: 49.2827, lng: -123.1207 },
        radius: 50000,
        keyword: 'skatepark',
        key: process.env.KEY,
      },
      timeout: 1000, // milliseconds
    })
    .then((r) => {
      const places  = r.data;
  
      /* hit the details endpoint on places api to get more information for each place
       * https://github.com/googlemaps/google-maps-services-js/blob/master/src/places/details.ts */
      for (place of places.results) {
        const myPlaceId = place.place_id;
        const myFields = [
          'name',
          'place_id',
          'formatted_address', 
          'formatted_phone_number', 
          'opening_hours', 
          'type',
          'review',
          'website', 
          'photo',
          'geometry'
        ]
  
        client
          .placeDetails({
            params: {
              place_id: myPlaceId,
              fields: myFields,
              key: process.env.KEY,
            },
            timeout: 1000, // milliseconds
          })
          .then((r) => {
            const placeDetails = r.data;
            insertAllParks(placeDetails, db);
          })
          .catch((e) => {
            console.log(e.response.data.error_message);
          });
      }
    })
  
    // insert allparks information into my all_skateparks table
    const insertAllParks = function(placeDetails, db) {
      const placeId = placeDetails.result.place_id;
      const name = placeDetails.result.name;
      const formattedAddress = placeDetails.result.formatted_address;
      const phone = placeDetails.result.formatted_phone_number;
      const website = placeDetails.result.website;
      const paramaters = [placeId, name, formattedAddress, phone, website];
  
      const query = `
        INSERT INTO all_skateparks(place_id, name, formatted_address, phone, website)
        VALUES ($1, $2, $3, $4, $5)
      `;
      db.query(query, paramaters);
    }
    db.end()
})()