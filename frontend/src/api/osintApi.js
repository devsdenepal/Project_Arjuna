const BASE = "http://localhost:5000/api";
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
export const logSearch = (site, query) =>
  fetch(`${BASE}/search/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site, query }),
  }).then((r) => r.json());
export const getStats = () => fetch(`${BASE}/stats`).then((r) => r.json());
export const getSummary = () => fetch(`${BASE}/stats/summary`).then((r) => r.json());
export const getDomainInfo = (domain) =>
  fetch(`${BASE}/domain?domain=${encodeURIComponent(domain)}`).then((r) => r.json());
export const getNumberInfo = (number) =>
  fetch(`${BASE}/phone?number=${encodeURIComponent(number)}`).then((r) => r.json());
export const getIpInfo = (ip) =>
  fetch(`${BASE}/ip?ip=${encodeURIComponent(ip)}`).then((r) => r.json());
export const getRecentSearches = (limit = 10) => fetch(`${BASE}/search/recent?limit=${limit}`).then(r => r.json());
export const clearSearches = (site) => {
  const url = site ? `${BASE}/search/clear?site=${encodeURIComponent(site)}` : `${BASE}/search/clear`;
  return fetch(url, { method: 'DELETE' }).then(r => r.json());
};
