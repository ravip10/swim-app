import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { rankingsCache, swimmers, events, times, meets } from '@/lib/schema';
import { eq, and, asc, desc, isNull, isNotNull } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stroke = searchParams.get('stroke') || 'Free';
    const distance = searchParams.get('distance') || '100';
    const course = searchParams.get('course') || 'SCY';
    const gender = searchParams.get('gender') || 'all';
    const ageGroup = searchParams.get('ageGroup') || 'all';
    const region = searchParams.get('region') || 'all';
    const lsc = searchParams.get('lsc') || 'all';
    const season = searchParams.get('season') || '2024';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Build filter conditions
    const conditions = [
      eq(rankingsCache.stroke, stroke),
      eq(rankingsCache.distance, parseInt(distance)),
      eq(rankingsCache.course, course),
      eq(rankingsCache.season, season),
    ];

    if (gender !== 'all') {
      conditions.push(eq(rankingsCache.gender, gender));
    }

    if (ageGroup !== 'all') {
      conditions.push(eq(rankingsCache.age_group, ageGroup));
    }

    if (region !== 'all') {
      conditions.push(eq(rankingsCache.region, region));
    }

    if (lsc !== 'all') {
      conditions.push(eq(rankingsCache.lsc, lsc));
    }

    // Query rankings from cache
    const results = await db
      .select({
        rank: rankingsCache.rank,
        total_swimmers: rankingsCache.total_swimmers,
        swimmer_id: rankingsCache.swimmer_id,
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
        stroke: rankingsCache.stroke,
        distance: rankingsCache.distance,
        course: rankingsCache.course,
        age_group: rankingsCache.age_group,
        season: rankingsCache.season,
      })
      .from(rankingsCache)
      .innerJoin(swimmers, eq(rankingsCache.swimmer_id, swimmers.id))
      .innerJoin(events, eq(rankingsCache.event_id, events.id))
      .innerJoin(times, eq(rankingsCache.time_id, times.id))
      .innerJoin(meets, eq(times.meet_id, meets.id))
      .where(and(...conditions))
      .orderBy(asc(rankingsCache.rank))
      .limit(limit);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching cached rankings:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 