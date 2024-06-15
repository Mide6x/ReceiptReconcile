import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";

const UploadReceiptsPagea = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
        <div>
          <h2 className=" display-4 cormorant-garamond-bold">
            Upload Receipts
          </h2>
          <form onSubmit={handleSubmit}>
            <div></div>
            <div className="form-group mt-3 lead cormorant-garamond-regular">
              <label htmlFor="receiptUpload">Upload Receipt, Admin </label>
              <div></div>
              <input
                type="file"
                className="form-control-file mt-3"
                id="receiptUpload"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3 lead cormorant-garamond-regular"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadReceiptsPagea;
