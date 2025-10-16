const BASE = "http://localhost:5000/api";

async function safeJson(res) {
  const ct = (res.headers && res.headers.get && res.headers.get('content-type')) || '';
  const text = await res.text();
  if (!ct || !ct.toLowerCase().includes('application/json')) {
    const snippet = text ? text.slice(0, 160) : '';
    throw new Error(`Non-JSON response (${res.status}): ${snippet}`);
  }
  try { return JSON.parse(text); } catch (e) { throw new Error(`Invalid JSON (${res.status})`); }
}
export const fetchProfiles = () =>
  fetch(`${BASE}/profiles`).then((r) => r.json());
export const saveProfile = (profile) =>
  fetch(`${BASE}/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  }).then((r) => r.json());
export const getRandomProfile = (gender) =>
  fetch(`${BASE}/profile/random?gender=${gender}`).then((r) => r.json());
export const googleSearch = (query) =>
  fetch(`${BASE}/google?query=${encodeURIComponent(query)}`).then((r) => r.json());
export const googleImageSearch = (query, opts = {}) => {
  const params = new URLSearchParams({ query: query || '', searchType: 'image' });
  if (opts.imgSize) params.set('imgSize', opts.imgSize);
  if (opts.imgType) params.set('imgType', opts.imgType);
  if (opts.imgDominantColor) params.set('imgDominantColor', opts.imgDominantColor);
  return fetch(`${BASE}/google?${params.toString()}`).then(r => r.json());
};
export const imageProxyUrl = (url) => `${BASE}/image-proxy?url=${encodeURIComponent(url)}`;
export const logSearch = (site, query) =>
  fetch(`${BASE}/search/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site, query }),
  }).then((r) => r.json());
export const getStats = () => fetch(`${BASE}/stats`).then((r) => r.json());
export const getSummary = () => fetch(`${BASE}/stats/summary`).then((r) => r.json());
export const getDomainInfo = (domain) =>
  fetch(`${BASE}/domain?domain=${encodeURIComponent(domain)}`).then(safeJson);
export const getNumberInfo = (number) =>
  fetch(`${BASE}/phone?number=${encodeURIComponent(number)}`).then((r) => r.json());
export const getIpInfo = (ip) =>
  fetch(`${BASE}/ip?ip=${encodeURIComponent(ip)}`).then((r) => r.json());
export const getRecentSearches = (limit = 10) => fetch(`${BASE}/search/recent?limit=${limit}`).then(r => r.json());
export const clearSearches = (site) => {
  const url = site ? `${BASE}/search/clear?site=${encodeURIComponent(site)}` : `${BASE}/search/clear`;
  return fetch(url, { method: 'DELETE' }).then(r => r.json());
};
export const detectTech = (url) =>
  fetch(`${BASE}/tech-detect?url=${encodeURIComponent(url)}`).then(safeJson);
