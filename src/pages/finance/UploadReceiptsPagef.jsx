import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UploadReceiptsPagef = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length < 1 || selectedFiles.length > 30) {
      alert("Please select between 1 and 30 files.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("receipts", file);
    });

    formData.append("storeName", storeName);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/receipts/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Receipts uploaded successfully!");
      setSelectedFiles([]);
      setStoreName("");
    } catch (error) {
      console.error("Error uploading receipts:", error);
      setError("Error uploading receipts.");
    }
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
            <label htmlFor="receiptUpload">Upload Receipts (1-30 files)</label>
            <div></div>
            <input
              type="file"
              className="form-control-file mt-3"
              id="receiptUpload"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="storeName">Store Name (Optional)</label>
            <input
              type="text"
              className="form-control mt-2"
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-success mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadReceiptsPagef;
