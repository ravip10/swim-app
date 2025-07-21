import { db } from '../src/lib/db';

async function main() {
  await db.execute(`ALTER TABLE times DROP COLUMN IF EXISTS rankings_caches;`);
  console.log('✅ Dropped rankings_caches column from times table.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); }); 