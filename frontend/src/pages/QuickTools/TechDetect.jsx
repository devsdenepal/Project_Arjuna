import React, { useState } from 'react';
import { detectTech, getDomainInfo, logSearch } from '../../api/osintApi';

export default function TechDetect(){
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [whois, setWhois] = useState(null);

  const run = async (e) => {
    e.preventDefault();
    const u = (url||'').trim();
    if (!u) return;
    setLoading(true);
    setError('');
    setData(null);
    setWhois(null);
    try {
      const res = await detectTech(u);
      setData(res);
      try { await logSearch('tech-detect', u); } catch {}
      if (res && res.host) {
        try {
          const w = await getDomainInfo(res.host);
          setWhois(w);
        } catch {}
      }
    } catch (e2) {
      setError(e2?.message || 'Failed to detect technologies');
    } finally {
      setLoading(false);
    }
  };

  const fmtDate = (v) => {
    if (!v) return '';
    const s = Array.isArray(v) ? v[0] : v;
    const num = String(s).replace(/[^0-9]/g,'');
    if (num.length >= 13) {
      const d = new Date(parseInt(num.slice(0,13),10));
      if (!isNaN(d)) return `${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${String(d.getFullYear()).slice(-2)}`;
    }
    const d2 = new Date(s);
    if (!isNaN(d2)) return `${(d2.getMonth()+1).toString().padStart(2,'0')}/${d2.getDate().toString().padStart(2,'0')}/${String(d2.getFullYear()).slice(-2)}`;
    return String(s);
  };

  return (
    <div className="col-md-10 ml-sm-auto px-4 py-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h4 className="mb-0">Tech Detector</h4>
      </div>
      <form onSubmit={run} className="mb-4">
        <div className="input-group">
          <input value={url} onChange={e=>setUrl(e.target.value)} className="form-control" placeholder="Enter site URL (e.g. example.com)" />
          <div className="input-group-append">
            <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Scanning…' : 'Scan'}</button>
          </div>
        </div>
      </form>
      {error && (
        <div className="alert alert-danger">
          {String(error)}
          {String(error).includes('Cannot GET /api/tech-detect') && (
            <div className="mt-2 small">
              It looks like the backend hasn’t loaded the Tech Detector route yet. Please restart the backend server and then open <code>http://localhost:5000/api/health</code> to verify. Once it returns ok: true, try again.
            </div>
          )}
        </div>
      )}
      {data && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-transparent"><strong>Detected Technologies</strong></div>
          <div className="card-body">
            {(!data.technologies || data.technologies.length === 0) && <div className="text-muted">No clear indicators found.</div>}
            {data.technologies && data.technologies.map((t, i) => (
              <div key={i} className="d-flex align-items-start mb-2">
                <span className="badge badge-info mr-2">{Math.round((t.confidence||0)*100)}%</span>
                <div>
                  <div className="font-weight-bold">{t.name}</div>
                  {t.evidence && t.evidence.length > 0 && (
                    <small className="text-muted">{t.evidence.slice(0,3).join(' • ')}</small>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {whois && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-transparent"><strong>Domain Info</strong></div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-2">
                <div className="text-muted">Domain</div>
                <div className="font-weight-medium">{data?.host || '-'}</div>
              </div>
              <div className="col-md-4 mb-2">
                <div className="text-muted">Created</div>
                <div className="font-weight-medium">{fmtDate(whois.creation_date)}</div>
              </div>
              <div className="col-md-4 mb-2">
                <div className="text-muted">Expiry</div>
                <div className="font-weight-medium">{fmtDate(whois.expiration_date)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
