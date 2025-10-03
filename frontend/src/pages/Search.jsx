import GoogleSearch from "../components/GoogleSearch";
import DomainInfo from "../components/DomainInfo";
import NumberInfo from "../components/NumberInfo";
import IpInfo from "../components/IpInfo";

const Search = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Search and Lookups</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">History</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export Results</button>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                {/* Search Tools Section */}
                <div className="row mb-4">
                    <div className="col-lg-6">
                        <div className="section-header">
                            <h3>Web Search</h3>
                            <p className="text-muted">Perform advanced Google searches and web investigations</p>
                        </div>
                        <GoogleSearch />
                    </div>
                    <div className="col-lg-6">
                        <div className="section-header">
                            <h3>Domain Intelligence</h3>
                            <p className="text-muted">Get comprehensive domain and WHOIS information</p>
                        </div>
                        <DomainInfo />
                    </div>
                </div>

                <hr />

                {/* Validation Tools Section */}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-header">
                            <h3>Phone Validation</h3>
                            <p className="text-muted">Validate and get information about phone numbers</p>
                        </div>
                        <NumberInfo />
                    </div>
                    <div className="col-lg-6">
                        <div className="section-header">
                            <h3>IP Address Lookup</h3>
                            <p className="text-muted">Get geolocation and network information for IP addresses</p>
                        </div>
                        <IpInfo />
                    </div>
                </div>

                {/* Recent Searches */}
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="section-header">
                            <h3>Recent Searches</h3>
                            <p className="text-muted">Your recent search history and saved results</p>
                        </div>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <span>Search History</span>
                                <button className="btn btn-sm btn-outline-secondary">Clear All</button>
                            </div>
                            <div className="card-body">
                                <div className="search-history">
                                    <div className="search-item">
                                        <div className="search-type-badge">Google</div>
                                        <div className="search-query">john doe linkedin</div>
                                        <div className="search-time">2 hours ago</div>
                                    </div>
                                    <div className="search-item">
                                        <div className="search-type-badge">Domain</div>
                                        <div className="search-query">example.com</div>
                                        <div className="search-time">3 hours ago</div>
                                    </div>
                                    <div className="search-item">
                                        <div className="search-type-badge">IP</div>
                                        <div className="search-query">192.168.1.1</div>
                                        <div className="search-time">1 day ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Statistics */}
                <div className="row mt-4">
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Total Searches</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Domains Checked</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">IPs Looked Up</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Phone Numbers</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Search;