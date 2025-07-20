import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { swimmers, times } from '@/lib/schema';
import { eq, sql, asc } from 'drizzle-orm';

export async function GET() {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.warn('No database connection available, returning empty results');
      return NextResponse.json([]);
    }

    // Get all swimmers with their stats
    const swimmersWithStats = await db
      .select({
        id: swimmers.id,
        name: swimmers.name,
        email: swimmers.email,
        club: swimmers.club,
        region: swimmers.region,
        lsc: swimmers.lsc,
        age: swimmers.age,
        gender: swimmers.gender,
        total_events: sql<number>`count(distinct ${times.event_id})`,
        personal_bests: sql<number>`count(distinct case when ${times.is_personal_best} then ${times.event_id} end)`,
        best_time: sql<string>`min(${times.time_seconds})`,
        created_at: swimmers.created_at,
        updated_at: swimmers.updated_at,
      })
      .from(swimmers)
      .leftJoin(times, eq(swimmers.id, times.swimmer_id))
      .groupBy(swimmers.id)
      .orderBy(asc(swimmers.name));

    return NextResponse.json(swimmersWithStats);
  } catch (error) {
    console.error('Error fetching swimmers:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 