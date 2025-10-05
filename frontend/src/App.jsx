import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Profiles from "./pages/Profiles";
import Search from "./pages/Search";
import Analytics from "./pages/Analytics";
import Database from "./pages/Database";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/search" element={<Search />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/database" element={<Database />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
