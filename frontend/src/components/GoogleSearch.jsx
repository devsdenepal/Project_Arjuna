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
      <div className="card-header">Google Search</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Google..." required />
          <button className="btn btn-primary" type="submit" disabled={loading}>Search</button>
        </form>
        <ul className="list-group mt-2">
          {results.slice(0,3).map((r, idx) => (
            <li className="list-group-item" key={idx}>
              <a href={r.link} target="_blank" rel="noopener noreferrer"><b>{r.title}</b></a>
              <div>{r.snippet}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}