import ProfileForm from "../components/ProfileForm";
import ProfileList from "../components/ProfileList";
import RandomProfile from "../components/RandomProfile";
const Profiles = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div>
                    <h1 className="h2 mb-1">Profile Management</h1>
                    <p className="text-muted mb-0">Generate, create, and manage user profiles for OSINT investigations</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-warning">
                            <i className="fas fa-download mr-1"></i>Export
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-upload mr-1"></i>Import
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <section className="mb-4">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <h3 className="h4 mb-3">Generate Profiles</h3>
                            <RandomProfile />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <h3 className="h4 mb-3">Manual Entry</h3>
                            <ProfileForm />
                        </div>
                    </div>
                </section>
                <section className="mb-4">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <h3 className="h4 mb-3">Saved Profiles</h3>
                            <ProfileList />
                        </div>
                    </div>
                </section>
                <div className="mb-4">
                    <h3 className="h4 mb-3">Profile Statistics</h3>
                    <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-primary font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">Total Profiles</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-success font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">Generated Today</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-info font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">Male Profiles</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-0 shadow-sm text-center">
                                <div className="card-body py-4">
                                    <div className="display-4 text-warning font-weight-bold mb-2">0</div>
                                    <h6 className="card-title mb-0">Female Profiles</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Profiles;
