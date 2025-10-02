import { useState } from "react";
import { getNumberInfo } from "../api/osintApi";

export default function NumberInfo() {
  const [number, setNumber] = useState("");
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo(await getNumberInfo(number));
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Phone Number Info</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" value={number} onChange={e => setNumber(e.target.value)} placeholder="+14155552671" required />
          <button className="btn btn-primary" type="submit">Get Info</button>
        </form>
        {info && (
          <div className="mt-2">
            <b>Status:</b> {info.is_valid?.toString()}<br/>
            <b>Country:</b> {info.country}<br/>
            <b>Location:</b> {info.location}<br/>
            <b>Timezones:</b> {info.timezones?.[0]}
          </div>
        )}
      </div>
    </div>
  );
}