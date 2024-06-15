import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
        <h1 className="display-4 cormorant-garamond-bold">
          Welcome to ReceiptReconcile!
        </h1>
        <p className="lead cormorant-garamond-regular">
          Manage and upload your receipts effortlessly.
        </p>
        <hr className="my-4" />
        <p className="lead cormorant-garamond-light">
          This is your delivery dashboard where you can see an overview of your
          activities.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
