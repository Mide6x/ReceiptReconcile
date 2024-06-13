import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const deliveryAreas = [
    "Oshodi",
    "Ifako-Ijaye",
    "Mushin",
    "Lekki",
    "Ikeja",
    "Alimosho",
    "Kosofe",
    "Ajah",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setPhoneNumber(response.data.phoneNumber || "");
        setDeliveryArea(response.data.deliveryArea || "");
        setHomeAddress(response.data.homeAddress || "");
      } catch (err) {
        console.error("Error fetching profile:", err.response || err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3001/profile",
        { phoneNumber, deliveryArea, homeAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Profile updated successfully!");
      setError("");
      setProfile(response.data);
    } catch (err) {
      console.error("Error updating profile:", err.response || err);
      setError("An error occurred while updating the profile.");
      setSuccess("");
    }
  };

  const handlePictureUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Profile picture updated successfully!");
      setError("");
      setProfile(response.data);
    } catch (err) {
      console.error("Error updating profile picture:", err.response || err);
      setError("An error occurred while updating the profile picture.");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
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
              <Link className="nav-link" to="/dashboard">
                Dashboard
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
        <h2>Profile</h2>
        <p>
          This is your profile page where you can manage your personal
          information and delivery details.
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <div className="mt-3"></div>
            {profile.profilePicture && (
              <div>
                <img
                  src={`http://localhost:3001/${profile.profilePicture}`}
                  alt="Profile"
                  className="img-thumbnail"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
              </div>
            )}
            <input
              type="file"
              className="form-control-file mt-3"
              id="profilePicture"
              onChange={handleFileChange}
            />
            <div className="mt-4"></div>
            <button
              type="button"
              className="btn btn-primary mt-1"
              onClick={handlePictureUpdate}
            >
              Update Profile Picture
            </button>
          </div>

          <div className="form-group mt-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={profile.name || ""}
              readOnly
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={profile.email || ""}
              readOnly
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={profile.phoneNumberUpdated}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="deliveryArea">Delivery Area</label>
            <select
              className="form-control"
              id="deliveryArea"
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
            >
              <option value="">Select Delivery Area</option>
              {deliveryAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="homeAddress">Home Address</label>
            <input
              type="text"
              className="form-control"
              id="homeAddress"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
