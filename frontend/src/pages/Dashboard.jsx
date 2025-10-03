import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <div>
                    <h1 className="h2">Dashboard</h1>
                    <p className="text-muted">Welcome to Project Arjuna - Your OSINT Investigation Suite</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Refresh</button>
                        <button type="button" className="btn btn-sm btn-primary">Quick Start</button>
                    </div>
                </div>
            </div>
            
            <div className="container-fluid">
                {/* Overview Cards */}
                <div className="row mb-4">
                    <div className="col-xl-3 col-md-6">
                        <div className="overview-card">
                            <div className="overview-card-body">
                                <div className="overview-title">Profile Management</div>
                                <div className="overview-description">Generate random user profiles and save profiles to local database</div>
                                <ul className="overview-features">
                                    <li>Generate random user profiles</li>
                                    <li>Save profiles to local database</li>
                                    <li>View all saved profiles</li>
                                </ul>
                                <Link to="/profiles" className="btn btn-sm btn-primary mt-2">Go to Profiles</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="overview-card">
                            <div className="overview-card-body">
                                <div className="overview-title">Search and Lookups</div>
                                <div className="overview-description">Comprehensive search tools and intelligence gathering</div>
                                <ul className="overview-features">
                                    <li>Google search</li>
                                    <li>Whois/domain lookup</li>
                                    <li>Phone validation</li>
                                    <li>IP address lookup</li>
                                </ul>
                                <Link to="/search" className="btn btn-sm btn-primary mt-2">Go to Search</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="overview-card">
                            <div className="overview-card-body">
                                <div className="overview-title">Analytics</div>
                                <div className="overview-description">Track your investigation progress and insights</div>
                                <ul className="overview-features">
                                    <li>Search history</li>
                                    <li>Usage statistics</li>
                                    <li>Data visualization</li>
                                </ul>
                                <button className="btn btn-sm btn-secondary mt-2" disabled>Coming Soon</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="overview-card">
                            <div className="overview-card-body">
                                <div className="overview-title">Database</div>
                                <div className="overview-description">Manage your collected data and findings</div>
                                <ul className="overview-features">
                                    <li>Data management</li>
                                    <li>Export capabilities</li>
                                    <li>Search history</li>
                                </ul>
                                <button className="btn btn-sm btn-secondary mt-2" disabled>Coming Soon</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="section-header">
                            <h3>Quick Statistics</h3>
                            <p className="text-muted">Overview of your recent activity</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Total Profiles</div>
                            <div className="stat-change">+0 today</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Searches Performed</div>
                            <div className="stat-change">+0 today</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Domains Checked</div>
                            <div className="stat-change">+0 this week</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">IPs Looked Up</div>
                            <div className="stat-change">+0 this week</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="row">
                    <div className="col-lg-8">
                        <div className="section-header">
                            <h3>Recent Activity</h3>
                            <p className="text-muted">Your latest investigations and searches</p>
                        </div>
                        <div className="card">
                            <div className="card-header">Activity Feed</div>
                            <div className="card-body">
                                <div className="activity-feed">
                                    <div className="activity-item">
                                        <div className="activity-icon">🔍</div>
                                        <div className="activity-content">
                                            <div className="activity-title">Welcome to Project Arjuna!</div>
                                            <div className="activity-description">Get started by generating your first profile or performing a search.</div>
                                            <div className="activity-time">Just now</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="section-header">
                            <h3>Quick Actions</h3>
                            <p className="text-muted">Common tasks and shortcuts</p>
                        </div>
                        <div className="card">
                            <div className="card-header">Quick Tools</div>
                            <div className="card-body">
                                <div className="quick-actions">
                                    <Link to="/profiles" className="quick-action-btn">
                                        <span className="quick-action-icon">👤</span>
                                        <span className="quick-action-text">Generate Profile</span>
                                    </Link>
                                    <Link to="/search" className="quick-action-btn">
                                        <span className="quick-action-icon">🔍</span>
                                        <span className="quick-action-text">Quick Search</span>
                                    </Link>
                                    <a href="#" className="quick-action-btn">
                                        <span className="quick-action-icon">📊</span>
                                        <span className="quick-action-text">View Reports</span>
                                    </a>
                                    <a href="#" className="quick-action-btn">
                                        <span className="quick-action-icon">⚙️</span>
                                        <span className="quick-action-text">Settings</span>
                                    </a>
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