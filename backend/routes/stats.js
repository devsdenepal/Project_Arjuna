const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/stats', (req, res) => {
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
router.get('/stats/summary', (req, res) => {
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
module.exports = router;
