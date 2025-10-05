import { useEffect, useState } from 'react';
import { getStats } from '../api/osintApi';
import RecentSearches from './RecentSearches';

export default function Stats() {
  const [stats, setStats] = useState({ total: 0, perSite: {} });
  // recent searches are rendered by RecentSearches component

  const load = async () => {
    try {
      const s = await getStats();
      setStats(s || { total: 0, perSite: {} });
    } catch (err) {
      console.error('Failed to load stats', err);
    }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const handler = () => load();
    window.addEventListener('search:logged', handler);
    return () => window.removeEventListener('search:logged', handler);
  }, []);

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const handler = () => load();
    window.addEventListener('search:logged', handler);
    return () => window.removeEventListener('search:logged', handler);
  }, []);

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
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <div className="h5 mb-0">Total Searches</div>
          <div className="display-4 text-primary font-weight-bold">{stats.total}</div>
        </div>
        <div style={{ textAlign: 'right', minWidth: 220 }}>
          <div className="small text-muted">By source</div>
          <div>
            {(() => {
              const mapping = {
                google: { label: 'Google', cls: 'badge bg-primary' },
                domain: { label: 'Domain', cls: 'badge bg-success' },
                ip: { label: 'IP', cls: 'badge bg-info text-dark' },
                linkedin: { label: 'LinkedIn', cls: 'badge bg-secondary' },
                facebook: { label: 'Facebook', cls: 'badge bg-primary' },
                twitter: { label: 'Twitter', cls: 'badge bg-info' }
              };
              const keys = Object.keys(stats.perSite || {});
              const ordered = Object.keys(mapping).filter(k => keys.includes(k)).concat(keys.filter(k => !Object.keys(mapping).includes(k)));
              return ordered.map(k => {
                const meta = mapping[k] || { label: k, cls: 'badge bg-secondary' };
                return (
                  <div key={k} className="mb-1">
                    <span className={meta.cls} style={{ marginRight: 8 }}>{meta.label}</span>
                    <span className="small">{stats.perSite[k]}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      <div className="card-footer bg-transparent">
        <RecentSearches limit={6} />
      </div>
    </div>
  );
}
