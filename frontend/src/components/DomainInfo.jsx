import { useState } from "react";
import { getDomainInfo } from "../api/osintApi";

export default function DomainInfo() {
  const [domain, setDomain] = useState("");
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo(await getDomainInfo(domain));
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Domain Info</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com" required />
          <button className="btn btn-primary" type="submit">Get Info</button>
        </form>
        {info && (
          <div className="mt-2">
            <b>Domain:</b> {info.domain_name}<br/>
            <b>Registrar:</b> {info.registrar}<br/>
            <b>Created:</b> {info.creation_date}<br/>
            <b>Expires:</b> {info.expiration_date}
          </div>
        )}
      </div>
    </div>
  );
}