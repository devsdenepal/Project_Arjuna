import { useState } from "react";
import { googleSearch, logSearch } from "../api/osintApi";
export default function LinkedInSearch() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const buildDork = ({ name, location, company }) => {
    const sites = ["site:linkedin.com/in", "site:linkedin.com/pub"];
    const parts = [];
    if (name && name.trim()) {
      parts.push(`"${name.trim()}"`);
    }
    if (company && company.trim()) {
      parts.push(company.trim());
    }
    if (location && location.trim()) {
      parts.push(location.trim());
    }
    const sitePart = `(${sites.join(" OR ")})`;
    const rest = parts.join(" ");
    const query = rest ? `${sitePart} ${rest}` : sitePart;
    return query;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !name.trim()) return;
    setLoading(true);
    setResults([]);
    const dork = buildDork({ name, location, company });
    try {
      const res = await googleSearch(dork);
      setResults(res || []);
  logSearch('linkedin', dork).then(() => window.dispatchEvent(new Event('search:logged'))).catch(() => {});
    } catch (err) {
      console.error("Google search failed", err);
      setResults([]);
    }
    setLoading(false);
  };
  return (
    <div className="card mb-3">
      <div className="card-header d-flex align-items-center">
        <i className="fab fa-linkedin mr-2 text-primary"></i>
        <span>LinkedIn Search</span>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="input-group">
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name (required)"
              required
            />
            <input
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (city, country)"
            />
            <input
              className="form-control"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company (optional)"
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
