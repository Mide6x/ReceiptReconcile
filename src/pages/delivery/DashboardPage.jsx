import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [acceptedNotification, setAcceptedNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Redirecting to login.");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          "http://localhost:3001/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const acceptedNotifications = response.data.filter(
          (notification) => notification.acceptedAt && !notification.deliveredAt
        );
        const pendingNotifications = response.data.filter(
          (notification) => !notification.acceptedAt
        );

        setNotifications(pendingNotifications);
        setPendingDeliveries(acceptedNotifications);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          console.error(
            "Token might be expired or invalid. Redirecting to login."
          );
          window.location.href = "/login";
        } else {
          console.error("Error fetching notifications:", err.response || err);
        }
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Accepting notification with ID: ${notificationId}`);
      const response = await axios.post(
        `http://localhost:3001/notifications/${notificationId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from server:", response.data);

      const updatedNotifications = notifications.filter(
        (n) => n._id !== notificationId
      );
      setNotifications(updatedNotifications);
      setPendingDeliveries([...pendingDeliveries, response.data]);
      setAcceptedNotification(response.data);

      localStorage.setItem(
        "acceptedNotification",
        JSON.stringify(response.data)
      );
    } catch (err) {
      console.error("Error accepting notification:", err.response || err);
    }
  };

  const handleDelivered = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3001/notifications/${notificationId}/delivered`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedPendingDeliveries = pendingDeliveries.filter(
        (d) => d._id !== notificationId
      );
      setPendingDeliveries(updatedPendingDeliveries);

      const updatedNotifications = notifications.filter(
        (n) => n._id !== notificationId
      );
      setNotifications(updatedNotifications);

      navigateToUploadReceipts();
    } catch (err) {
      console.error("Error delivering item:", err.response || err);
    }
  };

  const navigateToUploadReceipts = () => {
    navigate("/upload-receipts");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
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
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload-receipts">
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
        <h2>Dashboard</h2>
        <p>
          This is your delivery dashboard where you can see an overview of your
          activities.
        </p>
        <div>
          <h3>Notifications</h3>
          {notifications.map((notification) => (
            <div key={notification._id} className="alert alert-info">
              <strong>Store:</strong> {notification.storeName}
              <br />
              <strong>Seller Contact:</strong> {notification.sellerContact}
              <br />
              <strong>Item:</strong> {notification.item}
              <br />
              <strong>Quantity:</strong> {notification.quantity}
              <br />
              <strong>Delivery Area:</strong> {notification.deliveryArea}
              <br />
              <button
                className="btn btn-primary mt-2"
                onClick={() => handleAccept(notification._id)}
                disabled={!!acceptedNotification}
              >
                Accept Delivery
              </button>
            </div>
          ))}
        </div>
        <hr />
        <div>
          <h3>Pending Deliveries</h3>
          {pendingDeliveries.map((delivery) => (
            <div
              key={delivery._id}
              className="alert alert-warning"
              style={{ backgroundColor: "#ffe6cc" }}
            >
              <strong>Store:</strong> {delivery.storeName}
              <br />
              <strong>Seller Contact:</strong> {delivery.sellerContact}
              <br />
              <strong>Item:</strong> {delivery.item}
              <br />
              <strong>Quantity:</strong> {delivery.quantity}
              <br />
              <strong>Delivery Area:</strong> {delivery.deliveryArea}
              <br />
              <button
                className="btn btn-success mt-2"
                onClick={() => handleDelivered(delivery._id)}
              >
                Delivered
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
