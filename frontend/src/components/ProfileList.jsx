import { useEffect, useState } from "react";
import { fetchProfiles } from "../api/osintApi";
export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles().then(setProfiles);
  }, []);
  return (
    <div className="card">
      <div className="card-header">Saved Profiles</div>
      <ul className="list-group list-group-flush">
        {profiles.map((p) => (
          <li className="list-group-item" key={p.id}>
            {p.name} ({p.gender}) - {p.email} - {p.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
