import { Link } from 'react-router-dom';
export default function Database() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Database</h1>
        <p className="text-muted">Manage collected data and exports</p>
      </div>
      <div className="container-fluid p-0">
        <div className="card mb-3">
          <div className="card-body">
            <p className="mb-2">View and export saved profiles.</p>
            <Link to="/profiles" className="btn btn-primary btn-sm">Go to Profiles</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
