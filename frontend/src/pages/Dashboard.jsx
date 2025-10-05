import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FaUser, FaSearch, FaChartBar, FaCog, FaRocket } from "react-icons/fa";
import Stats from "../components/Stats";
import { getSummary } from '../api/osintApi';
const Dashboard = () => {
    const [summary, setSummary] = useState({ profiles: 0, searches: 0, domains: 0, ips: 0 });
    useEffect(() => {
        let mounted = true;
        const load = () => getSummary().then(s => { if (mounted) setSummary(s || summary); }).catch(() => {});
        load();
        const onSearch = () => load();
        const onProfile = () => load();
        window.addEventListener('search:logged', onSearch);
        window.addEventListener('profile:changed', onProfile);
        return () => { mounted = false; window.removeEventListener('search:logged', onSearch); window.removeEventListener('profile:changed', onProfile); };
    }, []);
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div>
                    <h1 className="h2 mb-1">Dashboard</h1>
                    <p className="text-muted mb-0">Welcome to Project Arjuna - Your OSINT Investigation Suite</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-warning">
                            <i className="fas fa-sync-alt mr-1"></i>Refresh
                        </button>
                        <button type="button" className="btn btn-sm btn-primary">
                            <i className="fas fa-play mr-1"></i>Quick Start
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <section className="mb-4">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-3">
                                    <h5 className="card-title text-primary mb-3">Profile Management</h5>
                                    <p className="card-text text-muted small mb-3">
                                        Generate random user profiles and save profiles to local database
                                    </p>
                                    <ul className="list-unstyled small mb-4">
                                        <li className="mb-1">
                                            <i className="fas fa-check text-warning mr-2"></i>
                                            Generate random user profiles
                                        </li>
                                        <li className="mb-1">
                                            <i className="fas fa-check text-warning mr-2"></i>
                                            Save profiles to local database
                                        </li>
                                        <li className="mb-1">
                                            <i className="fas fa-check text-warning mr-2"></i>
                                            View all saved profiles
                                        </li>
                                    </ul>
                                    <Link to="/profiles" className="btn btn-primary btn-sm stretched-link">
                                        Go to Profiles
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-3">
                                    <h5 className="card-title text-primary mb-2">Search and Lookups</h5>
                                    <p className="card-text text-muted small mb-3">
                                        Comprehensive search tools and intelligence gathering
                                    </p>
                                    <ul className="list-unstyled small mb-3">
                                        <li className="mb-1">
                                            <i className="fas fa-check text-primary mr-2"></i>
                                            Google search
                                        </li>
                                        <li className="mb-1">
                                            <i className="fas fa-check text-primary mr-2"></i>
                                            Whois/domain lookup
                                        </li>
                                        <li className="mb-1">
                                            <i className="fas fa-check text-primary mr-2"></i>
                                            Phone validation
                                        </li>
                                        <li className="mb-1">
                                            <i className="fas fa-check text-primary mr-2"></i>
                                            IP address lookup
                                        </li>
                                    </ul>
                                    <Link to="/search" className="btn btn-primary btn-sm stretched-link">
                                        Go to Search
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-3">
                                    <h5 className="card-title text-warning mb-2">Database</h5>
                                    <p className="card-text text-muted small mb-3">
                                        Manage your collected data and findings
                                    </p>
                                    <ul className="list-unstyled small mb-3">
                                        <li className="mb-1">
                                            <i className="fas fa-clock text-muted mr-2"></i>
                                            Data management
                                        </li>
                                        <li className="mb-1">
                                            <i className="fas fa-clock text-muted mr-2"></i>
                                            Export capabilities
                                        </li>
                                        <li className="mb-1">
                                            <i className="fas fa-clock text-muted mr-2"></i>
                                            Search history
                                        </li>
                                    </ul>
                                    <Link to="/profiles" className="btn btn-primary btn-sm stretched-link">
                                        Manage Database
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-4">
                    <h3 className="h4 mb-3">Quick Statistics</h3>
                    <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-primary font-weight-bold mb-2">{summary.profiles || 0}</div>
                                    <h6 className="card-title mb-1">Total Profiles</h6>
                                    <small className="text-success">+{summary.profiles_today || 0} today</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-primary font-weight-bold mb-2">{summary.searches || 0}</div>
                                    <h6 className="card-title mb-1">Searches Performed</h6>
                                    <small className="text-success">+{summary.searches_today || 0} today</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-primary font-weight-bold mb-2">{summary.domains || 0}</div>
                                    <h6 className="card-title mb-1">Domains Checked</h6>
                                    <small className="text-muted">+{summary.domains_week || 0} this week</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-primary font-weight-bold mb-2">{summary.ips || 0}</div>
                                    <h6 className="card-title mb-1">IPs Looked Up</h6>
                                    <small className="text-muted">+{summary.ips_week || 0} this week</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="row">
                    <div className="col-lg-8 mb-4">
                        <h3 className="h4 mb-3">Recent Activity</h3>
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-transparent border-bottom-0 py-3">
                                <h6 className="mb-0">Activity Feed</h6>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-start">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                                             style={{width: '40px', height: '40px'}}>
                                            <FaRocket style={{color: '#0D1117', fontSize: '1.2rem'}} />
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">Welcome to Project Arjuna!</h6>
                                        <p className="text-muted mb-1 small">
                                            Get started by generating your first profile or performing a search.
                                        </p>
                                        <small className="text-muted">Just now</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <h3 className="h4 mb-3">Quick Actions</h3>
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-transparent border-bottom-0 py-3">
                                <h6 className="mb-0">Quick Tools</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <Link to="/profiles" className="btn btn-outline-warning btn-sm w-100 d-flex flex-column align-items-center p-2 text-decoration-none">
                                            <FaUser className="mb-1" style={{fontSize: '1.5rem'}} />
                                            <span className="small">Generate Profile</span>
                                        </Link>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <Link to="/search" className="btn btn-outline-primary btn-sm w-100 d-flex flex-column align-items-center p-2 text-decoration-none">
                                            <FaSearch className="mb-1" style={{fontSize: '1.5rem'}} />
                                            <span className="small">Quick Search</span>
                                        </Link>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <a href="#" className="btn btn-outline-warning btn-sm w-100 d-flex flex-column align-items-center p-2 text-decoration-none">
                                            <FaChartBar className="mb-1" style={{fontSize: '1.5rem'}} />
                                            <span className="small">View Reports</span>
                                        </a>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <a href="#" className="btn btn-outline-secondary btn-sm w-100 d-flex flex-column align-items-center p-2 text-decoration-none">
                                            <FaCog className="mb-1" style={{fontSize: '1.5rem'}} />
                                            <span className="small">Settings</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Dashboard;
