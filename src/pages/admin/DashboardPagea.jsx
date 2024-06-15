import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";

const DashboardPagea = () => {
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
        <div>
          <h2 className="display-4 cormorant-garamond-bold">Dashboard</h2>
          <p className="lead cormorant-garamond-regular">
            This is your Admin dashboard where you can see an overview of your
            activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPagea;
