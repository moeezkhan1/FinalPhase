import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import React from "react";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "250px",
};

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

  const handleBookClick = (e) => {
    e.stopPropagation();
    navigate(`/bookings/${orid}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-300 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      {/* Image Slider */}
      <div
        className="slide-container rounded-lg overflow-hidden mb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Slide>
          {images.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage})`,
                  borderRadius: "0.5rem",
                }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>

      {/* Listing Details */}
      <h3 className="font-semibold text-xl text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">Hosted by {host}</p>
      <p className="text-sm text-gray-600 mb-1">{location}</p>
      <p className="text-lg font-bold text-teal-600">${price} /day</p>
    </div>
  );
};

export default ListingCard_S;
