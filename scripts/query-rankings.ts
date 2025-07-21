import { db } from '../src/lib/db';
import { rankings, swimmers, events, times } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

async function main() {
  // Query all rankings with swimmer and event info
  const results = await db
    .select({
      ranking_id: rankings.id,
      rank: rankings.rank,
      swimmer: swimmers.name,
      event: events.name,
      event_id: events.id,
      time: times.time_formatted,
      season: rankings.season,
      total_swimmers: rankings.total_swimmers,
    })
    .from(rankings)
    .innerJoin(swimmers, eq(rankings.swimmer_id, swimmers.id))
    .innerJoin(events, eq(rankings.event_id, events.id))
    .innerJoin(times, eq(rankings.time_id, times.id));

  console.log('Rankings table records:');
  console.table(results);
}

main().then(() => process.exit(0)); 