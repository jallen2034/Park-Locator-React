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

module.exports = {
  db
}