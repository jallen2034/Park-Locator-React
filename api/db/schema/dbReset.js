const { db } = require('../db');
const fs = require('fs');

/* function to reset db
 * https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
 * https://stackoverflow.com/questions/36502401/postgres-drop-database-error-pq-cannot-drop-the-currently-open-database */
module.exports = async () => {
  await db.query('DROP SCHEMA public CASCADE');
  await db.query('CREATE SCHEMA public');
  await db.query(fs.readFileSync('../schema/all_skateparks.sql', 'utf8'));
  await db.query(fs.readFileSync('../schema/users.sql', 'utf8'));
  await db.query(fs.readFileSync('../schema/user_saved_parks.sql', 'utf8'));
  await db.query(fs.readFileSync('../schema/types.sql', 'utf8'));
  await db.query(fs.readFileSync('../schema/opening_hours.sql', 'utf8'));
  await db.query(fs.readFileSync('../schema/photos.sql', 'utf8'));
  await db.query(fs.readFileSync('../schema/reviews.sql', 'utf8'));
}
