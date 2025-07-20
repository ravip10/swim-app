-- Swimmers table
CREATE TABLE IF NOT EXISTS swimmers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_date DATE,
  gender VARCHAR(10),
  club VARCHAR(255),
  region VARCHAR(100),
  state VARCHAR(50),
  country VARCHAR(50) DEFAULT 'USA',
  swimcloud_id VARCHAR(50),
  usas_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meets table
CREATE TABLE IF NOT EXISTS meets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255),
  course_type VARCHAR(20) DEFAULT 'LCM', -- LCM, SCM, SCY
  level VARCHAR(50), -- Local, Regional, State, National
  region VARCHAR(100),
  state VARCHAR(50),
  country VARCHAR(50) DEFAULT 'USA',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table (different swimming events)
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  distance INTEGER NOT NULL,
  stroke VARCHAR(20) NOT NULL, -- Freestyle, Backstroke, Breaststroke, Butterfly, IM
  course_type VARCHAR(20) NOT NULL, -- LCM, SCM, SCY
  gender VARCHAR(10),
  age_group VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Results table
CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  swimmer_id INTEGER REFERENCES swimmers(id),
  meet_id INTEGER REFERENCES meets(id),
  event_id INTEGER REFERENCES events(id),
  time_ms INTEGER NOT NULL, -- Time in milliseconds
  time_string VARCHAR(20) NOT NULL, -- Formatted time string
  place INTEGER,
  points DECIMAL(10,2),
  is_personal_best BOOLEAN DEFAULT FALSE,
  is_meet_record BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rankings table
CREATE TABLE IF NOT EXISTS rankings (
  id SERIAL PRIMARY KEY,
  swimmer_id INTEGER REFERENCES swimmers(id),
  event_id INTEGER REFERENCES events(id),
  time_ms INTEGER NOT NULL,
  time_string VARCHAR(20) NOT NULL,
  rank INTEGER,
  total_swimmers INTEGER,
  percentile DECIMAL(5,2),
  region VARCHAR(100),
  state VARCHAR(50),
  age_group VARCHAR(20),
  year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Standards table (qualifying times)
CREATE TABLE IF NOT EXISTS standards (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  standard_type VARCHAR(50), -- A, AA, AAA, AAAA, etc.
  time_ms INTEGER NOT NULL,
  time_string VARCHAR(20) NOT NULL,
  gender VARCHAR(10),
  age_group VARCHAR(20),
  year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Progress tracking table
CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  swimmer_id INTEGER REFERENCES swimmers(id),
  event_id INTEGER REFERENCES events(id),
  old_time_ms INTEGER,
  new_time_ms INTEGER,
  improvement_ms INTEGER,
  improvement_percentage DECIMAL(5,2),
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_swimmers_region ON swimmers(region);
CREATE INDEX IF NOT EXISTS idx_swimmers_state ON swimmers(state);
CREATE INDEX IF NOT EXISTS idx_results_swimmer ON results(swimmer_id);
CREATE INDEX IF NOT EXISTS idx_results_meet ON results(meet_id);
CREATE INDEX IF NOT EXISTS idx_results_event ON results(event_id);
CREATE INDEX IF NOT EXISTS idx_rankings_swimmer ON rankings(swimmer_id);
CREATE INDEX IF NOT EXISTS idx_rankings_event ON rankings(event_id);
CREATE INDEX IF NOT EXISTS idx_rankings_region ON rankings(region);
CREATE INDEX IF NOT EXISTS idx_rankings_state ON rankings(state); 