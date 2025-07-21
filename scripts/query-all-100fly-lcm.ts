import { db } from '../src/lib/db';
import { swimmers, times, events, meets } from '../src/lib/schema';
import { eq, and } from 'drizzle-orm';

async function main() {
  const results = await db
    .select({
      time_id: times.id,
      swimmer: swimmers.name,
      club: swimmers.club,
      region: swimmers.region,
      lsc: swimmers.lsc,
      age: swimmers.age,
      gender: swimmers.gender,
      time_seconds: times.time_seconds,
      time_formatted: times.time_formatted,
      event_age_group: events.age_group,
      meet: meets.name,
      date: meets.date,
      season: meets.season,
    })
    .from(times)
    .innerJoin(swimmers, eq(times.swimmer_id, swimmers.id))
    .innerJoin(events, eq(times.event_id, events.id))
    .innerJoin(meets, eq(times.meet_id, meets.id))
    .where(and(
      eq(events.name, '100 Fly'),
      eq(events.course, 'LCM'),
      eq(meets.season, '2024-2025')
    ));
  console.table(results);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 