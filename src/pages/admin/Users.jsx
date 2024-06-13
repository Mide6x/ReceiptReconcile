import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Usersa = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [deliveryRegion, setDeliveryRegion] = useState("");
  const navigate = useNavigate();

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
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home">
          ReceiptReconcile
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/upload-receipts">
                Upload Receipts
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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  {"  "}
                  <button
                    className="btn btn-warning btn-sm ml-2"
                    onClick={() => handleBlock(user._id)}
                  >
                    Block
                  </button>
                  {"  "}
                  <button
                    className="btn btn-primary btn-sm ml-2"
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
                href={`http://localhost:3001/${receipt.fileUrl}`}
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
  );
};

export default Usersa;
