import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";
import axios from "axios";

const HomePagea = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deliveryArea, setDeliveryArea] = useState("");
  const [storeName, setStoreName] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [acceptedNotifications, setAcceptedNotifications] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchAcceptedNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:3001/notifications/accepted",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAcceptedNotifications(response.data.notifications);
    } catch (err) {
      console.error(
        "Error fetching accepted notifications:",
        err.response || err
      );
      setError("Failed to fetch notifications.");
    }
  };

  useEffect(() => {
    fetchAcceptedNotifications();
  }, [navigate]); // Refresh notifications list on navigate change

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/notifications",
        { deliveryArea, storeName, sellerContact, item, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Notification created successfully!");
      setError("");
      // Clear the form
      setDeliveryArea("");
      setStoreName("");
      setSellerContact("");
      setItem("");
      setQuantity("");
      // Refresh notifications list after successful creation
      fetchAcceptedNotifications();
    } catch (err) {
      console.error("Error creating notification:", err.response || err);
      setError("An error occurred while creating the notification.");
      setSuccess("");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="jumbotron">
          <h1 className="display-4 cormorant-garamond-semibold">
            Welcome to ReceiptReconcile!
          </h1>
          <p className="lead cormorant-garamond-regular">
            Manage and upload your receipts effortlessly.
          </p>
          <hr className="my-4" />
          <p className="lead cormorant-garamond-regular">
            Navigate through your Admin profile, dashboard, and receipt uploads
            using the sidebar.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="display-6 cormorant-garamond-medium">
            Create a Notification
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3 lead cormorant-garamond-regular">
              <label htmlFor="deliveryArea">Delivery Area</label>
              <select
                className="form-control mt-2"
                id="deliveryArea"
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                required
              >
                <option value="">Select Delivery Area</option>
                <option value="Oshodi">Oshodi</option>
                <option value="Ifako-Ijaye">Ifako-Ijaye</option>
                <option value="Mushin">Mushin</option>
                <option value="Lekki">Lekki</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Alimosho">Alimosho</option>
                <option value="Kosofe">Kosofe</option>
                <option value="Ajah">Ajah</option>
              </select>
            </div>
            <div className="form-group mt-3 lead cormorant-garamond-regular">
              <label htmlFor="storeName">Store Name</label>
              <input
                type="text"
                className="form-control mt-2"
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3 lead cormorant-garamond-regular">
              <label htmlFor="sellerContact">Seller Contact</label>
              <input
                type="text"
                className="form-control mt-2"
                id="sellerContact"
                value={sellerContact}
                onChange={(e) => setSellerContact(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3 lead cormorant-garamond-regular">
              <label htmlFor="item">Item to be Picked Up</label>
              <input
                type="text"
                className="form-control mt-2"
                id="item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3 lead cormorant-garamond-regular">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control mt-2"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger mt-3 lead cormorant-garamond-regular">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success mt-3 lead cormorant-garamond-regular">
                {success}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary mt-4 lead cormorant-garamond-regular"
            >
              Create Notification
            </button>
          </form>
        </div>

        <hr className="my-4" />
        <div className="mt-4">
          <h2 className="display-6 cormorant-garamond-medium">
            Notification Details
          </h2>
          <div className="card mt-3 lead cormorant-garamond-regular">
            <div className="card-header">Accepted Notifications</div>
            <ul className="list-group list-group-flush">
              {acceptedNotifications.length === 0 ? (
                <li className="list-group-item">No accepted notifications.</li>
              ) : (
                acceptedNotifications.map((notification) => (
                  <li className="list-group-item" key={notification._id}>
                    <strong>Delivery Person:</strong>{" "}
                    {notification.acceptedBy
                      ? notification.acceptedBy.email
                      : "N/A"}{" "}
                    {notification.acceptedBy
                      ? notification.acceptedBy.phoneNumber
                      : "N/A"}
                    <br />
                    <strong>Delivery Status:</strong>{" "}
                    {notification.deliveredAt ? "Delivered" : "Pending"}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePagea;
