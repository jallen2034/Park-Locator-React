DROP TABLE IF EXISTS types CASCADE;

CREATE TABLE types (
  id SERIAL PRIMARY KEY NOT NULL,
  place_id VARCHAR(255) REFERENCES all_skateparks(place_id) ON DELETE CASCADE,
  types VARCHAR(255)
);