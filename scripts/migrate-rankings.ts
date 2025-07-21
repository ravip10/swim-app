import { db } from '../src/lib/db';
import { rankingsCache, rankingsJobs } from '../src/lib/schema';

async function migrateRankings() {
  try {
    console.log('Starting rankings migration...');

    // Create rankings_cache table
    console.log('Creating rankings_cache table...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS rankings_cache (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        swimmer_id UUID REFERENCES swimmers(id),
        event_id UUID REFERENCES events(id),
        time_id UUID REFERENCES times(id),
        rank INTEGER NOT NULL,
        total_swimmers INTEGER NOT NULL,
        
        -- Filter Context (what makes this ranking unique)
        stroke TEXT NOT NULL,
        distance INTEGER NOT NULL,
        course TEXT NOT NULL,
        gender TEXT NOT NULL,
        age_group TEXT NOT NULL,
        region TEXT,
        lsc TEXT,
        season TEXT NOT NULL,
        
        -- Metadata
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create rankings_jobs table
    console.log('Creating rankings_jobs table...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS rankings_jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        status TEXT NOT NULL,
        filters JSONB NOT NULL,
        total_records INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        completed_at TIMESTAMP,
        error_message TEXT
      );
    `);

    // Add course column to events table if it doesn't exist
    console.log('Adding course column to events table...');
    await db.execute(`
      ALTER TABLE events ADD COLUMN IF NOT EXISTS course TEXT NOT NULL DEFAULT 'SCY';
    `);

    // Create indexes for better performance
    console.log('Creating indexes...');
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_rankings_cache_filters 
      ON rankings_cache (stroke, distance, course, gender, age_group, season);
    `);

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_rankings_cache_swimmer 
      ON rankings_cache (swimmer_id);
    `);

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_rankings_jobs_status 
      ON rankings_jobs (status, created_at);
    `);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateRankings()
    .then(() => {
      console.log('Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

export { migrateRankings }; 