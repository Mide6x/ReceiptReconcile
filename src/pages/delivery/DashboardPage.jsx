import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "./Sidebar/Sidebar.css";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [uploadedReceipts, setUploadedReceipts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [ordersCompletedLast24Hrs, setOrdersCompletedLast24Hrs] = useState(0);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch completed orders by the logged-in user
        const completedOrdersResponse = await axios.get(
          "http://localhost:3001/orders-completed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompletedOrders(completedOrdersResponse.data.completedOrders);
        setUploadedReceipts(completedOrdersResponse.data.uploadedReceipts);

        // Fetch total orders in the last 24 hours
        const totalOrdersResponse = await axios.get(
          "http://localhost:3001/orders-total-last-24h",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalOrders(totalOrdersResponse.data.totalOrdersLast24Hrs);

        // Fetch orders completed by the logged-in user in the last 24 hours
        const ordersCompletedLast24HrsResponse = await axios.get(
          "http://localhost:3001/orders-completed-last-24h",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrdersCompletedLast24Hrs(
          ordersCompletedLast24HrsResponse.data.ordersCompletedLast24Hrs
        );
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        navigate("/login"); // Redirect to login on error
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const chartData = {
    labels: ["Completed Orders", "Uploaded Receipts"],
    datasets: [
      {
        label: "Delivery Person Activity",
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        hoverBorderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        data: [completedOrders, uploadedReceipts],
      },
    ],
  };

  const pieChartData = {
    labels: ["Total Orders", "Completed Orders"],
    datasets: [
      {
        label: "Orders Summary",
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        hoverBorderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        data: [totalOrders, ordersCompletedLast24Hrs],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
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

        <div className="mt-4">
          <h2 className="display-6 cormorant-garamond-medium">
            Delivery Person Activity Overview
          </h2>
          <div
            className="chart-container"
            style={{ position: "relative", height: "40vh", width: "80vw" }}
          >
            <Bar data={chartData} options={options} />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="display-6 cormorant-garamond-medium">
            Orders Summary in Last 24 Hours
          </h2>
          <div
            className="chart-container"
            style={{ height: "40vh", width: "80vw" }}
          >
            <Pie data={pieChartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
