import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const ageGroup = searchParams.get('ageGroup');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = `
      SELECT 
        s.id,
        s.name,
        s.club,
        s.region,
        s.state,
        s.gender,
        s.birth_date,
        COUNT(r.id) as total_results,
        COUNT(CASE WHEN r.is_personal_best = true THEN 1 END) as personal_bests
      FROM swimmers s
      LEFT JOIN results r ON s.id = r.swimmer_id
    `;

    const conditions = [];
    const params = [];

    if (region && region !== 'all') {
      conditions.push('s.region = $1');
      params.push(region);
    }

    if (ageGroup && ageGroup !== 'all') {
      // Add age group filtering logic
      conditions.push('EXTRACT(YEAR FROM AGE(s.birth_date)) BETWEEN $2 AND $3');
      if (ageGroup === '10u') {
        params.push(0, 10);
      } else if (ageGroup === '11-12') {
        params.push(11, 12);
      } else if (ageGroup === '13-14') {
        params.push(13, 14);
      } else if (ageGroup === '15-16') {
        params.push(15, 16);
      } else if (ageGroup === '17-18') {
        params.push(17, 18);
      } else if (ageGroup === '19+') {
        params.push(19, 100);
      }
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += `
      GROUP BY s.id, s.name, s.club, s.region, s.state, s.gender, s.birth_date
      ORDER BY s.name
      LIMIT $${params.length + 1}
    `;
    params.push(limit);

    const swimmers = await sql.query(query, params);

    return NextResponse.json({
      success: true,
      data: swimmers,
      count: swimmers.length
    });
  } catch (error) {
    console.error('Error fetching swimmers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch swimmers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, club, region, state, gender, birthDate } = body;

    const result = await sql.query(`
      INSERT INTO swimmers (name, club, region, state, gender, birth_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, club, region, state, gender, birthDate]);

    return NextResponse.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error creating swimmer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create swimmer' },
      { status: 500 }
    );
  }
} 