import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Pages.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("delivery");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password, role })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4">
        <h2 className="card-title text-center mb-4 display-4 cormorant-garamond-semibold">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label cormorant-garamond-regular"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Type in your firstname, and lastname"
              className="form-control cormorant-garamond-regular"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label cormorant-garamond-regular"
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
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label cormorant-garamond-regular"
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
          <div className="mb-3">
            <label
              htmlFor="role"
              className="form-label cormorant-garamond-regular"
            >
              Role
            </label>
            <select
              id="role"
              className="form-select cormorant-garamond-regular"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="delivery">Delivery</option>
              <option value="finance">Finance</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 cormorant-garamond-regular"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-3 cormorant-garamond-regular">
          Already have an account?
        </p>
        <Link
          to="/login"
          className="btn btn-outline-primary w-100 cormorant-garamond-regular"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
