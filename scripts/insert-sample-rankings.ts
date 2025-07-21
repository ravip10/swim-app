import { db } from '../src/lib/db';
import { swimmers, meets, events, times, rankingsCache } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

async function upsertSwimmer(name: string, club: string, gender: string) {
  // Try to find swimmer by name
  let swimmer = (await db.select().from(swimmers).where(eq(swimmers.name, name)).limit(1))[0];
  if (!swimmer) {
    const [inserted] = await db.insert(swimmers).values({
      name,
      club,
      region: 'Unknown',
      lsc: null,
      age: 10, // default for sample
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
      location: 'Sample Location',
      date: new Date('2025-06-01'),
      season: '2024-2025',
      level: 'Unknown',
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

async function insertSampleRankings() {
  // LSC to Region mapping
  const lscToRegion: Record<string, string> = {
    'Louisiana Swimming': 'Southern',
    'Irvine Novaquatics': 'Western',
    'San Ramon Valley Aquatics': 'Western',
    'Crawfish Aquatics': 'Southern',
    'Front Range Barracudas': 'Central',
    'PASA': 'Western',
    'Katy Aquatics': 'Southern',
    'Sioux Falls Swim Team': 'Central',
    'Santa Clara Swim Club': 'Western',
    'Tualatin Hills Swim Club': 'Western',
    'Nitro Swimming': 'Southern',
    'Clifton Seahawks': 'Eastern',
    'Tampa Bay Aquatic Club': 'Southern',
    'Lakeside Aquatic Club (TX)': 'Southern',
    'SwimMAC Carolina': 'Southern',
    'Bolles School Sharks': 'Southern',
    'New Orleans Aqua': 'Southern',
    'South Louisiana Swim Team': 'Southern',
    'Nu Wave Swim Club': 'Southern',
    'Hurricane Swim Club': 'Southern',
    'YMCA of NW LA': 'Southern',
  };

  // Sample 1: 2024-2025, Women, 50 Back, LCM, 10 and under, USA Swimming
  const eventName1 = '50 Back';
  const event1 = await upsertEvent(eventName1, 50, 'Back', 'F', '10 and under', 'LCM');
  const meetNames1 = [
    'Jun Age Group Championship',
    '2025 Tiger Aquatics C/B/BB...',
    'CA NOVA Speedo Grand Ch...',
    'LA TAQ Tristan Vessel Invita...',
    'CO Steve Drozda Shotgun L...',
    'Pacific Adam Szmidt Age Gr...',
    'GU AGS Aggieland Invitatio...',
    '2025 SD SFST Sanford invite',
    'Pacific Adam Szmidt Age Gr...',
    'OR THSC Spring Invitational',
    '2025 ST NTRO LC Prelim Fi...',
    'NJ JAC NJ JAC MetersMani...',
    'Florida Summer Age Group ...',
    '2025 Bill Nixon LC',
    'NC SGSA 69th Annual Easte...',
    '2025 ST NTRO LC Prelim Fi...',
    'FL PSA 14th Annual JAX50 ...',
  ];
  const swimmers1 = [
    { name: 'Annabelle Hayes', club: 'Irvine Novaquatics', meet: meetNames1[0], time: 33.31 },
    { name: 'Kyra Tan', club: 'San Ramon Valley Aquatics', meet: meetNames1[1], time: 34.27 },
    { name: 'Grace Wang', club: 'Irvine Novaquatics', meet: meetNames1[2], time: 34.50 },
    { name: 'Elli Nettles', club: 'Crawfish Aquatics', meet: meetNames1[3], time: 34.72 },
    { name: 'Ellie Sungy', club: 'Front Range Barracudas', meet: meetNames1[4], time: 34.75 },
    { name: 'Renee Pang', club: 'PASA', meet: meetNames1[5], time: 34.76 },
    { name: 'Emma Morgan', club: 'Katy Aquatics', meet: meetNames1[6], time: 34.81 },
    { name: 'Kinley Hinrich', club: 'Sioux Falls Swim Team', meet: meetNames1[7], time: 34.83 },
    { name: 'Irene Zhong', club: 'Santa Clara Swim Club', meet: meetNames1[8], time: 35.28 },
    { name: 'Victoria Gu', club: 'Tualatin Hills Swim Club', meet: meetNames1[9], time: 35.35 },
    { name: 'Willow Friend', club: 'Nitro Swimming', meet: meetNames1[10], time: 35.39 },
    { name: 'Julianne Roldan', club: 'Clifton Seahawks', meet: meetNames1[11], time: 35.58 },
    { name: 'Lillian Segovia', club: 'Tampa Bay Aquatic Club', meet: meetNames1[12], time: 35.60 },
    { name: 'Erica Wang', club: 'Lakeside Aquatic Club (TX)', meet: meetNames1[13], time: 35.83 },
    { name: 'Anna Sammons', club: 'SwimMAC Carolina', meet: meetNames1[14], time: 35.84 },
    { name: 'Avery Posegay', club: 'Nitro Swimming', meet: meetNames1[15], time: 35.84 },
    { name: 'Solomia Fesenko', club: 'Bolles School Sharks', meet: meetNames1[16], time: 35.86 },
  ];

  for (let i = 0; i < swimmers1.length; i++) {
    const s = swimmers1[i];
    const swimmer = await upsertSwimmer(s.name, s.club, 'F');
    const meet = await upsertMeet(s.meet);
    const [insertedTime] = await db.insert(times).values({
      swimmer_id: swimmer.id,
      meet_id: meet.id,
      event_id: event1.id,
      time_seconds: s.time.toString(),
      time_formatted: s.time.toFixed(2),
      is_personal_best: i === 0, // mark first as PB
    }).returning();
    await db.insert(rankingsCache).values({
      swimmer_id: swimmer.id,
      event_id: event1.id,
      time_id: insertedTime.id,
      rank: i + 1,
      total_swimmers: swimmers1.length,
      stroke: 'Back',
      distance: 50,
      course: 'LCM',
      gender: 'F',
      age_group: '10 and under',
      region: lscToRegion[s.club] || null,
      lsc: s.club,
      season: '2024-2025',
    });
  }

  // Sample 2: 2024-2025, Women, 100 Fly, LCM, 8 and under, Louisiana Swimming
  const eventName2 = '100 Fly';
  const event2 = await upsertEvent(eventName2, 100, 'Fly', 'F', '8 and under', 'LCM');
  const swimmers2 = [
    { name: 'Ilaria Prakash', club: 'New Orleans Aqua', meet: '17th Annual Splashin’ the C...', time: 121.74 },
    { name: 'Louna Hallam', club: 'New Orleans Aqua', meet: 'LA TAQ Tristan Vessel Invita...', time: 127.30 },
    { name: 'Addie Eitmann', club: 'South Louisiana Swim Team', meet: 'LA TAQ Tristan Vessel Invita...', time: 132.35 },
    { name: 'Maggie Baxter', club: 'Nu Wave Swim Club', meet: 'LA TAQ Tristan Vessel Invita...', time: 134.43 },
    { name: 'Jocelyn Navarre', club: 'Hurricane Swim Club', meet: 'LA CRAW Crawfish Aquatics...', time: 147.42 },
    { name: 'Kinsley Poole', club: 'YMCA of NW LA', meet: '2025 YNWL LC June Invite a...', time: 164.73 },
  ];
  for (let i = 0; i < swimmers2.length; i++) {
    const s = swimmers2[i];
    const swimmer = await upsertSwimmer(s.name, s.club, 'F');
    const meet = await upsertMeet(s.meet);
    const [insertedTime] = await db.insert(times).values({
      swimmer_id: swimmer.id,
      meet_id: meet.id,
      event_id: event2.id,
      time_seconds: s.time.toString(),
      time_formatted: s.time.toFixed(2),
      is_personal_best: i === 0,
    }).returning();
    await db.insert(rankingsCache).values({
      swimmer_id: swimmer.id,
      event_id: event2.id,
      time_id: insertedTime.id,
      rank: i + 1,
      total_swimmers: swimmers2.length,
      stroke: 'Fly',
      distance: 100,
      course: 'LCM',
      gender: 'F',
      age_group: '8 and under',
      region: lscToRegion[s.club] || null,
      lsc: s.club,
      season: '2024-2025',
    });
  }

  // Sample 3: 2024-2025, Women, 100 Fly, LCM, 8 and under, Georgia Swimming
  const swimmersGA = [
    { name: 'Abigail Magouyrk', club: 'Tidal Wave Swimming', meet: '2025 RAYS Spring LC Invite', time: 102.86 },
    { name: 'Callan Rutherford', club: 'SwimAtlanta', meet: '2025 SE Richard Quick Invit...', time: 104.89 },
    { name: 'Emmy Poorman', club: 'Dynamo Swim Club', meet: '2025 GA DYNA Summer Invi...', time: 112.32 },
    { name: 'Yilin Dai', club: 'Dynamo Swim Club', meet: 'Gold Summer Invite 2025', time: 115.14 },
    { name: 'Ainsley Shahien', club: 'Low Country Aquatic Club', meet: 'SST Fool\'s Gold', time: 123.67 },
    { name: 'Laurelie Jarun', club: 'Dynamo Swim Club', meet: 'Gold Summer Invite 2025', time: 132.78 },
    { name: 'Yuki Chen', club: 'SwimAtlanta', meet: '2025 Betsy Dunbar LC Meet', time: 138.31 },
    { name: 'Mia Zuniga Mendoza', club: 'SwimAtlanta', meet: '2025 Betsy Dunbar LC Meet', time: 143.89 },
    { name: 'Ashley Young', club: 'Columbus Aquatic Club', meet: '2025 DYNA Coda Classic', time: 170.25 },
    { name: 'Zuri Geter', club: 'HLHK Seals', meet: '2025 DYNA Coda Classic', time: 176.91 },
    { name: 'Addyson Murphy', club: 'HLHK Seals', meet: 'Tommie L. Jackson Diversit...', time: 179.85 },
    { name: 'Madilyn Wood', club: 'HLHK Seals', meet: 'Tommie L. Jackson Diversit...', time: 185.87 },
  ];
  for (let i = 0; i < swimmersGA.length; i++) {
    const s = swimmersGA[i];
    const swimmer = await upsertSwimmer(s.name, s.club, 'F');
    const meet = await upsertMeet(s.meet);
    const [insertedTime] = await db.insert(times).values({
      swimmer_id: swimmer.id,
      meet_id: meet.id,
      event_id: event2.id,
      time_seconds: s.time.toString(),
      time_formatted: s.time.toFixed(2),
      is_personal_best: i === 0,
    }).returning();
    await db.insert(rankingsCache).values({
      swimmer_id: swimmer.id,
      event_id: event2.id,
      time_id: insertedTime.id,
      rank: i + 1,
      total_swimmers: swimmersGA.length,
      stroke: 'Fly',
      distance: 100,
      course: 'LCM',
      gender: 'F',
      age_group: '8 and under',
      region: 'Southern',
      lsc: 'Georgia Swimming',
      season: '2024-2025',
    });
  }

  // Sample 4: 2024-2025, Women, 100 Fly, LCM, 8 and under, Arizona Swimming
  const swimmersAZ = [
    { name: 'Alexa Jenner', club: 'Phoenix Swim Club', meet: 'SI Splash & Dash', time: 91.78 },
    { name: 'Milan Chavkin', club: 'Phoenix Swim Club', meet: 'AZ PSC Phoenix Summer In...', time: 107.71 },
    { name: 'Scarlett Freeman', club: 'Life Time Arizona', meet: 'April LC Opener', time: 132.14 },
    { name: 'Zoey Robles', club: 'Life Time Arizona', meet: 'AZ PSC Phoenix Summer In...', time: 133.04 },
  ];
  for (let i = 0; i < swimmersAZ.length; i++) {
    const s = swimmersAZ[i];
    const swimmer = await upsertSwimmer(s.name, s.club, 'F');
    const meet = await upsertMeet(s.meet);
    const [insertedTime] = await db.insert(times).values({
      swimmer_id: swimmer.id,
      meet_id: meet.id,
      event_id: event2.id,
      time_seconds: s.time.toString(),
      time_formatted: s.time.toFixed(2),
      is_personal_best: i === 0,
    }).returning();
    await db.insert(rankingsCache).values({
      swimmer_id: swimmer.id,
      event_id: event2.id,
      time_id: insertedTime.id,
      rank: i + 1,
      total_swimmers: swimmersAZ.length,
      stroke: 'Fly',
      distance: 100,
      course: 'LCM',
      gender: 'F',
      age_group: '8 and under',
      region: 'Western',
      lsc: 'Arizona Swimming',
      season: '2024-2025',
    });
  }

  // Sample 5: 2024-2025, Women, 100 Fly, LCM, 8 and under, Gulf Swimming
  const swimmersGulf = [
    { name: 'Elaine Hayes', club: 'Escalate Aquatic Team', meet: 'GU BATS May Meet', time: 90.94 },
    { name: 'Emma Liu', club: 'Katy Aquatics', meet: 'GU CFSC Fleet Last Chance', time: 90.96 },
    { name: 'Karri Stewart', club: 'Houston Bridge Bats', meet: 'GU CFSC Fleet Summer Cla...', time: 93.06 },
    { name: 'Christine Yao', club: 'Magnolia Aquatic', meet: 'GU Fleet TWST Schools Out', time: 93.33 },
    { name: 'Ahana Ghosh', club: 'Cypress Fairbanks Swim Club', meet: 'GU CFSC Fleet Spring Slam', time: 97.35 },
    { name: 'Miguelly Torres', club: 'Houston Hydra', meet: 'GU BTA\'s April Ducky Derby ...', time: 98.37 },
    { name: 'Olivia Viel', club: 'South Shore Sails', meet: 'Gulf Age Group Champions...', time: 100.37 },
    { name: 'Jordin Omoniyi', club: 'Cypress Fairbanks Swim Club', meet: 'Gulf Age Group Champions...', time: 102.06 },
    { name: 'Mackenzie Mullins', club: 'Houston Hydra', meet: 'GU BTA\'s April Ducky Derby ...', time: 102.39 },
    { name: 'Ella Xu', club: 'Team 300', meet: 'GU BATS LC Invite', time: 104.01 },
    { name: 'Brooke Pipes', club: 'TEST', meet: 'GU GULF TEST Spring Splash', time: 104.52 },
    { name: 'Emma Lopez-Galindo', club: 'First Colony Swim Team, Inc.', meet: '2025 FCST Summer Splash', time: 110.64 },
    { name: 'Meredith Wilson', club: 'South Shore Sails', meet: 'GU Fleet TWST Schools Out', time: 114.68 },
    { name: 'Aria Dulworth', club: 'Swim Streamline at Northa...', meet: 'GU Fleet TWST Schools Out', time: 125.07 },
    { name: 'Ariana Carballo', club: 'Fulshear Racing Swim Team', meet: 'GU GULF TEST Spring Splash', time: 126.52 },
    { name: 'Amelia Schoessler', club: 'South Shore Sails', meet: 'GU BATS May Meet', time: 128.78 },
  ];
  for (let i = 0; i < swimmersGulf.length; i++) {
    const s = swimmersGulf[i];
    const swimmer = await upsertSwimmer(s.name, s.club, 'F');
    const meet = await upsertMeet(s.meet);
    const [insertedTime] = await db.insert(times).values({
      swimmer_id: swimmer.id,
      meet_id: meet.id,
      event_id: event2.id,
      time_seconds: s.time.toString(),
      time_formatted: s.time.toFixed(2),
      is_personal_best: i === 0,
    }).returning();
    await db.insert(rankingsCache).values({
      swimmer_id: swimmer.id,
      event_id: event2.id,
      time_id: insertedTime.id,
      rank: i + 1,
      total_swimmers: swimmersGulf.length,
      stroke: 'Fly',
      distance: 100,
      course: 'LCM',
      gender: 'F',
      age_group: '8 and under',
      region: 'Southern',
      lsc: 'Gulf Swimming',
      season: '2024-2025',
    });
  }

  console.log('✅ Sample rankings inserted!');
}

insertSampleRankings().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 