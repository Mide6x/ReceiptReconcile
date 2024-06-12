import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import UploadReceiptsPage from "../pages/UploadReceiptsPage";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute component={DashboardPage} />}
      />
      <Route
        path="/profile"
        element={<PrivateRoute component={ProfilePage} />}
      />
      <Route
        path="/upload-receipts"
        element={<PrivateRoute component={UploadReceiptsPage} />}
      />
    </Routes>
  </Router>
);

export default AppRouter;
