import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  return (
    <>
      <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/"> Project Arjuna </Link>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#">Sign out</a>
          </li>
        </ul>
      </nav>
      
      <nav className="col-md-2 d-none d-md-block sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                <span data-feather="home"></span>
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/profiles' ? 'active' : ''}`} to="/profiles">
                <span data-feather="users"></span>
                Profiles
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`} to="/search">
                <span data-feather="search"></span>
                Search
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="activity"></span>
                Analytics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="database"></span>
                Database
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="settings"></span>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}