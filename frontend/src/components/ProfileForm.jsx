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
      <div className="card-header">Add Profile Manually</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input className="form-control mb-2" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="form-control mb-2" name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} required />
          <input className="form-control mb-2" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <button className="btn btn-primary" type="submit">Save</button>
        </form>
        {msg && <div className="alert alert-success mt-2">{msg}</div>}
      </div>
    </div>
  );
}