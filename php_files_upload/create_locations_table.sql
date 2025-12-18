-- Create locations table for live location tracking

CREATE TABLE IF NOT EXISTS locations (
  username VARCHAR(100) PRIMARY KEY,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
