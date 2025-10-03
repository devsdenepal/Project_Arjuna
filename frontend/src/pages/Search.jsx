import GoogleSearch from "../components/GoogleSearch";
import DomainInfo from "../components/DomainInfo";
import NumberInfo from "../components/NumberInfo";
import IpInfo from "../components/IpInfo";

const Search = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            {/* Page Header */}
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div>
                    <h1 className="h2 mb-1">Search and Lookups</h1>
                    <p className="text-muted mb-0">Comprehensive OSINT search tools and intelligence gathering</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-warning">
                            <i className="fas fa-history mr-1"></i>History
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-download mr-1"></i>Export Results
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-0">
                {/* Search Tools Section */}
                <section className="mb-4">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <h3 className="h4 mb-3">
                                <i className="fas fa-search text-warning mr-2"></i>
                                Web Search
                            </h3>
                            <GoogleSearch />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <h3 className="h4 mb-3">
                                <i className="fas fa-globe text-warning mr-2"></i>
                                Domain Intelligence
                            </h3>
                            <DomainInfo />
                        </div>
                    </div>
                </section>

                {/* Validation Tools Section */}
                <section className="mb-4">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <h3 className="h4 mb-3">
                                <i className="fas fa-phone text-warning mr-2"></i>
                                Phone Validation
                            </h3>
                            <NumberInfo />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <h3 className="h4 mb-3">
                                <i className="fas fa-network-wired text-warning mr-2"></i>
                                IP Address Lookup
                            </h3>
                            <IpInfo />
                        </div>
                    </div>
                </section>

                {/* Recent Searches */}
                <div className="row">
                    <div className="col-12 mb-4">
                        <h3 className="h4 mb-3">Recent Searches</h3>
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-3">
                                <h6 className="mb-0">Search History</h6>
                                <button className="btn btn-sm btn-outline-danger">
                                    <i className="fas fa-trash mr-1"></i>Clear All
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush">
                                    <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-primary mr-3">Google</span>
                                            <span className="font-weight-medium">john doe linkedin</span>
                                        </div>
                                        <small className="text-muted">2 hours ago</small>
                                    </div>
                                    <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-info mr-3">Domain</span>
                                            <span className="font-weight-medium">example.com</span>
                                        </div>
                                        <small className="text-muted">3 hours ago</small>
                                    </div>
                                    <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                        <div className="d-flex align-items-center">
                                            <span className="badge badge-success mr-3">IP</span>
                                            <span className="font-weight-medium">192.168.1.1</span>
                                        </div>
                                        <small className="text-muted">1 day ago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Statistics */}
                <div className="mb-4">
                    <h3 className="h4 mb-3">Search Statistics</h3>
                    <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-primary font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">Total Searches</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-info font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">Domains Checked</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-success font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">IPs Looked Up</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-warning font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">Phone Numbers</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Search;