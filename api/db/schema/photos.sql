DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL NOT NULL,
  place_id VARCHAR(255) REFERENCES all_skateparks(place_id) ON DELETE CASCADE,
  height INTEGER NOT NULL,
  width INTEGER NOT NULL, 
  html_attribute VARCHAR(512),
  photoref VARCHAR(512)
);
