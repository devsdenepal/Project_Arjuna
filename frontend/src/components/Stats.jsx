import { useEffect, useState } from 'react';
import { getStats } from '../api/osintApi';

export default function Stats() {
  const [stats, setStats] = useState({ total: 0, perSite: {} });

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

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <div className="h5 mb-0">Total Searches</div>
          <div className="display-4 text-primary font-weight-bold">{stats.total}</div>
        </div>
        <div>
          {Object.keys(stats.perSite || {}).map(k => (
            <div key={k}><strong>{k}:</strong> {stats.perSite[k]}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
