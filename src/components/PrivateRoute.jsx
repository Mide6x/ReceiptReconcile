import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check authentication

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
