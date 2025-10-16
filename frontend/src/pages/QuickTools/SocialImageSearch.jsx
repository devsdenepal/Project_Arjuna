import React, { useState } from 'react';
import { googleImageSearch, logSearch, imageProxyUrl } from '../../api/osintApi';

const SITES = [
  { key: 'facebook', label: 'Facebook', dork: 'site:facebook.com' },
  { key: 'instagram', label: 'Instagram', dork: 'site:instagram.com' },
  { key: 'twitter', label: 'X / Twitter', dork: 'site:twitter.com OR site:x.com' },
  { key: 'linkedin', label: 'LinkedIn', dork: 'site:linkedin.com' },
  { key: 'tiktok', label: 'TikTok', dork: 'site:tiktok.com' },
];

export default function SocialImageSearch(){
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState('');

  const run = async (e) => {
    e?.preventDefault();
    const query = (q||'').trim();
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const promises = SITES.map(s => googleImageSearch(`${s.dork} ${query}`));
      const data = await Promise.all(promises);
      const grouped = {};
      SITES.forEach((s, i)=> grouped[s.key] = Array.isArray(data[i]) ? data[i] : []);
      setResults(grouped);
      try { await Promise.all(SITES.map(s => logSearch('google-image', `${s.dork} ${query}`))); } catch {}
    } catch (e2) {
      setError(String(e2?.message || e2));
    } finally { setLoading(false); }
  };

  return (
    <div className="col-md-10 ml-sm-auto px-4 py-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h4 className="mb-0">Social Image Search</h4>
      </div>
      <form onSubmit={run} className="mb-4">
        <div className="input-group">
          <input value={q} onChange={e=>setQ(e.target.value)} className="form-control" placeholder="Search images across social sites (e.g. 'product name')" />
          <div className="input-group-append">
            <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Searching…' : 'Search'}</button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {SITES.map(s => (
        <div key={s.key} className="mb-4">
          <h6 className="mb-2">{s.label} <span className="badge badge-secondary ml-2">{(results[s.key]||[]).length}</span></h6>
          <div className="d-flex flex-wrap">
            {(results[s.key]||[]).slice(0,12).map((it,idx)=> {
              // prefer the image thumbnail fields when available
              const rawImg = (it.image && (it.image.thumbnailLink || it.image.contextLink)) || it.link || (it.pagemap && it.pagemap.cse_image && it.pagemap.cse_image[0] && it.pagemap.cse_image[0].src) || '';
              const imgSrc = rawImg ? imageProxyUrl(rawImg) : '';
              const href = it.contextLink || it.link || '#';
              // Render a text thumbnail instead of embedding the remote image
              const title = it.title || (it.pagemap && it.pagemap.metatags && it.pagemap.metatags[0] && (it.pagemap.metatags[0]['og:title'] || it.pagemap.metatags[0].title)) || (it.snippet || '').slice(0,80);
              const domain = (() => {
                try { const u = new URL(href); return u.hostname.replace('www.',''); } catch { return '' }
              })();
              return (
                <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="m-1 text-decoration-none" style={{width:180, height:90, display:'block', overflow:'hidden', borderRadius:6, background:'#f6f7f9', color:'#0b2e6f', padding:8}}>
                  <div style={{fontSize:12, fontWeight:600, lineHeight:'1.1', height:36, overflow:'hidden', textOverflow:'ellipsis'}}>{title}</div>
                  <div style={{fontSize:11, color:'#375a7f', marginTop:6, height:30, overflow:'hidden', textOverflow:'ellipsis'}}>{it.snippet || ''}</div>
                  <div style={{fontSize:11, color:'#6c757d', marginTop:6}}>{domain}</div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
