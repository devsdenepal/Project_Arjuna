require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Google Search
app.get('/api/google', async (req, res) => {
  const { query } = req.query;
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}`;
    // console.log("Google Search URL:", url);
    const response = await axios.get(url);
    // console.log("Google Search Response:", response.data);
    res.json(response.data.items || []);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

// Random Profile
app.get('/api/profile/random', async (req, res) => {
  const { gender } = req.query;
  try {
    const url = `https://randomuser.me/api/?gender=${gender || "male"}`;
    const response = await axios.get(url);
    const user = response.data.results[0];
    const profile = {
      name: `${user.name.first} ${user.name.last}`,
      username: user.login.username,
      email: user.email,
      gender: user.gender,
      location: `${user.location.city}, ${user.location.country}`
    };
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Profile
app.post('/api/profile', (req, res) => {
  const { name, username, email, gender, location } = req.body;
  const ts = Date.now();
  db.run(
    "INSERT INTO profiles (name, username, email, gender, location, created_ts) VALUES (?, ?, ?, ?, ?, ?)",
    [name, username, email, gender, location, ts],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, username, email, gender, location, created_ts: ts });
    }
  );
});

// Profile List
app.get('/api/profiles', (req, res) => {
  db.all("SELECT * FROM profiles", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Domain Info
app.get('/api/domain', async (req, res) => {
  const { domain } = req.query;
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/whois?domain=${domain}`,
      { headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } }
    );
    // log domain lookup
    try {
      db.run('INSERT INTO search_stats (site, query, ts) VALUES (?, ?, ?)', ['domain', domain || '', Date.now()], () => {});
    } catch (e) {}
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: req.query, message: err.message });
  }
});

// Phone Info
app.get('/api/phone', async (req, res) => {
  const { number } = req.query;
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/validatephone?number=${number}`,
      { headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// IP Info
app.get('/api/ip', async (req, res) => {
  const { ip } = req.query;
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    // log ip lookup
    try {
      db.run('INSERT INTO search_stats (site, query, ts) VALUES (?, ?, ?)', ['ip', ip || '', Date.now()], () => {});
    } catch (e) {}
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));

// Search logging endpoint
app.post('/api/search/log', (req, res) => {
  const { site, query } = req.body;
  if (!site) return res.status(400).json({ error: 'site required' });
  const ts = Date.now();
  const sql = `INSERT INTO search_stats (site, query, ts) VALUES (?, ?, ?)`;
  db.run(sql, [site, query || '', ts], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, site, query, ts });
  });
});

// Stats endpoint (simple aggregates)
app.get('/api/stats', (req, res) => {
  // total and counts per site
  const totals = {};
  db.get('SELECT COUNT(*) as total FROM search_stats', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    totals.total = row ? row.total : 0;
    db.all('SELECT site, COUNT(*) as count FROM search_stats GROUP BY site', [], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      const perSite = {};
      (rows || []).forEach(r => perSite[r.site] = r.count);
      res.json({ total: totals.total, perSite });
    });
  });
});

// Summary stats for dashboard quick cards
app.get('/api/stats/summary', (req, res) => {
  const summary = {};
  const now = Date.now();
  const startOfToday = new Date(); startOfToday.setUTCHours(0,0,0,0);
  const startOfTodayTs = startOfToday.getTime();
  const sevenDaysAgo = now - 7*24*60*60*1000;

  db.get('SELECT COUNT(*) as cnt FROM profiles', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    summary.profiles = row ? row.cnt : 0;
    db.get('SELECT COUNT(*) as cnt FROM profiles WHERE created_ts >= ?', [startOfTodayTs], (errp, rowp) => {
      if (errp) return res.status(500).json({ error: errp.message });
      summary.profiles_today = rowp ? rowp.cnt : 0;
      db.get('SELECT COUNT(*) as cnt FROM search_stats', [], (err2, row2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        summary.searches = row2 ? row2.cnt : 0;
        db.get('SELECT COUNT(*) as cnt FROM search_stats WHERE ts >= ?', [startOfTodayTs], (errS, rowS) => {
          if (errS) return res.status(500).json({ error: errS.message });
          summary.searches_today = rowS ? rowS.cnt : 0;
          db.get("SELECT COUNT(*) as cnt FROM search_stats WHERE site='domain'", [], (err3, row3) => {
            if (err3) return res.status(500).json({ error: err3.message });
            summary.domains = row3 ? row3.cnt : 0;
            db.get("SELECT COUNT(*) as cnt FROM search_stats WHERE site='domain' AND ts >= ?", [sevenDaysAgo], (errD, rowD) => {
              if (errD) return res.status(500).json({ error: errD.message });
              summary.domains_week = rowD ? rowD.cnt : 0;
              db.get("SELECT COUNT(*) as cnt FROM search_stats WHERE site='ip'", [], (err4, row4) => {
                if (err4) return res.status(500).json({ error: err4.message });
                summary.ips = row4 ? row4.cnt : 0;
                db.get("SELECT COUNT(*) as cnt FROM search_stats WHERE site='ip' AND ts >= ?", [sevenDaysAgo], (errI, rowI) => {
                  if (errI) return res.status(500).json({ error: errI.message });
                  summary.ips_week = rowI ? rowI.cnt : 0;
                  res.json(summary);
                });
              });
            });
          });
        });
      });
    });
  });
});