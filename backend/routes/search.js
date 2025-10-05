const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db');

// Google Search
router.get('/google', async (req, res) => {
  const { query } = req.query;
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    res.json(response.data.items || []);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

// Domain Info
router.get('/domain', async (req, res) => {
  const { domain } = req.query;
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/whois?domain=${domain}`,
      { headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } }
    );
    try { db.run('INSERT INTO search_stats (site, query, ts) VALUES (?, ?, ?)', ['domain', domain || '', Date.now()], () => {}); } catch(e){}
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: req.query, message: err.message });
  }
});

// Phone Info
router.get('/phone', async (req, res) => {
  const { number } = req.query;
  if (!number || typeof number !== 'string') return res.status(400).json({ error: 'number query required' });
  const cleaned = number.replace(/[\s\-()]/g, '');
  if (!/^[0-9+]{6,}$/.test(cleaned)) return res.status(400).json({ error: 'invalid phone number format' });
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/validatephone?number=${encodeURIComponent(number)}`,
      { headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

// IP Info
router.get('/ip', async (req, res) => {
  const { ip } = req.query;
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    try { db.run('INSERT INTO search_stats (site, query, ts) VALUES (?, ?, ?)', ['ip', ip || '', Date.now()], () => {}); } catch(e){}
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search logging
router.post('/search/log', (req, res) => {
  const { site, query } = req.body;
  if (!site) return res.status(400).json({ error: 'site required' });
  const ts = Date.now();
  const sql = `INSERT INTO search_stats (site, query, ts) VALUES (?, ?, ?)`;
  db.run(sql, [site, query || '', ts], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, site, query, ts });
  });
});

// Recent searches
router.get('/search/recent', (req, res) => {
  const limit = parseInt(req.query.limit || '10', 10);
  db.all('SELECT id, site, query, ts FROM search_stats ORDER BY ts DESC LIMIT ?', [limit], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

// Clear search history
router.delete('/search/clear', (req, res) => {
  const { site } = req.query;
  const sql = site ? 'DELETE FROM search_stats WHERE site = ?' : 'DELETE FROM search_stats';
  const params = site ? [site] : [];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ cleared: this.changes });
  });
});

module.exports = router;
