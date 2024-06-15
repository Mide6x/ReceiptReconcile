import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";
import axios from "axios";

const Usersa = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [deliveryRegion, setDeliveryRegion] = useState("");
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3001/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleBlock = (id) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:3001/users/${id}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setUsers(users.map((user) => (user._id === id ? response.data : user)));
      })
      .catch((error) => console.error("Error blocking user:", error));
  };

  const handleUserSelect = (id, deliveryArea) => {
    setSelectedUserId(id);
    setReceipts([]);
    setDeliveryRegion(deliveryArea);

    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/receipts/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setReceipts(response.data))
      .catch((error) => console.error("Error fetching receipts:", error));
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
          <h2>Users</h2>
          <p>This is a list of all Users</p>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td> {user.name}</td>
                  <td> {user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm mt-1"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                    {"  "}

                    <button
                      className="btn btn-warning btn-sm ml-2 mt-1"
                      onClick={() => handleBlock(user._id)}
                    >
                      Block
                    </button>
                    {"  "}
                    <button
                      className="btn btn-primary btn-sm ml-2 mt-1"
                      onClick={() =>
                        handleUserSelect(user._id, user.deliveryArea)
                      }
                    >
                      View Receipts
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUserId && (
          <div>
            <h3>Uploaded Receipts</h3>
            <p>
              <strong>Delivery Region:</strong> {deliveryRegion}
            </p>
            {receipts.map((receipt) => (
              <div key={receipt._id} className="mb-2">
                <a
                  href={`http://localhost:5173/${receipt.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Receipt
                </a>{" "}
                <span className="ml-2">
                  Order From: {receipt.storeName}. Uploaded on:{" "}
                  {new Date(receipt.uploadDate).toLocaleString()} by{" "}
                  {receipt.uploader?.email || "Unknown"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Usersa;
