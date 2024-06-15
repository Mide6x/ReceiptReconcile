import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";

const ProfilePagef = () => {
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
        <h2 className="display-4 cormorant-garamond-bold">Profile</h2>
        <p className="lead cormorant-garamond-regular">
          This is your profile page where you can manage your personal
          information finance.
        </p>
      </div>
    </div>
  );
};

export default ProfilePagef;
