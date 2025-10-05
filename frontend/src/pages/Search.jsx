import GoogleSearch from "../components/GoogleSearch";
import DomainInfo from "../components/DomainInfo";
import NumberInfo from "../components/NumberInfo";
import IpInfo from "../components/IpInfo";
import LinkedInSearch from "../components/LinkedinSearch";
import SocialSearch from "../components/SocialSearch";
import Stats from "../components/Stats";
import RecentSearches from "../components/RecentSearches";

const Search = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
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
                                <i className="fas fa-search text-warning mr-2"></i>
                               Person Search
                            </h3>
                            <LinkedInSearch />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <h3 className="h4 mb-3">
                                <i className="fas fa-users text-warning mr-2"></i>
                                Social Search
                            </h3>
                            <SocialSearch />
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
                <div className="row">
                    <div className="col-12 mb-4">
                            <h3 className="h4 mb-3">Recent Searches</h3>
                            <RecentSearches />
                    </div>
                </div>
                
            </div>
        </main>
    );
}

export default Search;