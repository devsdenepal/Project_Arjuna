const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '..', 'cache', 'images');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

function hashUrl(u){
  return crypto.createHash('sha1').update(u).digest('hex');
}

router.get('/image-proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url required' });
  let parsed;
  try { parsed = new URL(url); } catch (e) { return res.status(400).json({ error: 'invalid url' }); }

  const key = hashUrl(url);
  const ext = path.extname(parsed.pathname).split('?')[0] || '';
  const filename = path.join(CACHE_DIR, key + ext);

  // Serve from cache if exists
  if (fs.existsSync(filename)) {
    return res.sendFile(filename);
  }

  try {
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
    // Set a referer to the host to avoid some hotlink blocks
    headers['Referer'] = `${parsed.protocol}//${parsed.host}`;

    const response = await axios.get(url, { responseType: 'stream', headers, timeout: 15000, maxContentLength: 10 * 1024 * 1024 });
    const contentType = response.headers['content-type'] || 'application/octet-stream';

    // Stream to temp file then rename to avoid partial files
    const tmp = filename + '.tmp';
    const writer = fs.createWriteStream(tmp);
    response.data.pipe(writer);
    writer.on('finish', () => {
      try { fs.renameSync(tmp, filename); } catch(e) {}
      res.setHeader('Content-Type', contentType);
      res.sendFile(filename);
    });
    writer.on('error', (err) => {
      try { fs.unlinkSync(tmp); } catch(e){}
      res.status(502).json({ error: 'failed to fetch image' });
    });
  } catch (err) {
    return res.status(502).json({ error: err.message || 'fetch failed' });
  }
});

module.exports = router;
