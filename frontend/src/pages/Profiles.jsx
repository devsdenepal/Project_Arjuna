import ProfileForm from "../components/ProfileForm";
import ProfileList from "../components/ProfileList";
import RandomProfile from "../components/RandomProfile";

const Profiles = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Profile Management</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Import</button>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                {/* Profile Generation Section */}
                <div className="row mb-4">
                    <div className="col-lg-6">
                        <div className="section-header">
                            <h3>Generate Profiles</h3>
                            <p className="text-muted">Create random user profiles for testing and research purposes</p>
                        </div>
                        <RandomProfile />
                    </div>
                    <div className="col-lg-6">
                        <div className="section-header">
                            <h3>Manual Entry</h3>
                            <p className="text-muted">Add profiles manually with custom information</p>
                        </div>
                        <ProfileForm />
                    </div>
                </div>

                <hr />

                {/* Saved Profiles Section */}
                <div className="row">
                    <div className="col-12">
                        <div className="section-header">
                            <h3>Saved Profiles</h3>
                            <p className="text-muted">View and manage all your saved profiles</p>
                        </div>
                        <ProfileList />
                    </div>
                </div>

                {/* Profile Statistics */}
                <div className="row mt-4">
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Total Profiles</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Generated Today</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Male Profiles</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <div className="stat-number">0</div>
                            <div className="stat-label">Female Profiles</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profiles;