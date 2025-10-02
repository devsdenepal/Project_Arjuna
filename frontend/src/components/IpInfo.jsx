import { useState } from "react";
import { getIpInfo } from "../api/osintApi";

export default function IpInfo() {
  const [ip, setIp] = useState("");
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo(await getIpInfo(ip));
  };

  return (
    <div className="card mb-3">
      <div className="card-header">IP Address Info</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" value={ip} onChange={e => setIp(e.target.value)} placeholder="8.8.8.8" required />
          <button className="btn btn-primary" type="submit">Get Info</button>
        </form>
        {info && (
          <div className="mt-2">
            <b>IP:</b> {info.ip}<br/>
            <b>City:</b> {info.city}<br/>
            <b>Region:</b> {info.region}<br/>
            <b>Country:</b> {info.country_name}<br/>
            <b>Org:</b> {info.org}
          </div>
        )}
      </div>
    </div>
  );
}