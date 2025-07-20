import { NextResponse } from 'next/server';
import { seedSampleData } from '@/lib/sample-data';

export async function POST() {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.warn('No database connection available, skipping seed');
      return NextResponse.json({ 
        success: false, 
        error: 'No database connection available' 
      }, { status: 500 });
    }

    const result = await seedSampleData();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sample data seeded successfully!',
      data: result
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 