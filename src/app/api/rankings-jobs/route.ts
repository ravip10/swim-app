import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { rankingsJobs } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const jobs = await db
      .select()
      .from(rankingsJobs)
      .orderBy(desc(rankingsJobs.created_at))
      .limit(limit);

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching ranking jobs:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filters } = body;

    if (!filters) {
      return NextResponse.json({ error: 'Filters are required' }, { status: 400 });
    }

    // Create a new scraping job
    const job = await db
      .insert(rankingsJobs)
      .values({
        status: 'pending',
        filters: filters,
      })
      .returning();

    // TODO: Trigger the actual scraping process
    // This would typically be done with a background job system
    // For now, we'll just create the job record

    return NextResponse.json(job[0]);
  } catch (error) {
    console.error('Error creating ranking job:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 