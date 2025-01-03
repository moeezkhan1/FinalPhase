import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Navbar from "../components/Navbar_CP";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "500px",
};

const ListingDetails = () => {
  const { orid } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
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
          console.error("Failed to fetch user info.");
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

  const handleBookClick = () => {
    if (user && user.role === "Customer") {
      navigate(`/bookings/${orid}`);
    } else {
      alert("You must be logged in as a customer to book this listing.");
    }
  };

  useEffect(() => {
    if (!orid) {
      setError("Invalid listing ORID.");
      return;
    }

    const fetchListing = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/listings/${orid}`
        );
        if (!response.ok) throw new Error("Listing not found");
        const data = await response.json();
        setListing(data);
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError(err.message);
      }
    };

    fetchListing();
  }, [orid]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!listing) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl">
        {/* Image Slider */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <Slide>
            {listing.images.map((slideImage, index) => (
              <div key={index} className="h-80">
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage})`,
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
            ))}
          </Slide>
        </div>

        {/* Listing Details */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">
              {listing.title || "No title available"}
            </h1>
            <span
              className={`ml-3 px-4 py-2 text-sm font-medium text-white rounded-full ${
                listing.status === "Booking open"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {listing.status || "Status not available"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Left Column */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-900">Type:</span>{" "}
                {listing.type || "N/A"}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-900">Guests:</span>{" "}
                {listing.guests || "N/A"}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-900">Bedrooms:</span>{" "}
                {listing.bedrooms || "N/A"}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-900">Bathrooms:</span>{" "}
                {listing.bathrooms || "N/A"}
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-900">
                  Price per night:
                </span>{" "}
                ${listing.price || "N/A"}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-900">Amenities:</span>{" "}
                {listing.amenities
                  ? listing.amenities.join(", ")
                  : "No amenities available"}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-900">Location:</span>{" "}
                {listing.location || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Hosted By */}
        <div className="mt-8">
          <p className="text-lg font-semibold text-gray-900">Hosted by:</p>
          <p className="text-lg text-gray-700">
            {listing.host || "No host information available"}
          </p>
        </div>

        {/* Book Button */}
        <div className="mt-10">
          {listing.booked ? (
            <button className="w-full py-4 bg-gray-400 text-white text-xl font-semibold rounded-lg cursor-not-allowed">
              Booked
            </button>
          ) : (
            <button
              onClick={handleBookClick}
              className="w-full py-4 bg-teal-600 text-white text-xl font-semibold rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
