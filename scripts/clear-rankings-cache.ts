import { db } from '../src/lib/db';
import { rankingsCache } from '../src/lib/schema';

async function main() {
  await db.delete(rankingsCache);
  console.log('✅ Cleared all rows from rankings_cache.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 