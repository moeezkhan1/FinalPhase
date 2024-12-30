/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import React from "react";
import PropTypes from "prop-types";

const ListingCard_S = ({
  orid,
  images,
  title,
  host,
  status,
  price,
  location,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listings/${orid}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      {/* Image Slider */}
      <div className="relative">
        <Slide autoplay={true} arrows={true} indicators>
          {images.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  backgroundImage: `url(${slideImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "250px",
                }}
              ></div>
            </div>
          ))}
        </Slide>
        <span
          className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-medium text-white shadow-lg ${
            status === "Available" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <div className="text-gray-700 space-y-2">
          <p>
            <span className="font-medium text-gray-900">Host:</span> {host}
          </p>
          <p>
            <span className="font-medium text-gray-900">Location:</span>{" "}
            {location}
          </p>
          <p>
            <span className="font-medium text-gray-900">Price:</span>{" "}
            <span className="text-teal-600 font-bold">${price}</span> /day
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
        <p className="text-sm font-light">ORID: {orid}</p>
        <button
          className="px-6 py-2 bg-teal-500 text-sm font-medium rounded-full shadow-md hover:bg-teal-400 transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/bookings/${orid}`);
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// Prop Types Validation
ListingCard_S.propTypes = {
  orid: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};

export default ListingCard_S;
