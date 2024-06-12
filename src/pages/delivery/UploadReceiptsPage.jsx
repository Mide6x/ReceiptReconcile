import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UploadReceiptsPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [receipts, setReceipts] = useState([]); // Add state to store receipts

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch receipts on component mount
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

    const formData = new FormData();
    formData.append("receipt", selectedFile);

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

      // Fetch updated receipts list
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
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="/home">
          ReceiptReconcile
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
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
        <h2 className="mb-3">Upload Receipts</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="receiptUpload" className="mb-2">
              Upload Receipt
            </label>
            <div></div>
            <input
              type="file"
              className="form-control-file"
              id="receiptUpload"
              onChange={handleFileChange}
            />
          </div>
          {previewUrl && (
            <div className="mb-3">
              <h5>Preview:</h5>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="mt-4">
          <h3>Uploaded Receipts</h3>
          {receipts.map((receipt) => (
            <div key={receipt._id} className="mb-2">
              <a
                href={`/${receipt.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Receipt
              </a>{" "}
              <span className="ml-2">
                Uploaded on: {new Date(receipt.uploadDate).toLocaleString()} by{" "}
                {receipt.uploader.email}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadReceiptsPage;
