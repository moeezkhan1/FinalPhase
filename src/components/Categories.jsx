import {
  FaHome,
  FaCity,
  FaMountain,
  FaUmbrellaBeach,
  FaBed,
  FaSnowflake,
  FaTree,
  FaFireAlt,
  FaBacteria,
} from "react-icons/fa";
import {
  FaHouse,
  FaHouseChimney,
  FaHouseChimneyWindow,
  FaHouseSignal,
  FaWifi,
} from "react-icons/fa6";
import React from "react";
import PropTypes from "prop-types"; // For prop validation

const categories = [
  { name: "Icons", icon: <FaHome /> },
  { name: "Rooms", icon: <FaBed /> },
  { name: "Top Cities", icon: <FaCity /> },
  { name: "Amazing Views", icon: <FaMountain /> },
  { name: "Beach", icon: <FaUmbrellaBeach /> },
  { name: "Arctic", icon: <FaSnowflake /> },
  { name: "Cabins", icon: <FaTree /> },
  { name: "Trending", icon: <FaFireAlt /> },
  { name: "Castle", icon: <FaHouseChimneyWindow /> },
  { name: "Covid-19", icon: <FaBacteria /> },
  { name: "House", icon: <FaHouse /> },
  { name: "House Chimney", icon: <FaHouseChimney /> },
  { name: "House Signal", icon: <FaHouseSignal /> },
  { name: "Wifi", icon: <FaWifi /> },
];

const Categories = ({ onCategorySelect }) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-6 p-4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-xl shadow-lg">
      {categories.map((category, index) => (
        <button
          key={index}
          className="flex flex-col items-center justify-center w-28 h-28 bg-white shadow-md rounded-full p-4 hover:shadow-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => onCategorySelect(category.name)} // Notify parent on selection
        >
          <span className="text-3xl text-blue-500">{category.icon}</span>
          <span className="text-sm text-gray-700 font-medium">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};

// Add prop validation
Categories.propTypes = {
  onCategorySelect: PropTypes.func.isRequired, // Required function prop
};

export default Categories;
