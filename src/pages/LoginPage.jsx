import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Pages.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          const decodedToken = jwtDecode(result.data.token);
          const role = decodedToken.role;
          switch (role) {
            case "delivery":
              navigate("/dashboard");
              break;
            case "finance":
              navigate("/finance/home");
              break;
            case "admin":
              navigate("/admin/home");
              break;
            default:
              console.log("Unknown role");
              break;
          }
        } else {
          setError(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again or Contact Admin");
      });
  };
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4">
        <h2 className="card-title text-center mb-4 display-4 cormorant-garamond-semibold ">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 cormorant-garamond-regular lead">
            <label
              htmlFor="email"
              className="form-label cormorant-garamond-regular lead"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johnsabi@xyz.com"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 cormorant-garamond-regular lead">
            <label
              htmlFor="password"
              className="form-label cormorant-garamond-regular lead"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}{" "}
          {/* Display error */}
          <button
            type="submit"
            className="btn btn-primary w-100 cormorant-garamond-regular lead"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3 cormorant-garamond-regular lead">
          No account yet?
        </p>
        <Link
          to="/register"
          className="btn btn-outline-primary w-100 cormorant-garamond-regular lead"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
