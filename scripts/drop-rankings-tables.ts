import { db } from '../src/lib/db';

async function main() {
  await db.execute(`DROP TABLE IF EXISTS rankings;`);
  await db.execute(`DROP TABLE IF EXISTS rankings_caches;`);
  console.log('✅ Dropped rankings and rankings_caches tables.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 