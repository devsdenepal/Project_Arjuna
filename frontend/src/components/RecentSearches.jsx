import React, { useEffect, useState } from 'react';
import { getRecentSearches, clearSearches } from '../api/osintApi';

export default function RecentSearches({ limit = 10 }){
  const [recent, setRecent] = useState([]);

  const load = async () => {
    try {
      const r = await getRecentSearches(limit);
      setRecent(r || []);
    } catch (e) { console.error(e); }
  };

  useEffect(()=>{ load(); }, [limit]);

  const timeAgo = (ts) => {
    const sec = Math.floor((Date.now() - ts) / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const days = Math.floor(hr / 24);
    return `${days}d ago`;
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-3">
        <h6 className="mb-0">Search History</h6>
        <button className="btn btn-sm btn-outline-danger" onClick={async () => { await clearSearches(); await load(); }}>
          <i className="fas fa-trash mr-1"></i>Clear All
        </button>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {recent.length === 0 && <div className="text-muted p-3">No recent searches</div>}
          {recent.map(item => (
            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
              <div className="d-flex align-items-center" style={{ overflow: 'hidden' }} title={item.query}>
                <span style={{ padding: '4px 8px', fontSize: 12, marginRight: 10, borderRadius: 6, display: 'inline-block', verticalAlign: 'middle', background: item.site === 'google' ? '#0d6efd' : item.site === 'domain' ? '#198754' : item.site === 'ip' ? '#0dcaf0' : '#6c757d', color: '#fff' }}>{item.site}</span>
                <span className="font-weight-medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.query}</span>
              </div>
              <small className="text-muted">{timeAgo(item.ts)}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
