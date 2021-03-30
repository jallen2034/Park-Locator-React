DROP TABLE IF EXISTS all_skateparks;

CREATE TABLE all_skateparks (
  id SERIAL NOT NULL,
  place_id VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  formatted_address VARCHAR(255),
  phone VARCHAR(255),
  website VARCHAR(255)
);