DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  place_id VARCHAR(255) REFERENCES all_skateparks(place_id) ON DELETE CASCADE,
  review_author VARCHAR(255),
  review_author_url VARCHAR(8192),
  review_language VARCHAR(255),
  review_profile_url VARCHAR(8192),
  review_rating INTEGER NOT NULL,
  relative_time_desc VARCHAR(255),
  review_text TEXT NOT NULL,
  review_time VARCHAR(255)
);