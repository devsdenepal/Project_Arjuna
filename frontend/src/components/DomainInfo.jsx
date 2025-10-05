import { useState } from "react";
import { getDomainInfo } from "../api/osintApi";

export default function DomainInfo() {
  const [domain, setDomain] = useState("");
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getDomainInfo(domain);
    const fmt = (val) => {
      if (!val) return "N/A";
      // If array, take first
      if (Array.isArray(val)) val = val[0];
      // If numeric-like string, extract digits
      if (typeof val === "string") {
        const digits = val.replace(/\D/g, "");
        if (digits.length >= 10) {
          // try ms (13) then s (10)
          let d = null;
          if (digits.length >= 13) {
            d = new Date(parseInt(digits.slice(0, 13), 10));
            if (!isNaN(d.getTime())) return toShort(d);
          }
          d = new Date(parseInt(digits.slice(0, 10), 10) * 1000);
          if (!isNaN(d.getTime())) return toShort(d);
        }
        // try ISO parse
        const iso = new Date(val);
        if (!isNaN(iso.getTime())) return toShort(iso);
        // fallback: original
        return val;
      }
      if (typeof val === "number") {
        const d = val > 1e12 ? new Date(val) : new Date(val * 1000);
        if (!isNaN(d.getTime())) return toShort(d);
      }
      return String(val);
    };

    const toShort = (d) => {
      const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(d.getUTCDate()).padStart(2, "0");
      const yy = String(d.getUTCFullYear()).slice(-2);
      return `${mm}/${dd}/${yy}`;
    };

    if (data) {
      data.creation_date = fmt(data.creation_date);
      data.expiration_date = fmt(data.expiration_date);
    }
    setInfo(data);
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