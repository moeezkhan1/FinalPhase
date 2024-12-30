import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginSignupModal from "./LoginSignupModal";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearch }) => {
  const [showModal, setShowModal] = useState(false); // Show login/signup modal
  const [user, setUser] = useState(null); // Store user info
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  // Fetch user info from the API
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
        // console.log(response);
        if (!response.ok) {
          if (response.status === 401) {
            console.error("Unauthorized: Invalid or missing token");
          } else {
            console.error(`Failed to fetch user info: ${response.status}`);
          }
        } else {
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
  const handleprofile = () => {
    if (user != null) {
      if (user.role === "customer") {
        navigate("/profile");
      } else {
        alert("You must be a customer to view your profile.");
      }
    } else {
      alert("You must be logged in as customer to view your profile.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null);
    navigate("/");
  };

  const showprofilebutton = () => {
    if (user != null) {
      if (user.role === "customer") {
        return (
          <button
            className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            onClick={() => handleprofile()}
          >
            Profile
          </button>
        );
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching
  }

  return (
    <header className="flex flex-col space-y-4 p-6 border-b border-gray-300 bg-gray-50 shadow-md">
      {/* Top Navbar Section */}
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3">
          <img src="./waterbnb.png" alt="Waterbnb Logo" className="h-10" />
          <span className="font-bold text-xl text-gray-900 hover:text-teal-600 transition duration-300">
            Waterbnb
          </span>
        </a>

        {/* Right Action Section */}
        <div className="flex items-center space-x-6 text-gray-700">
          {/* Profile */}
          {showprofilebutton()}
          {user ? (
            // User is logged in
            <div className="relative group">
              {/* Avatar */}
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition duration-200">
                <img
                  src="../public/pfp.png" // Dynamic avatar URL
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-400"
                />
                <span className="hidden md:block font-medium text-gray-900">
                  {user.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-lg shadow-lg hidden group-hover:block">
                <div className="p-4">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
                <hr />
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // User is not logged in
            <div className="flex items-center space-x-4">
              <button
                className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition duration-300 shadow-md"
                onClick={() => setShowModal(true)}
              >
                Login / Sign Up
              </button>
              <div className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition">
                <FaUserCircle size={26} className="text-gray-700" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mt-6">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Login/Signup Modal */}
      {showModal && <LoginSignupModal onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Navbar;
