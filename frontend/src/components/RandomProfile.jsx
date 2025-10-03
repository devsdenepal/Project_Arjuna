import { useState } from "react";
import { getRandomProfile, saveProfile } from "../api/osintApi";
import { FaMale, FaFemale } from "react-icons/fa";

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
        <div className="row mb-3">
          <div className="col-md-6">
            <select className="form-select" value={gender} onChange={e => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-md-6">
            <button className="btn btn-warning w-100" onClick={handleGenerate}>
              <i className="fas fa-random mr-2"></i>
              Generate Profile
            </button>
          </div>
        </div>
        
        {profile && (
          <div className="border rounded p-3 bg-light">
            <div className="row">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong className="text-muted">Name:</strong>
                  <span className="ml-2">{profile.name}</span>
                </p>
                <p className="mb-2">
                  <strong className="text-muted">Username:</strong>
                  <span className="ml-2">{profile.username}</span>
                </p>
                <p className="mb-2">
                  <strong className="text-muted">Email:</strong>
                  <span className="ml-2">{profile.email}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2">
                  <strong className="text-muted">Gender:</strong>
                  <span className="ml-2">{profile.gender}</span>
                </p>
                <p className="mb-2">
                  <strong className="text-muted">Location:</strong>
                  <span className="ml-2">{profile.location}</span>
                </p>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary" onClick={handleSave}>
                <i className="fas fa-save mr-2"></i>
                Save Profile
              </button>
            </div>
          </div>
        )}
        
        {msg && (
          <div className="alert alert-success alert-dismissible mt-3" role="alert">
            <i className="fas fa-check-circle mr-2"></i>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}