import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faFileUpload,
  faBars,
  faTimes,
  faPieChart,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  const sidebarLinks = [
    { to: "/dashboard", text: "Dashboard", icon: faPieChart },
    { to: "/home", text: "Home", icon: faHome },
    { to: "/profile", text: "Profile", icon: faUser },
    {
      to: "/upload-receipts",
      text: "Upload Receipts",
      icon: faFileUpload,
    },
  ];

  return (
    <nav className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <div className="sidebar-content mt-3">
        <Link
          to="/home"
          className="sidebar-brand lead cormorant-garamond-medium"
        >
          {isOpen && "ReceiptReconcile"}
        </Link>
        <ul className="sidebar-nav">
          {sidebarLinks.map((link) => (
            <li key={link.to} className="sidebar-item mt-4">
              <Link
                className="sidebar-link lead cormorant-garamond-regular"
                to={link.to}
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={link.icon} />
                {isOpen && link.text}
              </Link>
            </li>
          ))}
        </ul>
        {isOpen && (
          <button
            className="btn btn-outline-danger my-2 my-sm-0 lead cormorant-garamond-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Sidebar;
