import { useState } from "react";
import { googleSearch, logSearch } from "../api/osintApi";

export default function SocialSearch() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ facebook: null, instagram: null, twitter: null });

  const buildSiteDork = (site, name, location, company) => {
    const quotedName = name && name.trim() ? `"${name.trim()}"` : "";
    const parts = [quotedName];
    if (company && company.trim()) parts.push(company.trim());
    if (location && location.trim()) parts.push(location.trim());
    return `site:${site} ${parts.filter(Boolean).join(" ")}`.trim();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!name || !name.trim()) return;
    setLoading(true);
    setResults({ facebook: null, instagram: null, twitter: null });

    try {
      const fbDork = buildSiteDork("facebook.com", name, location, company);
      const igDork = buildSiteDork("instagram.com", name, location, company);
      const twDork = buildSiteDork("twitter.com", name, location, company);

      const [fbRes, igRes, twRes] = await Promise.all([
        googleSearch(fbDork).catch(() => []),
        googleSearch(igDork).catch(() => []),
        googleSearch(twDork).catch(() => []),
      ]);

      // log searches (best-effort)
  logSearch('facebook', fbDork).then(() => window.dispatchEvent(new Event('search:logged'))).catch(() => {});
  logSearch('instagram', igDork).then(() => window.dispatchEvent(new Event('search:logged'))).catch(() => {});
  logSearch('twitter', twDork).then(() => window.dispatchEvent(new Event('search:logged'))).catch(() => {});

      setResults({
        facebook: (fbRes && fbRes[0]) || null,
        instagram: (igRes && igRes[0]) || null,
        twitter: (twRes && twRes[0]) || null,
      });
    } catch (err) {
      console.error("Social search error", err);
    }

    setLoading(false);
  };

  const renderResult = (r, siteName) => {
    if (!r) return <div className="text-muted">No {siteName} result</div>;
    return (
      <div>
        <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
          <h6 className="mb-1 text-primary">{r.title}</h6>
        </a>
        <p className="mb-1 small text-muted">{r.snippet}</p>
        <small className="text-success">{r.link}</small>
      </div>
    );
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex align-items-center">
        <i className="fas fa-users mr-2 text-primary"></i>
        <span>Social Search</span>
      </div>
      <div className="card-body">
        <form onSubmit={handleSearch} className="mb-3">
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
              placeholder="Location (optional)"
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

        <div className="row">
          <div className="col-md-4">
            <h6 className="mb-2">Facebook</h6>
            <div className="card p-2">{renderResult(results.facebook, "Facebook")}</div>
          </div>
          <div className="col-md-4">
            <h6 className="mb-2">Instagram</h6>
            <div className="card p-2">{renderResult(results.instagram, "Instagram")}</div>
          </div>
          <div className="col-md-4">
            <h6 className="mb-2">Twitter</h6>
            <div className="card p-2">{renderResult(results.twitter, "Twitter")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
