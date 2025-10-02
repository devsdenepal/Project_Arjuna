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
  db.run(
    "INSERT INTO profiles (name, username, email, gender, location) VALUES (?, ?, ?, ?, ?)",
    [name, username, email, gender, location],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, username, email, gender, location });
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
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));