import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setProfile] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adminRole, setadminRole] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const adminRoles = ["Finance Admin", "Delivery Admin"];

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
        setadminRole(response.data.adminRole || "");
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
        { phoneNumber, adminRole, homeAddress },
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
      setProfile(response.data); // Assuming response.data contains updated profile information including profilePicture
    } catch (err) {
      console.error("Error updating profile picture:", err.response || err);
      setError("An error occurred while updating the profile picture.");
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
        <h2 className="display-4 cormorant-garamond-semibold mb-3">Profile</h2>
        <p className="lead cormorant-garamond-regular">
          This is your profile page where you can manage your personal
          information and delivery details.
        </p>
        {error && (
          <div className="alert alert-danger lead cormorant-garamond-regular">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success lead cormorant-garamond-regular">
            {success}
          </div>
        )}
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label
              htmlFor="profilePicture"
              className="lead cormorant-garamond-semibold"
            >
              Profile Picture
            </label>
            <div className="mt-3"></div>
            {profile.profilePicture && (
              <div>
                <img
                  src={`http://localhost:5173/uploads/${profile.profilePicture}`}
                  alt="Profile Picture"
                  className="img-thumbnail"
                  style={{ maxWidth: "150px", height: "150px" }}
                />
              </div>
            )}
            <input
              type="file"
              className="form-control-file mt-3 lead cormorant-garamond-regular"
              id="profilePicture"
              onChange={handleFileChange}
            />
            <div className="mt-4"></div>
            <button
              type="button"
              className="btn btn-primary mt-1 lead cormorant-garamond-regular"
              onClick={handlePictureUpdate}
            >
              Update Profile Picture
            </button>
          </div>

          <div className="form-group mt-4 lead cormorant-garamond-regular">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={profile.name || ""}
              readOnly
            />
          </div>
          <div className="form-group mt-2 lead cormorant-garamond-regular">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={profile.email || ""}
              readOnly
            />
          </div>
          <div className="form-group mt-2 lead cormorant-garamond-regular">
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
          <div className="form-group mt-2 lead cormorant-garamond-regular">
            <label htmlFor="adminRole">Admin Role</label>
            <select
              className="form-control"
              id="adminRole"
              value={adminRole}
              onChange={(e) => setadminRole(e.target.value)}
            >
              <option value="">Select Admin Role</option>
              {adminRoles.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2 lead cormorant-garamond-regular">
            <label htmlFor="homeAddress">Home Address</label>
            <input
              type="text"
              className="form-control"
              id="homeAddress"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 lead cormorant-garamond-regular"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
