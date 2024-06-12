import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/delivery/HomePage";
import DashboardPage from "../pages/delivery/DashboardPage";
import ProfilePage from "../pages/delivery/ProfilePage";
import UploadReceiptsPage from "../pages/delivery/UploadReceiptsPage";
import PrivateRoute from "../components/PrivateRoute";
import DashboardPagef from "../pages/finance/DashboardPagef";
import UploadReceiptsPagef from "../pages/finance/UploadReceiptsPagef";
import HomePagef from "../pages/finance/HomePagef";
import ProfilePagef from "../pages/finance/ProfilePagef";
import DashboardPagea from "../pages/admin/DashboardPagea";
import ProfilePagea from "../pages/admin/ProfilePagea";
import UploadReceiptsPagea from "../pages/admin/UploadReceiptsPagea";
import HomePagea from "../pages/admin/HomePagea";
import Usersa from "../pages/admin/Users";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Delivery Routes */}
      <Route
        path="/dashboard"
        element={<PrivateRoute element={DashboardPage} role="delivery" />}
      />
      <Route
        path="/profile"
        element={<PrivateRoute element={ProfilePage} role="delivery" />}
      />
      <Route
        path="/home"
        element={<PrivateRoute element={HomePage} role="delivery" />}
      />
      <Route
        path="/upload-receipts"
        element={<PrivateRoute element={UploadReceiptsPage} role="delivery" />}
      />
      {/* Finance Routes */}
      <Route
        path="/finance/dashboard"
        element={<PrivateRoute element={DashboardPagef} role="finance" />}
      />
      <Route
        path="/finance/profile"
        element={<PrivateRoute element={ProfilePagef} role="finance" />}
      />
      <Route
        path="/finance/upload-receipts"
        element={<PrivateRoute element={UploadReceiptsPagef} role="finance" />}
      />
      <Route
        path="/finance/home"
        element={<PrivateRoute element={HomePagef} role="finance" />}
      />
      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={<PrivateRoute element={DashboardPagea} role="admin" />}
      />
      <Route
        path="/admin/profile"
        element={<PrivateRoute element={ProfilePagea} role="admin" />}
      />
      <Route
        path="/admin/upload-receipts"
        element={<PrivateRoute element={UploadReceiptsPagea} role="admin" />}
      />
      <Route
        path="/admin/home"
        element={<PrivateRoute element={HomePagea} role="admin" />}
      />
      <Route
        path="/admin/usersa"
        element={<PrivateRoute element={Usersa} role="admin" />}
      />
    </Routes>
  </Router>
);

export default AppRouter;
