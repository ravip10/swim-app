import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { swimmers, times, events, meets } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const course = searchParams.get('course') || 'SCY';
    const stroke = searchParams.get('stroke') || 'Free';
    const distance = searchParams.get('distance') || '100';
    const region = searchParams.get('region') || 'all';
    const lsc = searchParams.get('lsc') || 'all';
    let ageGroup = searchParams.get('ageGroup') || 'all';
    const gender = searchParams.get('gender') || 'all';
    const season = searchParams.get('season') || 'all';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Dynamic age group mapping (same as frontend)
    if (["7", "8"].includes(ageGroup)) ageGroup = "8 and under";
    if (["9", "10"].includes(ageGroup)) ageGroup = "10 and under";
    if (["11", "12"].includes(ageGroup)) ageGroup = "11-12";
    if (["13", "14"].includes(ageGroup)) ageGroup = "13-14";
    if (["15", "16"].includes(ageGroup)) ageGroup = "15-16";
    if (["17", "18"].includes(ageGroup)) ageGroup = "17-18";
    if (ageGroup === "18u") ageGroup = "18 and under";

    // Build filter conditions for the main query
    const conditions = [];
    if (stroke !== 'all') conditions.push(eq(events.stroke, stroke));
    if (distance !== 'all') conditions.push(eq(events.distance, parseInt(distance)));
    if (course !== 'all') conditions.push(eq(events.course, course));
    if (gender !== 'all') conditions.push(eq(swimmers.gender, gender));
    if (region !== 'all') conditions.push(eq(swimmers.region, region));
    if (lsc !== 'all') conditions.push(eq(swimmers.lsc, lsc));
    if (season !== 'all') conditions.push(eq(meets.season, season));

    // Debug logging for filters and conditions
    console.log('API /api/rankings filters:', {
      stroke, distance, course, gender, region, lsc, season, ageGroup, limit
    });
    console.log('API /api/rankings conditions:', conditions);

    // Get all times for the event (all age groups)
    const allTimes = await db
      .select({
        time_id: times.id,
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
        event_age_group: events.age_group,
        meet_name: meets.name,
        meet_date: meets.date,
        is_personal_best: times.is_personal_best,
        stroke: events.stroke,
        distance: events.distance,
        course: events.course,
        season: meets.season,
      })
      .from(times)
      .innerJoin(swimmers, eq(times.swimmer_id, swimmers.id))
      .innerJoin(events, eq(times.event_id, events.id))
      .innerJoin(meets, eq(times.meet_id, meets.id))
      .where(and(...conditions));

    // Helper: get rank for a swimmer/time in a given age group
    function getRankForAgeGroup(
      target: { time_id: string },
      group: string,
      allTimes: Array<{ time_id: string; event_age_group: string | null; time_seconds: string }>
    ): number | null {
      const filtered = allTimes.filter((t) => t.event_age_group === group);
      const sorted = filtered.sort((a, b) => parseFloat(a.time_seconds) - parseFloat(b.time_seconds));
      const idx = sorted.findIndex((t) => t.time_id === target.time_id);
      return idx >= 0 ? idx + 1 : null;
    }

    // For each time, return all relevant ranks
    const results = allTimes.map((t) => {
      const ranks: Record<string, number | null> = {};
      // Always include rank in their event's age group
      if (t.event_age_group) {
        ranks[t.event_age_group] = getRankForAgeGroup(t, t.event_age_group, allTimes);
      }
      // If event_age_group is an exact age, also include 8&under and 10&under if applicable
      const ageNum = Number(t.event_age_group);
      if (!isNaN(ageNum)) {
        if (ageNum <= 8) ranks['8 and under'] = getRankForAgeGroup(t, '8 and under', allTimes);
        if (ageNum <= 10) ranks['10 and under'] = getRankForAgeGroup(t, '10 and under', allTimes);
      }
      return {
        ...t,
        ranks,
      };
    });

    // Optionally, filter to only show times for the selected age group
    let filteredResults = results;
    if (ageGroup !== 'all') {
      // Parse upper bound from age group string (e.g., '10 and under' => 10)
      let upperBound = null;
      let exactAge = null;
      if (/^\d+ and under$/.test(ageGroup)) {
        upperBound = parseInt(ageGroup.split(' ')[0], 10);
      } else if (/^\d+$/.test(ageGroup)) {
        exactAge = parseInt(ageGroup, 10);
      }
      filteredResults = results.filter(r => {
        if (upperBound !== null) {
          // Event must match age group, swimmer age must be <= upper bound
          return r.event_age_group === ageGroup && r.age <= upperBound;
        } else if (exactAge !== null) {
          // Map single ages to correct age group (e.g., 9 => 10 and under)
          let mappedGroup = null;
          if (exactAge <= 8) mappedGroup = '8 and under';
          else if (exactAge <= 10) mappedGroup = '10 and under';
          else if (exactAge <= 12) mappedGroup = '11-12';
          else if (exactAge <= 14) mappedGroup = '13-14';
          else if (exactAge <= 16) mappedGroup = '15-16';
          else if (exactAge <= 18) mappedGroup = '17-18';
          else mappedGroup = r.event_age_group;
          return r.event_age_group === mappedGroup && r.age === exactAge;
        }
        // Fallback: strict match
        return r.event_age_group === ageGroup;
      });
    }

    if (ageGroup === 'all') {
      // Sort by fastest time
      filteredResults = filteredResults.sort((a, b) => parseFloat(a.time_seconds) - parseFloat(b.time_seconds));
      // Assign absolute rank by order
      const rankings = filteredResults.slice(0, limit).map((result, index) => ({
        absolute_rank: index + 1,
        rank: index + 1,
        ...result,
      }));
      return NextResponse.json(rankings);
    } else {
      // Sort by rank in the selected age group
      filteredResults = filteredResults.sort((a, b) => {
        const ra = a.ranks[ageGroup] ?? 9999;
        const rb = b.ranks[ageGroup] ?? 9999;
        return ra - rb;
      });
      // Add both absolute rank and age group rank
      const rankings = filteredResults.slice(0, limit).map((result, index) => {
        // Age group rank (within filtered results)
        let ageRank = null;
        // For single-age filters, rank among swimmers of that exact age
        if (/^\d+$/.test(ageGroup)) {
          const sameAge = filteredResults.filter(r => r.age === parseInt(ageGroup, 10));
          const sortedSameAge = sameAge.sort((a, b) => parseFloat(a.time_seconds) - parseFloat(b.time_seconds));
          ageRank = sortedSameAge.findIndex(r => r.time_id === result.time_id) + 1;
        } else {
          ageRank = result.ranks[ageGroup] ?? null;
        }
        return {
          absolute_rank: index + 1,
          age_group_rank: ageRank,
          rank: ageRank, // for backward compatibility
          ...result,
        };
      });
      return NextResponse.json(rankings);
    }
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 