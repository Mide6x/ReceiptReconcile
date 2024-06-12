import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/delivery/HomePage";
import DashboardPage from "../pages/delivery/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import UploadReceiptsPage from "../pages/delivery/UploadReceiptsPage";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={DashboardPage} role="delivery" />}
      />
      <Route
        path="/profile"
        element={<PrivateRoute element={ProfilePage} role="delivery" />}
      />
      <Route
        path="/upload-receipts"
        element={<PrivateRoute element={UploadReceiptsPage} role="delivery" />}
      />
    </Routes>
  </Router>
);

export default AppRouter;
