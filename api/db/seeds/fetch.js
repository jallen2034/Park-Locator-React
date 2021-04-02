/* https://developer.mozilla.org/en-US/docs/Glossary/IIFE
 * inital script to populate skateparks in db - DO NOT RUN THIS SCRIPT IN PRODUCTION */
; (async () => {
  require('dotenv').config();
  const { db } = require('../db');
  const { client } = require('../../mapsApi');
  await require('../schema/dbReset')();

 /* helper functions
  * insert allparks information into my all_skateparks table */
  const insertAllParks = async function (placeDetails, db) {
    const placeId = placeDetails.result.place_id;
    const name = placeDetails.result.name;
    const formattedAddress = placeDetails.result.formatted_address;
    const phone = placeDetails.result.formatted_phone_number;
    const website = placeDetails.result.website;
    const paramaters = [placeId, name, formattedAddress, phone, website];
    const query = `
      INSERT INTO all_skateparks(
        place_id,
        name, 
        formatted_address, 
        phone, 
        website
      )
      VALUES ($1, $2, $3, $4, $5)
    `;

    await db.query(query, paramaters);
  }

  // insert reviews into db
  const insertReviews = async function (placeDetails, db) {
    const placeId = placeDetails.result.place_id;
    const reviews = placeDetails.result.reviews;

    if (reviews) {
      for await (review of reviews) {
        const authorName = review.author_name;
        const authorUrl = review.author_url;
        const language = review.language;
        const profileUrl = review.profile_url;
        const rating = review.rating;
        const timeDescription = review.relative_time_description;
        const text = review.text;
        const time = review.time;
        const paramaters = [
          placeId,
          authorName,
          authorUrl,
          language,
          profileUrl,
          rating,
          timeDescription,
          text,
          time
        ];
        const query = `
          INSERT INTO reviews(
            place_id, 
            review_author, 
            review_author_url, 
            review_language,
            review_profile_url,
            review_rating, 
            relative_time_desc, 
            review_text, 
            review_time
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;

        await db.query(query, paramaters);
      }
    }
  }

  // helper to insert types from google api into relevant table
  const insertTypes = async function (placeDetails, db) {
    const placeId = placeDetails.result.place_id;
    const placeType = placeDetails.result.types;

    for await (parkType of placeType) {
      const paramaters = [placeId, parkType];
      const query = `
        INSERT INTO types(
          place_id,
          types
        )
        VALUES ($1, $2)
      `;

      await db.query(query, paramaters);
    }
  }

  // helper function to insert opening hours into db
  const insertOpeningHours = async function (placeDetails, db) {
    const placeId = placeDetails.result.place_id;
    const openingHours = placeDetails.result.opening_hours;
    
    if (openingHours) {
      const weekdayList = openingHours.weekday_text;

      for (weekdayItem of weekdayList) {
        const paramaters = [placeId, weekdayItem];
        const query = `
          INSERT INTO opening_hours(
            place_id,
            weekday_text
          )
          VALUES ($1, $2)
        `;

        await db.query(query, paramaters)
      }
    }
  }

  // helper function to insert a skateparks location into db
  const insertSkateparkLocation = async function (placeDetails, db) {
    const placeId = placeDetails.result.place_id;
    const parkLocation = placeDetails.result.geometry;

    if (parkLocation) {
      const locationLat = parkLocation.location.lat;
      const locationLong = parkLocation.location.lng;
      const paramaters = [placeId, locationLat, locationLong];
      const query = `
      INSERT INTO skatepark_location(
        place_id,
        location_lat,
        location_long
      )
      VALUES ($1, $2, $3)
    `;

      await db.query(query, paramaters);
    }
  }

  // helper function to insert a skateparks photos into db
  const insertPhotos = async function (placeDetails, db) {
    const placeId = placeDetails.result.place_id;
    const photos = placeDetails.result.photos;

    if (photos) {
      for (photo of photos) {
        const paramaters = [placeId, photo.height, photo.width, photo.html_attributions[0], photo.photo_reference];
        const query = `
          INSERT INTO photos(
            place_id,
            height,
            width,
            html_attribute,
            photoref
          )
          VALUES ($1, $2, $3, $4, $5)
        `

        await db.query(query, paramaters);
      }
    }
  }

  // hit API to get back our skateparks
  const places = await client
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
      return r.data;
    })

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

    const placeDetails = await client
      .placeDetails({
        params: {
          place_id: myPlaceId,
          fields: myFields,
          key: process.env.KEY,
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        console.log(e.response.data.error_message);
      });

    await insertAllParks(placeDetails, db);
    await insertTypes(placeDetails, db);
    await insertReviews(placeDetails, db);
    await insertOpeningHours(placeDetails, db);
    await insertSkateparkLocation(placeDetails, db);
    await insertPhotos(placeDetails, db);
  }
})()