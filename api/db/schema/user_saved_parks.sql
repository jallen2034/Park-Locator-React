DROP TABLE IF EXISTS user_saved_parks CASCADE;

CREATE TABLE user_saved_parks (
  id SERIAL PRIMARY KEY NOT NULL,
  place_id VARCHAR(255) REFERENCES all_skateparks(place_id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);