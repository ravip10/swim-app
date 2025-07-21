import { db } from '../src/lib/db';
import { rankingsCache } from '../src/lib/schema';
import { eq, and } from 'drizzle-orm';

async function main() {
  const results = await db.select().from(rankingsCache).where(
    and(
      eq(rankingsCache.stroke, 'Fly'),
      eq(rankingsCache.distance, 100),
      eq(rankingsCache.course, 'LCM'),
      eq(rankingsCache.lsc, 'Louisiana Swimming')
    )
  ).orderBy(rankingsCache.rank);
  console.log('Results for 100 Fly, LCM, Louisiana Swimming:');
  console.table(results);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 