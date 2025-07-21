import { db } from '../src/lib/db';
import { swimmers, meets, events, times } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

async function upsertSwimmer(name: string, club: string, age: number, gender: string) {
  let swimmer = (await db.select().from(swimmers).where(eq(swimmers.name, name)).limit(1))[0];
  if (!swimmer) {
    const [inserted] = await db.insert(swimmers).values({
      name,
      club,
      region: 'Southern',
      lsc: 'Test LSC',
      age,
      gender,
      email: `${name.replace(/ /g, '').toLowerCase()}@example.com`,
    }).returning();
    swimmer = inserted;
  }
  return swimmer;
}

async function upsertMeet(name: string) {
  let meet = (await db.select().from(meets).where(eq(meets.name, name)).limit(1))[0];
  if (!meet) {
    const [inserted] = await db.insert(meets).values({
      name,
      location: 'Test Pool',
      date: new Date('2025-06-01'),
      season: '2024-2025',
      level: 'Test',
    }).returning();
    meet = inserted;
  }
  return meet;
}

async function upsertEvent(name: string, distance: number, stroke: string, gender: string, age_group: string, course: string) {
  let event = (await db.select().from(events).where(eq(events.name, name)).limit(1))[0];
  if (!event) {
    const [inserted] = await db.insert(events).values({
      name,
      distance,
      stroke,
      gender,
      age_group,
      course,
    }).returning();
    event = inserted;
  }
  return event;
}

async function insertSyntheticAgeGroupTestData() {
  const eventName = '100 Fly';
  const course = 'LCM';
  const season = '2024-2025';
  const gender = 'F';
  const meetName = 'Test Age Group Meet';

  // Age groups
  const ageGroups = ['8 and under', '10 and under'];

  // Swimmers: [name, age, time]
  const swimmersData = [
    ['Sally Seven', 7, 120.00],
    ['Emily Eight', 8, 118.00],
    ['Nina Nine', 9, 115.00],
    ['Tina Ten', 10, 112.00],
    ['Ava Eight', 8, 119.00],
    ['Zoe Seven', 7, 121.00],
    ['Maya Nine', 9, 116.00],
    ['Lily Ten', 10, 113.00],
  ];

  // Insert for each swimmer in all relevant age groups
  for (const [name, ageRaw, timeRaw] of swimmersData) {
    const age = Number(ageRaw);
    const time = Number(timeRaw);
    const swimmer = await upsertSwimmer(String(name), 'Test Club', age, gender);
    const meet = await upsertMeet(meetName);
    // Insert for exact age group
    let eventAgeGroup = '';
    if (age <= 8) eventAgeGroup = '8 and under';
    else if (age <= 10) eventAgeGroup = '10 and under';
    // Insert for exact age (for testing exact age filter)
    const eventExactAge = await upsertEvent(eventName, 100, 'Fly', gender, String(age), course);
    const [insertedTimeExact] = await db.insert(times).values({
      swimmer_id: swimmer.id,
      meet_id: meet.id,
      event_id: eventExactAge.id,
      time_seconds: time.toString(),
      time_formatted: time.toFixed(2),
      is_personal_best: true,
    }).returning();
    // Insert for 8 and under
    if (age <= 8) {
      const event8u = await upsertEvent(eventName, 100, 'Fly', gender, '8 and under', course);
      await db.insert(times).values({
        swimmer_id: swimmer.id,
        meet_id: meet.id,
        event_id: event8u.id,
        time_seconds: time.toString(),
        time_formatted: time.toFixed(2),
        is_personal_best: false,
      });
    }
    // Insert for 10 and under
    if (age <= 10) {
      const event10u = await upsertEvent(eventName, 100, 'Fly', gender, '10 and under', course);
      await db.insert(times).values({
        swimmer_id: swimmer.id,
        meet_id: meet.id,
        event_id: event10u.id,
        time_seconds: time.toString(),
        time_formatted: time.toFixed(2),
        is_personal_best: false,
      });
    }
  }
  console.log('✅ Synthetic age group test data inserted!');
}

insertSyntheticAgeGroupTestData().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 