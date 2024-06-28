import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";
import axios from "axios";

const HomePagef = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [ocrResults, setOcrResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchOcrResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/receipts/ocr", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOcrResults(response.data);
      } catch (err) {
        console.error("Error fetching OCR results:", err);
        navigate("/login");
      }
    };

    fetchOcrResults();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
        <h1 className="display-4 cormorant-garamond-semibold">
          Welcome to ReceiptReconcile!
        </h1>
        <p className="lead cormorant-garamond-regular">
          Manage and upload your receipts effortlessly.
        </p>
        <hr className="my-4" />
        <p className="lead cormorant-garamond-regular">
          Navigate through your finance profile, dashboard, and receipt uploads
          using the navigation bar above.
        </p>
        <div className="mt-4">
          <h2 className="display-6 cormorant-garamond-medium">OCR Results</h2>
          <ul>
            {ocrResults.map((result) => (
              <li key={result.receiptId}>
                <p>
                  <strong>Receipt ID:</strong> {result.receiptId}
                </p>
                <p>
                  <strong>Date Uploaded:</strong> {result.dateUploaded}
                </p>
                <p>
                  <strong>Text:</strong> {result.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePagef;
