import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const event = searchParams.get('event');
    const course = searchParams.get('course');
    const region = searchParams.get('region');
    const ageGroup = searchParams.get('ageGroup');
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = `
      SELECT 
        s.name,
        s.club,
        s.region,
        s.state,
        r.time_string,
        r.time_ms,
        r.rank,
        r.percentile,
        e.name as event_name,
        e.distance,
        e.stroke
      FROM rankings r
      JOIN swimmers s ON r.swimmer_id = s.id
      JOIN events e ON r.event_id = e.id
    `;

    const conditions = [];
    const params = [];

    if (event) {
      conditions.push('e.name = $1');
      params.push(event);
    }

    if (course) {
      conditions.push('e.course_type = $2');
      params.push(course);
    }

    if (region && region !== 'all') {
      conditions.push('r.region = $3');
      params.push(region);
    }

    if (ageGroup && ageGroup !== 'all') {
      conditions.push('r.age_group = $4');
      params.push(ageGroup);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += `
      ORDER BY r.rank ASC
      LIMIT $${params.length + 1}
    `;
    params.push(limit);

    const rankings = await sql.query(query, params);

    return NextResponse.json({
      success: true,
      data: rankings,
      count: rankings.length
    });
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rankings' },
      { status: 500 }
    );
  }
} 