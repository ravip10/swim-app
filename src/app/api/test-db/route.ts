import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { swimmers } from '@/lib/schema';

export async function GET() {
  try {
    // Test the connection by querying the swimmers table
    const result = await db.select().from(swimmers).limit(1);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!',
      tables: ['swimmers', 'meets', 'events', 'times', 'rankings', 'standards'],
      sampleData: result 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 