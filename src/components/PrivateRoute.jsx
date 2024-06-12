import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode"; // Updated import

const PrivateRoute = ({ element: Element, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token); // Updated function name
    const userRole = decodedToken.role;

    if (userRole === role) {
      return <Element />;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
  }
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  role: PropTypes.string.isRequired,
};

export default PrivateRoute;
