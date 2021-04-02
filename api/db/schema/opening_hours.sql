DROP TABLE IF EXISTS opening_hours;

CREATE TABLE opening_hours (
  id SERIAL NOT NULL,
  place_id VARCHAR(255) REFERENCES all_skateparks(place_id) ON DELETE CASCADE,
  weekday_text VARCHAR(255)
);
