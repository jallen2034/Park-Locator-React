const express = require("express");
const {Client} = require('pg');

// use client
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "jacob-P34V4",
  port: 5432
});

const app = express();
const cors = require("cors");
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://username:password@host:port/database')

// https://github.com/googlemaps/google-maps-services-js
// import {Client} from "@googlemaps/google-maps-services-js";

/* middleware, CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
 * express.json() allows us to parse json from the client to our back end */
app.use(cors());
app.use(express.json());

// app listener
app.listen(5000, () => {
  console.log("Server has started on port 5000")
});