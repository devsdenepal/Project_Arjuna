import Navbar from "./components/Navbar";
import ProfileForm from "./components/ProfileForm";
import ProfileList from "./components/ProfileList";
import RandomProfile from "./components/RandomProfile";
import GoogleSearch from "./components/GoogleSearch";
import DomainInfo from "./components/DomainInfo";
import NumberInfo from "./components/NumberInfo";
import IpInfo from "./components/IpInfo";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <RandomProfile />
            <ProfileForm />
          </div>
          <div className="col-md-6">
            <ProfileList />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <GoogleSearch />
          </div>
          <div className="col-md-4">
            <DomainInfo />
          </div>
          <div className="col-md-4">
            <NumberInfo />
            <IpInfo />
          </div>
        </div>
      </div>
    </div>
  );
}