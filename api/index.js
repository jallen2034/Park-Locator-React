require('dotenv').config()
const express = require("express");
const app = express();
const {Pool} = require('pg');

// https://www.npmjs.com/package/dotenv
// https://www.npmjs.com/package/@googlemaps/google-maps-services-js
const {Client} = require("@googlemaps/google-maps-services-js");

// https://node-postgres.com/features/connecting
const db = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: 'park_locator',
  password: "postgres",
  port: 5432
});

// connect my node to pg db
db.connect();

// instantiate the client to make a call to one of the APIs.
const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: process.env.KEY,
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });

// middleware. express.json() allows us to parse json from the client to our back end
app.use(express.json());

// app listener
app.listen(5000, () => {
  console.log("Server has started on port 5000")
});