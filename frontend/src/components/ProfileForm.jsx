import { useState } from "react";
import { saveProfile } from "../api/osintApi";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    location: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfile(form);
    setMsg("Profile saved!");
    setForm({ name: "", username: "", email: "", gender: "", location: "" });
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex align-items-center">
        <i className="fas fa-user-plus mr-2 text-success"></i>
        <span>Add Profile Manually</span>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label small text-muted">Full Name</label>
                <input 
                  id="name"
                  className="form-control" 
                  name="name" 
                  placeholder="Enter full name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="username" className="form-label small text-muted">Username</label>
                <input 
                  id="username"
                  className="form-control" 
                  name="username" 
                  placeholder="Enter username" 
                  value={form.username} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label small text-muted">Email Address</label>
                <input 
                  id="email"
                  type="email"
                  className="form-control" 
                  name="email" 
                  placeholder="Enter email address" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="gender" className="form-label small text-muted">Gender</label>
                <select 
                  id="gender"
                  className="form-select" 
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="location" className="form-label small text-muted">Location</label>
                <input 
                  id="location"
                  className="form-control" 
                  name="location" 
                  placeholder="Enter location" 
                  value={form.location} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary w-100" type="submit">
                  <i className="fas fa-save mr-2"></i>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </form>
        
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