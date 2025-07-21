import { db } from '../src/lib/db';
import { events, times, swimmers, meets } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

async function main() {
  console.log('All events:');
  const allEvents = await db.select().from(events);
  console.table(allEvents);

  console.log('All times:');
  const allTimes = await db
    .select({
      time_id: times.id,
      swimmer: swimmers.name,
      club: swimmers.club,
      event_id: times.event_id,
      meet_id: times.meet_id,
      time_seconds: times.time_seconds,
      time_formatted: times.time_formatted,
      is_personal_best: times.is_personal_best,
    })
    .from(times)
    .innerJoin(swimmers, eq(swimmers.id, times.swimmer_id));
  console.table(allTimes);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 