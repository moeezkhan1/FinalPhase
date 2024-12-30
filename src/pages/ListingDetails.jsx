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
        if (!token) {
          //setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3001/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error("Unauthorized: Invalid or missing token");
          } else {
            console.error(`Failed to fetch user info: ${response.status}`);
          }
          return null; // Return null if there's an error
        } else {
          const userData = await response.json();
          //console.log(userData);
          setUser(userData); // Return the fetched user data
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null; // Handle errors gracefully
      } finally {
        //setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);
  const handleBookClick = () => {
    //const userData = fetchUserInfo();
    if (user.role === "Customer") {
      navigate(`/bookings/${orid}`);
    } else {
      alert("You must be a customer to book a listing.");
      // navigate('/login');
    }
  };
  useEffect(() => {
    if (!orid) {
      setError("Invalid listing ORID");
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

  if (error) return <p>{error}</p>;
  if (!listing) return <p>Loading...</p>;

  const bookedButton = () => (
    <button className="w-full py-4 bg-teal-600 text-white text-2xl font-semibold rounded-lg hover:bg-red-700 transition duration-300">
      Booked
    </button>
  );

  const bookButton = () => (
    <button
      onClick={() => handleBookClick()}
      className="w-full py-4 bg-teal-600 text-white text-2xl font-semibold rounded-lg hover:bg-teal-700 transition duration-300"
    >
      Book Now
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
        {/* Image Slider */}
        <div className="slide-container rounded-lg overflow-hidden shadow-md">
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
        <div className="flex justify-between items-center mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {listing.title || "No title available"}
          </h1>
          <span
            className={`ml-3 px-4 py-2 text-sm font-medium text-white rounded-full ${
              listing.status === "Booking open" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {listing.status || "Status not available"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
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
          <div className="space-y-3">
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

        {/* Hosted By */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-900 mb-2">Hosted by:</p>
          <p className="text-lg text-gray-700">
            {listing.host || "No host information available"}
          </p>
        </div>

        {/* Book Button */}
        <div className="mt-10">
          {listing.booked ? (
            <button className="w-full py-3 bg-gray-400 text-white text-lg font-medium rounded-lg cursor-not-allowed">
              Booked
            </button>
          ) : (
            <button
              onClick={() => handleBookClick()}
              className="w-full py-3 bg-teal-600 text-white text-lg font-medium rounded-lg hover:bg-teal-700 transition duration-300"
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
