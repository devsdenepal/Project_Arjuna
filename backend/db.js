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
});

module.exports = db;