import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { swimmers, times, events, meets } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stroke = searchParams.get('stroke') || 'Free';
    const distance = searchParams.get('distance') || '100';
    const region = searchParams.get('region') || 'all';
    const lsc = searchParams.get('lsc') || 'all';
    const ageGroup = searchParams.get('ageGroup') || 'all';
    const gender = searchParams.get('gender') || 'all';
    const limit = parseInt(searchParams.get('limit') || '100');

    // For now, let's get all rankings and filter in the application
    // This avoids the complex query builder issues
    const results = await db
      .select({
        swimmer_id: swimmers.id,
        name: swimmers.name,
        club: swimmers.club,
        region: swimmers.region,
        lsc: swimmers.lsc,
        age: swimmers.age,
        gender: swimmers.gender,
        time_seconds: times.time_seconds,
        time_formatted: times.time_formatted,
        event_name: events.name,
        meet_name: meets.name,
        meet_date: meets.date,
        is_personal_best: times.is_personal_best,
        stroke: events.stroke,
        distance: events.distance,
      })
      .from(times)
      .innerJoin(swimmers, eq(times.swimmer_id, swimmers.id))
      .innerJoin(events, eq(times.event_id, events.id))
      .innerJoin(meets, eq(times.meet_id, meets.id))
      .orderBy(asc(times.time_seconds))
      .limit(limit);

    // Filter results in the application
    let filteredResults = results;

    // Stroke filter
    if (stroke !== 'all') {
      filteredResults = filteredResults.filter(r => r.stroke === stroke);
    }

    // Distance filter
    if (distance !== 'all') {
      filteredResults = filteredResults.filter(r => r.distance === parseInt(distance));
    }

    // Region filter
    if (region !== 'all') {
      filteredResults = filteredResults.filter(r => r.region === region);
    }

    // LSC filter
    if (lsc !== 'all') {
      filteredResults = filteredResults.filter(r => r.lsc === lsc);
    }

    // Gender filter
    if (gender !== 'all') {
      filteredResults = filteredResults.filter(r => r.gender === gender);
    }

    // Age group filter
    if (ageGroup !== 'all') {
      if (ageGroup === '10u') {
        filteredResults = filteredResults.filter(r => r.age && r.age <= 10);
      } else if (ageGroup === '11-12') {
        filteredResults = filteredResults.filter(r => r.age && r.age >= 11 && r.age <= 12);
      } else if (ageGroup === '13-14') {
        filteredResults = filteredResults.filter(r => r.age && r.age >= 13 && r.age <= 14);
      } else if (ageGroup === '15-16') {
        filteredResults = filteredResults.filter(r => r.age && r.age >= 15 && r.age <= 16);
      } else if (ageGroup === '17-18') {
        filteredResults = filteredResults.filter(r => r.age && r.age >= 17 && r.age <= 18);
      } else if (ageGroup === '19+') {
        filteredResults = filteredResults.filter(r => r.age && r.age >= 19);
      } else if (ageGroup === '18u') {
        filteredResults = filteredResults.filter(r => r.age && r.age <= 18);
      } else {
        // Individual age
        const age = parseInt(ageGroup);
        if (!isNaN(age)) {
          filteredResults = filteredResults.filter(r => r.age === age);
        }
      }
    }

    // Add rank to each result
    const rankings = filteredResults.map((result, index) => ({
      rank: index + 1,
      swimmer_id: result.swimmer_id,
      name: result.name,
      club: result.club,
      region: result.region,
      lsc: result.lsc,
      age: result.age,
      gender: result.gender,
      time_seconds: result.time_seconds,
      time_formatted: result.time_formatted,
      event_name: result.event_name,
      meet_name: result.meet_name,
      meet_date: result.meet_date,
      is_personal_best: result.is_personal_best,
    }));

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 