import { db } from '@/lib/db';
import { swimmers, meets, events, times, standards } from '@/lib/schema';

export async function seedSampleData() {
  console.log('🌱 Seeding sample data...');

  try {
    // Insert sample swimmers
    const swimmerData = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        club: 'Aqua Force',
        region: 'Eastern',
        lsc: 'NE',
        age: 16,
        gender: 'F',
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        club: 'Swim Elite',
        region: 'Western',
        lsc: 'PC',
        age: 15,
        gender: 'M',
      },
      {
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@example.com',
        club: 'Dolphin Swim Club',
        region: 'Southern',
        lsc: 'FL',
        age: 14,
        gender: 'F',
      },
      {
        name: 'Alex Thompson',
        email: 'alex.thompson@example.com',
        club: 'Tidal Wave',
        region: 'Central',
        lsc: 'IL',
        age: 17,
        gender: 'M',
      },
      {
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        club: 'Ocean Riders',
        region: 'Western',
        lsc: 'SC',
        age: 15,
        gender: 'F',
      },
      {
        name: 'David Kim',
        email: 'david.kim@example.com',
        club: 'Aqua Force',
        region: 'Eastern',
        lsc: 'MA',
        age: 16,
        gender: 'M',
      },
      {
        name: 'Sophie Williams',
        email: 'sophie.williams@example.com',
        club: 'Little Dolphins',
        region: 'Eastern',
        lsc: 'MET',
        age: 8,
        gender: 'F',
      },
      {
        name: 'Lucas Martinez',
        email: 'lucas.martinez@example.com',
        club: 'Swim Kids',
        region: 'Southern',
        lsc: 'GA',
        age: 10,
        gender: 'M',
      },
      {
        name: 'Zoe Anderson',
        email: 'zoe.anderson@example.com',
        club: 'Aqua Force',
        region: 'Eastern',
        lsc: 'CT',
        age: 12,
        gender: 'F',
      },
      {
        name: 'Ethan Davis',
        email: 'ethan.davis@example.com',
        club: 'Swim Elite',
        region: 'Western',
        lsc: 'OR',
        age: 13,
        gender: 'M',
      },
      {
        name: 'Ava Wilson',
        email: 'ava.wilson@example.com',
        club: 'Tidal Wave',
        region: 'Central',
        lsc: 'OH',
        age: 11,
        gender: 'F',
      },
      {
        name: 'Noah Brown',
        email: 'noah.brown@example.com',
        club: 'Ocean Riders',
        region: 'Western',
        lsc: 'PNW',
        age: 9,
        gender: 'M',
      },
    ];

    const insertedSwimmers = await db.insert(swimmers).values(swimmerData).returning();
    console.log(`✅ Inserted ${insertedSwimmers.length} swimmers`);

    // Insert sample meets
    const meetData = [
      {
        name: 'Spring Championship',
        location: 'Aquatic Center, NY',
        date: new Date('2024-03-15'),
        season: '2024 Spring',
        level: 'Regional',
      },
      {
        name: 'Summer Invitational',
        location: 'Olympic Pool, CA',
        date: new Date('2024-06-20'),
        season: '2024 Summer',
        level: 'State',
      },
      {
        name: 'Fall Classic',
        location: 'Swim Complex, TX',
        date: new Date('2024-09-10'),
        season: '2024 Fall',
        level: 'Local',
      },
    ];

    const insertedMeets = await db.insert(meets).values(meetData).returning();
    console.log(`✅ Inserted ${insertedMeets.length} meets`);

    // Insert sample events
    const eventData = [
      { name: '50 Free', distance: 50, stroke: 'Free', gender: 'M', age_group: '15-16' },
      { name: '50 Free', distance: 50, stroke: 'Free', gender: 'F', age_group: '15-16' },
      { name: '100 Free', distance: 100, stroke: 'Free', gender: 'M', age_group: '15-16' },
      { name: '100 Free', distance: 100, stroke: 'Free', gender: 'F', age_group: '15-16' },
      { name: '200 Free', distance: 200, stroke: 'Free', gender: 'M', age_group: '15-16' },
      { name: '200 Free', distance: 200, stroke: 'Free', gender: 'F', age_group: '15-16' },
      { name: '100 Back', distance: 100, stroke: 'Back', gender: 'M', age_group: '15-16' },
      { name: '100 Back', distance: 100, stroke: 'Back', gender: 'F', age_group: '15-16' },
      { name: '100 Breast', distance: 100, stroke: 'Breast', gender: 'M', age_group: '15-16' },
      { name: '100 Breast', distance: 100, stroke: 'Breast', gender: 'F', age_group: '15-16' },
      { name: '100 Fly', distance: 100, stroke: 'Fly', gender: 'M', age_group: '15-16' },
      { name: '100 Fly', distance: 100, stroke: 'Fly', gender: 'F', age_group: '15-16' },
      { name: '200 IM', distance: 200, stroke: 'IM', gender: 'M', age_group: '15-16' },
      { name: '200 IM', distance: 200, stroke: 'IM', gender: 'F', age_group: '15-16' },
    ];

    const insertedEvents = await db.insert(events).values(eventData).returning();
    console.log(`✅ Inserted ${insertedEvents.length} events`);

          // Insert sample times
      const timeData = [
        // Sarah Johnson times
        {
          swimmer_id: insertedSwimmers[0].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[1].id, // 50 Free F
          time_seconds: '26.45',
          time_formatted: '26.45',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[0].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[3].id, // 100 Free F
          time_seconds: '57.23',
          time_formatted: '57.23',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[0].id,
          meet_id: insertedMeets[1].id,
          event_id: insertedEvents[1].id, // 50 Free F
          time_seconds: '26.12',
          time_formatted: '26.12',
          is_personal_best: true,
        },
        // Michael Chen times
        {
          swimmer_id: insertedSwimmers[1].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[0].id, // 50 Free M
          time_seconds: '24.78',
          time_formatted: '24.78',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[1].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[2].id, // 100 Free M
          time_seconds: '53.45',
          time_formatted: '53.45',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[1].id,
          meet_id: insertedMeets[1].id,
          event_id: insertedEvents[0].id, // 50 Free M
          time_seconds: '24.32',
          time_formatted: '24.32',
          is_personal_best: true,
        },
        // Emma Rodriguez times
        {
          swimmer_id: insertedSwimmers[2].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[9].id, // 100 Breast F
          time_seconds: '72.34',
          time_formatted: '1:12.34',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[2].id,
          meet_id: insertedMeets[1].id,
          event_id: insertedEvents[9].id, // 100 Breast F
          time_seconds: '71.89',
          time_formatted: '1:11.89',
          is_personal_best: true,
        },
        // Alex Thompson times
        {
          swimmer_id: insertedSwimmers[3].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[6].id, // 100 Back M
          time_seconds: '58.92',
          time_formatted: '58.92',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[3].id,
          meet_id: insertedMeets[1].id,
          event_id: insertedEvents[6].id, // 100 Back M
          time_seconds: '58.45',
          time_formatted: '58.45',
          is_personal_best: true,
        },
        // Maria Garcia times
        {
          swimmer_id: insertedSwimmers[4].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[11].id, // 100 Fly F
          time_seconds: '65.78',
          time_formatted: '1:05.78',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[4].id,
          meet_id: insertedMeets[1].id,
          event_id: insertedEvents[11].id, // 100 Fly F
          time_seconds: '65.23',
          time_formatted: '1:05.23',
          is_personal_best: true,
        },
        // David Kim times
        {
          swimmer_id: insertedSwimmers[5].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[12].id, // 200 IM M
          time_seconds: '125.67',
          time_formatted: '2:05.67',
          is_personal_best: true,
        },
        {
          swimmer_id: insertedSwimmers[5].id,
          meet_id: insertedMeets[1].id,
          event_id: insertedEvents[12].id, // 200 IM M
          time_seconds: '124.89',
          time_formatted: '2:04.89',
          is_personal_best: true,
        },
        // Sophie Williams times (8 years old)
        {
          swimmer_id: insertedSwimmers[6].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[1].id, // 50 Free F
          time_seconds: '45.23',
          time_formatted: '45.23',
          is_personal_best: true,
        },
        // Lucas Martinez times (10 years old)
        {
          swimmer_id: insertedSwimmers[7].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[0].id, // 50 Free M
          time_seconds: '42.15',
          time_formatted: '42.15',
          is_personal_best: true,
        },
        // Zoe Anderson times (12 years old)
        {
          swimmer_id: insertedSwimmers[8].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[1].id, // 50 Free F
          time_seconds: '32.45',
          time_formatted: '32.45',
          is_personal_best: true,
        },
        // Ethan Davis times (13 years old)
        {
          swimmer_id: insertedSwimmers[9].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[0].id, // 50 Free M
          time_seconds: '29.78',
          time_formatted: '29.78',
          is_personal_best: true,
        },
        // Ava Wilson times (11 years old)
        {
          swimmer_id: insertedSwimmers[10].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[1].id, // 50 Free F
          time_seconds: '35.12',
          time_formatted: '35.12',
          is_personal_best: true,
        },
        // Noah Brown times (9 years old)
        {
          swimmer_id: insertedSwimmers[11].id,
          meet_id: insertedMeets[0].id,
          event_id: insertedEvents[0].id, // 50 Free M
          time_seconds: '48.67',
          time_formatted: '48.67',
          is_personal_best: true,
        },
      ];

    const insertedTimes = await db.insert(times).values(timeData).returning();
    console.log(`✅ Inserted ${insertedTimes.length} times`);

    // Insert sample standards
    const standardData = [
      { event_id: insertedEvents[0].id, level: 'A', gender: 'M', age_group: '15-16', time_seconds: '25.50', season: '2024' },
      { event_id: insertedEvents[1].id, level: 'A', gender: 'F', age_group: '15-16', time_seconds: '27.00', season: '2024' },
      { event_id: insertedEvents[2].id, level: 'A', gender: 'M', age_group: '15-16', time_seconds: '55.00', season: '2024' },
      { event_id: insertedEvents[3].id, level: 'A', gender: 'F', age_group: '15-16', time_seconds: '58.00', season: '2024' },
      { event_id: insertedEvents[0].id, level: 'AA', gender: 'M', age_group: '15-16', time_seconds: '24.50', season: '2024' },
      { event_id: insertedEvents[1].id, level: 'AA', gender: 'F', age_group: '15-16', time_seconds: '26.00', season: '2024' },
    ];

    const insertedStandards = await db.insert(standards).values(standardData).returning();
    console.log(`✅ Inserted ${insertedStandards.length} standards`);

    console.log('🎉 Sample data seeding completed successfully!');
    return {
      swimmers: insertedSwimmers.length,
      meets: insertedMeets.length,
      events: insertedEvents.length,
      times: insertedTimes.length,
      standards: insertedStandards.length,
    };

  } catch (error) {
    console.error('❌ Error seeding sample data:', error);
    throw error;
  }
} 