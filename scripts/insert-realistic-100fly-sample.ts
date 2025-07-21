import { db } from '../src/lib/db';
import { swimmers, meets, events, times } from '../src/lib/schema';
import { eq, and } from 'drizzle-orm';

async function main() {
  // 1. Insert meet
  const meet = await db.insert(meets).values({
    name: 'LA TAQ Invitational',
    location: 'Baton Rouge Swim Center, LA',
    date: new Date('2024-07-20'),
    season: '2024 Summer',
    level: 'State',
  }).returning();
  const meetId = meet[0].id;

  // 2. Insert events (8&U and 10&U, 100 Fly, LCM, M)
  const event8U = await db.insert(events).values({
    name: '100 Fly',
    distance: 100,
    stroke: 'Fly',
    gender: 'M',
    age_group: '8 and under',
    course: 'LCM',
  }).onConflictDoNothing().returning();
  const event10U = await db.insert(events).values({
    name: '100 Fly',
    distance: 100,
    stroke: 'Fly',
    gender: 'M',
    age_group: '10 and under',
    course: 'LCM',
  }).onConflictDoNothing().returning();
  const event8UId = event8U[0]?.id || (await db.select().from(events).where(and(
    eq(events.name, '100 Fly'),
    eq(events.distance, 100),
    eq(events.stroke, 'Fly'),
    eq(events.gender, 'M'),
    eq(events.age_group, '8 and under'),
    eq(events.course, 'LCM')
  )))[0]?.id;
  const event10UId = event10U[0]?.id || (await db.select().from(events).where(and(
    eq(events.name, '100 Fly'),
    eq(events.distance, 100),
    eq(events.stroke, 'Fly'),
    eq(events.gender, 'M'),
    eq(events.age_group, '10 and under'),
    eq(events.course, 'LCM')
  )))[0]?.id;

  // 3. Insert swimmers (3 regions)
  const swimmerData = [
    { name: 'John Smith', email: 'john.smith@example.com', club: 'Aqua Kids', region: 'Southern', lsc: 'LA', age: 8, gender: 'M' },
    { name: 'Jack Don', email: 'jack.don@example.com', club: 'Wave Riders', region: 'Eastern', lsc: 'NE', age: 9, gender: 'M' },
    { name: 'Jane Doe', email: 'jane.doe@example.com', club: 'Swim Stars', region: 'Western', lsc: 'PC', age: 10, gender: 'F' },
  ];
  const insertedSwimmers = await db.insert(swimmers).values(swimmerData).onConflictDoNothing().returning();
  // If onConflictDoNothing, fetch existing
  const getSwimmerId = async (email: string) => {
    const found = insertedSwimmers.find(s => s.email === email);
    if (found) return found.id;
    const existing = await db.select().from(swimmers).where(eq(swimmers.email, email));
    return existing[0]?.id;
  };
  const johnId = await getSwimmerId('john.smith@example.com');
  const jackId = await getSwimmerId('jack.don@example.com');
  const janeId = await getSwimmerId('jane.doe@example.com');

  // 4. Insert times
  const timeData = [
    // John Smith (8, Southern, 8&U and 10&U)
    { swimmer_id: johnId, meet_id: meetId, event_id: event8UId, time_seconds: '95.10', time_formatted: '1:35.10', is_personal_best: true },
    { swimmer_id: johnId, meet_id: meetId, event_id: event10UId, time_seconds: '95.10', time_formatted: '1:35.10', is_personal_best: true },
    // Jack Don (9, Eastern, 10&U)
    { swimmer_id: jackId, meet_id: meetId, event_id: event10UId, time_seconds: '90.00', time_formatted: '1:30.00', is_personal_best: true },
    // Jane Doe (10, Western, 10&U, F)
    // For Jane, insert a separate event for F
    { swimmer_id: janeId, meet_id: meetId, event_id: event10UId, time_seconds: '105.10', time_formatted: '1:45.10', is_personal_best: true },
  ];
  await db.insert(times).values(timeData);
  console.log('✅ Inserted realistic 100 Fly sample data for 3 swimmers in 3 regions.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 