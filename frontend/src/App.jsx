import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Profiles from "./pages/Profiles";
import Search from "./pages/Search";
import Analytics from "./pages/Analytics";
import Database from "./pages/Database";
import DocumentSearch from "./pages/QuickTools/DocumentSearch";
import TechDetect from "./pages/QuickTools/TechDetect";
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
            <Route path="/quick-tools/documents" element={<DocumentSearch />} />
            <Route path="/quick-tools/tech-detect" element={<TechDetect />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
