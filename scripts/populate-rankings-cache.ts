import { db } from '../src/lib/db';
import { rankingsCache, swimmers, events, times, meets } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

async function populateRankingsCache() {
  try {
    console.log('Starting to populate rankings cache...');

    // Get some sample data
    const sampleSwimmers = await db.select().from(swimmers).limit(5);
    const sampleEvents = await db.select().from(events).limit(3);
    const sampleTimes = await db.select().from(times).limit(10);

    if (sampleSwimmers.length === 0 || sampleEvents.length === 0 || sampleTimes.length === 0) {
      console.log('Not enough sample data to populate rankings cache');
      return;
    }

    console.log(`Found ${sampleSwimmers.length} swimmers, ${sampleEvents.length} events, ${sampleTimes.length} times`);

    // Create sample rankings cache entries
    const rankingsToInsert = [];

    for (const event of sampleEvents) {
      for (const swimmer of sampleSwimmers) {
        // Find a time for this swimmer and event
        const swimmerTime = sampleTimes.find(t => 
          t.swimmer_id === swimmer.id && t.event_id === event.id
        );

        if (swimmerTime) {
          // Create rankings for different filter combinations
          const filterCombinations = [
            {
              stroke: event.stroke,
              distance: event.distance,
              course: event.course || 'SCY',
              gender: swimmer.gender,
              age_group: '13-14',
              region: swimmer.region,
              lsc: swimmer.lsc,
              season: '2024'
            },
            {
              stroke: event.stroke,
              distance: event.distance,
              course: event.course || 'SCY',
              gender: swimmer.gender,
              age_group: '15-16',
              region: swimmer.region,
              lsc: swimmer.lsc,
              season: '2024'
            },
            {
              stroke: event.stroke,
              distance: event.distance,
              course: event.course || 'SCY',
              gender: swimmer.gender,
              age_group: 'all',
              region: null,
              lsc: null,
              season: '2024'
            }
          ];

          for (const filters of filterCombinations) {
            rankingsToInsert.push({
              swimmer_id: swimmer.id,
              event_id: event.id,
              time_id: swimmerTime.id,
              rank: Math.floor(Math.random() * 10) + 1, // Random rank 1-10
              total_swimmers: Math.floor(Math.random() * 50) + 10, // Random total 10-60
              ...filters
            });
          }
        }
      }
    }

    if (rankingsToInsert.length > 0) {
      console.log(`Inserting ${rankingsToInsert.length} ranking cache entries...`);
      
      // Insert in batches to avoid overwhelming the database
      const batchSize = 10;
      for (let i = 0; i < rankingsToInsert.length; i += batchSize) {
        const batch = rankingsToInsert.slice(i, i + batchSize);
        await db.insert(rankingsCache).values(batch);
        console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rankingsToInsert.length / batchSize)}`);
      }

      console.log('Successfully populated rankings cache!');
    } else {
      console.log('No ranking entries to insert');
    }

  } catch (error) {
    console.error('Error populating rankings cache:', error);
    throw error;
  }
}

// Run population if this script is executed directly
if (require.main === module) {
  populateRankingsCache()
    .then(() => {
      console.log('Population script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Population script failed:', error);
      process.exit(1);
    });
}

export { populateRankingsCache }; 