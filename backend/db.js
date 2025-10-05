const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite', (err) => {
  if (err) console.error(err.message);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    username TEXT,
    email TEXT,
    gender TEXT,
    location TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS search_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site TEXT,
    query TEXT,
    ts INTEGER
  )`);
  // Ensure profiles table has created_ts column (migration)
  db.all("PRAGMA table_info(profiles)", [], (err, rows) => {
    if (err) return;
    const hasCreated = (rows || []).some(r => r.name === 'created_ts');
    if (!hasCreated) {
      db.run('ALTER TABLE profiles ADD COLUMN created_ts INTEGER');
    }
  });
});

module.exports = db;