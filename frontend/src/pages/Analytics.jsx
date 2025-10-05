import Stats from '../components/Stats';

export default function Analytics() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Analytics</h1>
        <p className="text-muted">Usage statistics and search history</p>
      </div>
      <div className="container-fluid p-0">
        <section className="mb-4">
          <h3 className="h4 mb-3">Overview</h3>
          <Stats />
        </section>
      </div>
    </main>
  );
}
