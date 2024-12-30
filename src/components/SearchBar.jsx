import { useState } from "react";
import { FaSearch, FaRedo } from "react-icons/fa"; // Import FaRedo
import PropTypes from "prop-types"; // For prop validation
import axios from "axios";

const SearchBar = ({ onSearch, onReset }) => {
  const [mode, setMode] = useState("Stays"); // 'Stays' or 'Experiences'
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = async () => {
    const params = {};

    if (mode) params.type = mode;
    if (location) params.location = location.trim();
    if (guests) params.guests = guests.trim();

    if (mode === "Stays") {
      if (checkIn) params.checkIn = checkIn.trim();
      if (checkOut) params.checkOut = checkOut.trim();
    } else if (mode === "Experiences") {
      if (date) params.date = date.trim();
    }

    try {
      const response = await axios.get("http://localhost:3001/api/listings", {
        params,
      });
      if (onSearch) onSearch(response.data);
    } catch (error) {
      console.error(
        "Error fetching filtered listings:",
        error.response?.data || error.message
      );
    }
  };

  const handleReset = () => {
    setMode("Stays");
    setLocation("");
    setGuests("");
    setCheckIn("");
    setCheckOut("");
    setDate("");
    if (onReset) onReset();
  };

  return (
    <div className="search-bar-container mx-auto p-6 bg-gradient-to-r from-teal-300 via-blue-300 to-gray-100 rounded-xl shadow-lg">
      <div className="search-bar-mode-toggle flex justify-center mb-6">
        <button
          onClick={() => setMode("Stays")}
          className={`mode-toggle-button px-6 py-2 rounded-l-full ${
            mode === "Stays" ? "active-mode" : "inactive-mode"
          }`}
        >
          Stays
        </button>
        <button
          onClick={() => setMode("Experiences")}
          className={`mode-toggle-button px-6 py-2 rounded-r-full ${
            mode === "Experiences" ? "active-mode" : "inactive-mode"
          }`}
        >
          Experiences
        </button>
      </div>

      <div className="search-bar-form flex flex-wrap items-center bg-white p-4 rounded-lg shadow-sm gap-4">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-input"
        />
        {mode === "Stays" ? (
          <>
            <input
              type="date"
              value={checkIn}
              placeholder="Check-in"
              onChange={(e) => setCheckIn(e.target.value)}
              className="form-input"
            />
            <input
              type="date"
              value={checkOut}
              placeholder="Check-out"
              onChange={(e) => setCheckOut(e.target.value)}
              className="form-input"
            />
          </>
        ) : (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
          />
        )}
        <input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="form-input"
        />
        <button onClick={handleSearch} className="search-button">
          <FaSearch className="text-xl" />
        </button>
        <button onClick={handleReset} className="reset-button">
          <FaRedo className="text-xl" />
        </button>
      </div>
    </div>
  );
};

// Add prop-types validation
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Required function prop
  onReset: PropTypes.func.isRequired, // Required function prop
};

export default SearchBar;
