import { useState } from "react";
import { getRandomProfile, saveProfile } from "../api/osintApi";

export default function RandomProfile() {
  const [profile, setProfile] = useState(null);
  const [gender, setGender] = useState("male");
  const [msg, setMsg] = useState("");

  const handleGenerate = async () => {
    setProfile(await getRandomProfile(gender));
    setMsg("");
  };

  const handleSave = async () => {
    await saveProfile(profile);
    setMsg("Profile saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Random Profile Generator</div>
      <div className="card-body">
        <div className="mb-2">
          <select className="form-select" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button className="btn btn-secondary mt-2" onClick={handleGenerate}>Generate</button>
        </div>
        {profile && (
          <div>
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Username:</b> {profile.username}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Gender:</b> {profile.gender}</p>
            <p><b>Location:</b> {profile.location}</p>
            <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
          </div>
        )}
        {msg && <div className="alert alert-success mt-2">{msg}</div>}
      </div>
    </div>
  );
}