import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";
import axios from "axios";

const UploadReceiptsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [storeName, setStoreName] = useState("");
  const [receipts, setReceipts] = useState([]);

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/receipts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceipts(response.data);
      } catch (err) {
        console.error("Error fetching receipts:", err.response || err);
      }
    };

    fetchReceipts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    if (!storeName) {
      setError("Please enter the store name");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", selectedFile);
    formData.append("storeName", storeName);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/upload-receipt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("File submitted:", response.data);
      setSuccess("Receipt uploaded successfully!");
      setError("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setStoreName("");

      const updatedReceipts = await axios.get(
        "http://localhost:3001/receipts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReceipts(updatedReceipts.data);
    } catch (err) {
      console.error("Error during file upload:", err.response || err);
      setError("An error occurred while uploading the receipt.");
      setSuccess("");
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
        <h2 className="display-4 cormorant-garamond-semibold mb-3">
          Upload Receipts
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="storeName"
              className=" lead mb-2 cormorant-garamond-regular"
            >
              Store Name
            </label>
            <input
              type="text"
              className="form-control "
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="receiptUpload"
              className="mb-2 lead cormorant-garamond-regular"
            >
              Upload Receipt
            </label>
            <div></div>
            <input
              type="file"
              className="form-control-file cormorant-garamond-regular"
              id="receiptUpload"
              onChange={handleFileChange}
            />
          </div>
          {previewUrl && (
            <div className="mb-3">
              <h5 className="display-6 lead cormorant-garamond-medium">
                Preview:
              </h5>
              <div className="mb-2"></div>
              <img
                src={previewUrl}
                alt="Selected receipt"
                className="img-thumbnail"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button
            type="submit"
            className="btn btn-primary lead cormorant-garamond-regular"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <h3 className="display-6 cormorant-garamond-medium">
            Uploaded Receipts
          </h3>
          {receipts.map((receipt) => (
            <div
              key={receipt._id}
              className="mb-2 lead cormorant-garamond-regular"
            >
              View Receipt:{" "}
              <a
                href={`http://localhost:5173/${receipt.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {receipt.fileUrl}
              </a>{" "}
              <span className="ml-2">Order From: {receipt.storeName}.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadReceiptsPage;
