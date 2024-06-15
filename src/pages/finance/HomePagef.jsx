import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";

const HomePagef = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
        <h1 className="display-4">Welcome to ReceiptReconcile!</h1>
        <p className="lead">Manage and upload your receipts effortlessly.</p>
        <hr className="my-4" />
        <p>
          Navigate through your finance profile, dashboard, and receipt uploads
          using the navigation bar above.
        </p>
      </div>
    </div>
  );
};

export default HomePagef;
