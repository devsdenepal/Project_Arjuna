const express = require('express');
const router = express.Router();
const axios = require('axios');

function normalizeUrl(input){
  try {
    let u = input.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    const url = new URL(u);
    return url.toString();
  } catch { return null; }
}

function collectEvidence(html, headers){
  const tech = [];
  const evidenceFor = (name, patterns) => {
    const found = [];
    for (const p of patterns) {
      if (p.source === 'header') {
        const { key, contains } = p;
        const v = headers[key];
        if (v && (contains ? (''+v).toLowerCase().includes(contains) : true)) found.push(`header:${key}=${v}`);
      } else {
        if (p.test(html)) found.push(p.toString());
      }
    }
    if (found.length) tech.push({ name, evidence: found, confidence: Math.min(1, 0.3 + found.length*0.2) });
  };

  const h = (headers || {});
  const lowerHeaders = Object.fromEntries(Object.entries(h).map(([k,v]) => [k.toLowerCase(), v]));

  evidenceFor('React', [
    /data-reactroot/i,
    /__NEXT_DATA__/i,
    /\/_next\//i,
    /react(\.|-|@)/i,
    /react-dom/i
  ]);
  evidenceFor('Vue', [
    /data-v-[a-f0-9]+/i,
    /vue(\.|-|@)/i,
    /__NUXT__|\/_nuxt\//i
  ]);
  evidenceFor('Angular', [
    /ng-version/i,
    /ng-app/i,
    /angular(\.|-|@)/i
  ]);
  evidenceFor('Next.js', [
    /__NEXT_DATA__/i,
    /\/_next\//i
  ]);
  evidenceFor('Nuxt.js', [
    /__NUXT__/i,
    /\/_nuxt\//i
  ]);
  evidenceFor('jQuery', [
    /jquery(\.|-|@)/i
  ]);
  evidenceFor('Bootstrap', [
    /bootstrap(\.min)?\.css/i,
    /bootstrap(\.min)?\.js/i
  ]);
  evidenceFor('Tailwind CSS', [
    /tailwind(\.min)?\.css/i,
    /class="[^"]*\b(?:bg-|text-|flex|grid|px-|py-|mt-|mb-)\b/i
  ]);
  evidenceFor('WordPress', [
    /wp-content|wp-includes/i,
    /meta\s+name=["']generator["']\s+content=["']WordPress/i
  ]);
  evidenceFor('Laravel (PHP)', [
    { source:'header', key:'x-powered-by', contains:'php' },
    /name=["']csrf-token["']/i,
    /window\.Laravel/i
  ]);
  evidenceFor('Django (Python)', [
    /\/static\//i,
    /name=["']csrfmiddlewaretoken["']/i,
    /django/i
  ]);
  evidenceFor('Rails (Ruby)', [
    /name=["']csrf-param["']/i,
    /name=["']csrf-token["']/i,
    /rails/i
  ]);
  evidenceFor('Vite', [
    /@vite\/client/i,
    /type="module"\s+src="\/[^"]*\?v=/i
  ]);

  return tech;
}

router.get('/tech-detect', async (req, res) => {
  const rawUrl = req.query.url;
  const url = normalizeUrl(rawUrl || '');
  if (!url) return res.status(400).json({ error: 'valid url required' });
  try {
    const attempt = async (u) => axios.get(u, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36'
      },
      timeout: 10000,
      maxRedirects: 3,
      validateStatus: s => s >= 200 && s < 400,
      responseType: 'text',
      transformResponse: [(d)=>d]
    });
    let response;
    try {
      response = await attempt(url);
    } catch (e1) {
      try {
        const swapped = url.startsWith('https://') ? url.replace(/^https:\/\//i, 'http://') : url.replace(/^http:\/\//i, 'https://');
        response = await attempt(swapped);
      } catch (e2) {
        throw e1;
      }
    }
    const html = typeof response.data === 'string' ? response.data : '';
    const headers = response.headers || {};
    const technologies = collectEvidence(html, headers);
    let host = '';
    try { host = new URL(url).hostname; } catch {}
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ url, host, technologies, headers: { server: headers['server'], poweredBy: headers['x-powered-by'] } }));
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({ error: err.message || 'request failed' }));
  }
});

module.exports = router;
