import { Link, useNavigate } from "react-router-dom";

const DashboardPagea = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home">
          ReceiptReconcile
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/upload-receipts">
                Upload Receipts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/usersa">
                Admin
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div>
        <h2>Dashboard</h2>
        <p>
          This is your Admin dashboard where you can see an overview of your
          activities.
        </p>
      </div>
    </div>
  );
};

export default DashboardPagea;
