const { Pool } = require('pg');
const fs = require('fs');

async function initDb() {
  const pool = new Pool();
  // Check if a known table exists
  const check = await pool.query("SELECT to_regclass('public.communities') as exists");
  if (!check.rows[0].exists) {
    const schema = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
    await pool.query(schema);
    console.log('Database schema created.');
  } else {
    console.log('Database already initialized.');
  }
  await pool.end();
}

initDb().catch(e => {
  console.error('DB init error:', e);
  process.exit(1);
}); 