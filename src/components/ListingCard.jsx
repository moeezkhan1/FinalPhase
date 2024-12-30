import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "250px",
  borderRadius: "0.5rem",
};

const ListingCard = ({
  orid,
  images,
  title,
  host,
  status,
  price,
  location,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:3001/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error(`Failed to fetch user info: ${response.status}`);
          return;
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleCardClick = () => {
    navigate(`/listings/${orid}`);
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    if (user) {
      if (user.role === "customer") {
        navigate(`/bookings/${orid}`);
      } else {
        alert("You must be a customer to book a listing.");
        navigate("/login");
      }
    } else {
      alert("You must be logged in to book a listing.");
      navigate("/login");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      {/* Image Slider */}
      <div className="relative group">
        <Slide autoplay={false} indicators>
          {images.map((slideImage, index) => (
            <div key={index} className="h-64">
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-semibold text-white ${
            status === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Host:</span> {host}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Location:</span> {location}
        </p>
        <p className="text-lg font-bold text-teal-500 mb-4">${price} / day</p>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
        <p className="text-xs text-gray-500">ORID: {orid}</p>
        <button
          className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition duration-300"
          onClick={handleBookClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

ListingCard.propTypes = {
  orid: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};

export default ListingCard;
