import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoginSignupModal from "./LoginSignupModal";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearch }) => {
  const [showModal, setShowModal] = useState(false); // Show login/signup modal
  const [user, setUser] = useState(null); // Store user info
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3001/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null);
    navigate("/");
  };

  const handleProfile = () => {
    if (user?.role === "customer") {
      navigate("/profile");
    } else {
      alert("You must be a customer to view your profile.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <header className="flex flex-col bg-gradient-to-b from-cyan-300  to-white-100 space-y-6 p-6 shadow-md">
      <div className="flex justify-between items-center">
        <a href="/" className="flex items-center space-x-3">
          <img src="./waterbnb.png" alt="Waterbnb Logo" className="h-12" />
          <span className="font-bold text-2xl text-teal-600 hover:text-teal-700">
            Airbnb
          </span>
        </a>

        <div className="flex items-center space-x-6">
          {user?.role === "customer" && (
            <button
              className="px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-blue-600"
              onClick={handleProfile}
            >
              Profile
            </button>
          )}
          {user ? (
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                <img
                  src="../public/pfp.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border"
                />
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block">
                <div className="p-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg"
              onClick={() => setShowModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>

      <SearchBar onSearch={onSearch} />
      {showModal && <LoginSignupModal onClose={() => setShowModal(false)} />}
    </header>
  );
};

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;
