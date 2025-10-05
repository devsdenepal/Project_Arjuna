const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');

// Create profile
router.post('/profile', (req, res) => {
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

// Random Profile
router.get('/profile/random', async (req, res) => {
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

// List profiles
router.get('/profiles', (req, res) => {
  db.all("SELECT * FROM profiles", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single profile
router.get('/profile/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM profiles WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  });
});

// Update profile
router.put('/profile/:id', (req, res) => {
  const id = req.params.id;
  const { name, username, email, gender, location } = req.body;
  db.run('UPDATE profiles SET name = ?, username = ?, email = ?, gender = ?, location = ? WHERE id = ?', [name, username, email, gender, location, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, name, username, email, gender, location });
  });
});

// Delete profile
router.delete('/profile/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM profiles WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id });
  });
});

module.exports = router;

