import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { swimmers, times } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Get all swimmers with their stats
    const swimmersWithStats = await db
      .select({
        id: swimmers.id,
        name: swimmers.name,
        email: swimmers.email,
        club: swimmers.club,
        region: swimmers.region,
        age: swimmers.age,
        gender: swimmers.gender,
        created_at: swimmers.created_at,
        updated_at: swimmers.updated_at,
        event_count: sql<number>`count(distinct ${times.event_id})`,
        personal_bests: sql<number>`count(case when ${times.is_personal_best} = true then 1 end)`,
        total_times: sql<number>`count(${times.id})`,
      })
      .from(swimmers)
      .leftJoin(times, eq(swimmers.id, times.swimmer_id))
      .groupBy(swimmers.id, swimmers.name, swimmers.email, swimmers.club, swimmers.region, swimmers.age, swimmers.gender, swimmers.created_at, swimmers.updated_at)
      .orderBy(swimmers.name);

    return NextResponse.json(swimmersWithStats);
  } catch (error) {
    console.error('Error fetching swimmers:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 