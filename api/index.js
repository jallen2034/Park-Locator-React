const express = require("express");
const app = express();
const {Pool} = require('pg');

// https://node-postgres.com/features/connecting
const db = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: 'park_locator',
  password: "postgres",
  port: 5432
});

// connect node to pg db
db.connect();

// middleware. express.json() allows us to parse json from the client to our back end
app.use(express.json());

// app listener
app.listen(5000, () => {
  console.log("Server has started on port 5000")
});