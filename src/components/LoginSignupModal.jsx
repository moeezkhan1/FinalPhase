import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation

const LoginSignupModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleRedirect = (action) => {
    if (action === "login") {
      navigate("/login");
    } else if (action === "signup") {
      navigate("/signup");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Waterbnb
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Please log in or sign up to enjoy the full experience.
        </p>
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => handleRedirect("login")}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => handleRedirect("signup")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Sign Up
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

// Add PropTypes for validation
LoginSignupModal.propTypes = {
  onClose: PropTypes.func.isRequired, // 'onClose' should be a function and is required
};

export default LoginSignupModal;
