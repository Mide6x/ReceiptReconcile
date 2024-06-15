import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";

const ProfilePagea = () => {
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
        <h2>Profile</h2>
        <p>
          This is your profile page where you can manage your personal
          information finance.
        </p>
      </div>
    </div>
  );
};

export default ProfilePagea;
