import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const LoginSignupModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // useNavigate hook for page redirection

  // Redirect to Login or Sign Up page when a button is clicked
  const handleRedirect = (action) => {
    if (action === "login") {
      navigate("/login"); // Redirect to the login page
    } else if (action === "signup") {
      navigate("/signup"); // Redirect to the signup page
    }
    onClose(); // Close the modal when a button is clicked
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login / Sign Up
        </h2>
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition duration-300"
          >
            Login / Sign Up
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-300"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
