import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UploadReceiptsPagef = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log("File submitted:", selectedFile);
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
              <Link className="nav-link" to="/finance/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/finance/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/finance/profile">
                Profile
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
        <h2>Upload Receipts</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="receiptUpload">Upload Receipt, finance </label>
            <input
              type="file"
              className="form-control-file"
              id="receiptUpload"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadReceiptsPagef;
