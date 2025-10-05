import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow-sm">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0 d-flex align-items-center text-decoration-none px-3 py-2" to="/">
          <img src="/images/logo.png" alt="Project Arjuna Logo" className="navbar-logo mr-2" style={{height: '32px', width: 'auto'}} />
          <span className="font-weight-bold">Project Arjuna</span>
        </Link>
        <ul className="navbar-nav px-3">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-nowrap" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
              <i className="fas fa-user-circle mr-1"></i>
              Admin
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#">
                <i className="fas fa-user mr-2"></i>Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cog mr-2"></i>Settings
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <i className="fas fa-sign-out-alt mr-2"></i>Sign out
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <nav className="col-md-2 d-none d-md-block sidebar border-right">
        <div className="sidebar-sticky pt-3">
          <nav className="nav flex-column mb-4">
            <Link className={`nav-link d-flex align-items-center py-2 px-3 ${location.pathname === '/' ? 'active' : ''}`} to="/">
              <i className="fas fa-tachometer-alt mr-3"></i>
              <span>Dashboard</span>
              {location.pathname === '/' && <span className="sr-only">(current)</span>}
            </Link>
            <Link className={`nav-link d-flex align-items-center py-2 px-3 ${location.pathname === '/profiles' ? 'active' : ''}`} to="/profiles">
              <i className="fas fa-users mr-3"></i>
              <span>Profiles</span>
            </Link>
            <Link className={`nav-link d-flex align-items-center py-2 px-3 ${location.pathname === '/search' ? 'active' : ''}`} to="/search">
              <i className="fas fa-search mr-3"></i>
              <span>Search</span>
            </Link>
            <Link className={`nav-link d-flex align-items-center py-2 px-3 ${location.pathname === '/analytics' ? 'active' : ''}`} to="/analytics">
              <i className="fas fa-chart-line mr-3"></i>
              <span>Analytics</span>
              {location.pathname === '/analytics' && <span className="sr-only">(current)</span>}
            </Link>
            <Link className={`nav-link d-flex align-items-center py-2 px-3 ${location.pathname === '/database' ? 'active' : ''}`} to="/database">
              <i className="fas fa-database mr-3"></i>
              <span>Database</span>
              {location.pathname === '/database' && <span className="sr-only">(current)</span>}
            </Link>
            <a className="nav-link d-flex align-items-center py-2 px-3" href="#">
              <i className="fas fa-cog mr-3"></i>
              <span>Settings</span>
            </a>
          </nav>
          <div className="border-top pt-3">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-2 text-muted text-uppercase">
              <span className="small font-weight-bold">Quick Tools</span>
              <a className="d-flex align-items-center text-muted" href="#" title="Add Tool">
                <i className="fas fa-plus-circle"></i>
              </a>
            </h6>
            <nav className="nav flex-column">
              <a className="nav-link d-flex align-items-center py-2 px-3 small" href="#">
                <i className="fas fa-bolt mr-3 text-warning"></i>
                <span>Quick Search</span>
              </a>
              <a className="nav-link d-flex align-items-center py-2 px-3 small" href="#">
                <i className="fas fa-download mr-3 text-info"></i>
                <span>Export Data</span>
              </a>
              <a className="nav-link d-flex align-items-center py-2 px-3 small" href="#">
                <i className="fas fa-bookmark mr-3 text-success"></i>
                <span>Saved Searches</span>
              </a>
              <a className="nav-link d-flex align-items-center py-2 px-3 small" href="#">
                <i className="fas fa-question-circle mr-3 text-primary"></i>
                <span>Help & Support</span>
              </a>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
}
