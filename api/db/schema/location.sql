DROP TABLE IF EXISTS skatepark_location;

CREATE TABLE skatepark_location (
  id SERIAL NOT NULL,
  place_id VARCHAR(255) REFERENCES all_skateparks(place_id) ON DELETE CASCADE,
  location_lat VARCHAR(255),
  location_long VARCHAR(255)
);
