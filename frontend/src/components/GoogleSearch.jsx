import { useState } from "react";
import { googleSearch } from "../api/osintApi";

export default function GoogleSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setResults(await googleSearch(query));
    setLoading(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex align-items-center">
        <i className="fab fa-google mr-2 text-primary"></i>
        <span>Google Search</span>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="input-group">
            <input 
              className="form-control" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search Google..." 
              required 
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm mr-2" role="status"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search mr-1"></i>
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
        
        {results.length > 0 && (
          <div className="list-group">
            {results.slice(0, 3).map((r, idx) => (
              <div className="list-group-item list-group-item-action" key={idx}>
                <a 
                  href={r.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <h6 className="mb-1 text-primary">{r.title}</h6>
                </a>
                <p className="mb-1 small text-muted">{r.snippet}</p>
                <small className="text-success">{r.link}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}