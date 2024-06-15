import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";
import axios from "axios";

const UploadReceiptsPagef = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
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
