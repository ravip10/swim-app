import { db } from '../src/lib/db';
import { times, rankingsCache } from '../src/lib/schema';

async function main() {
  await db.delete(rankingsCache);
  await db.delete(times);
  console.log('✅ Cleared all rows from rankings_cache and times tables.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 