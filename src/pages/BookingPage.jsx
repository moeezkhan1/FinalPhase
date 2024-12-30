/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import React from "react";
import Navbar from "../components/Navbar_CP";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const { orid } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const [newBooking, setNewBooking] = useState({
    title: "",
    listing: "",
    user: "",
    seller: "",
    CheckIn: "",
    CheckOut: "",
    guests: 1,
    totalPrice: 0,
    status: "Pending",
    createdAt: new Date(),
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/listings/${orid}`
        );
        const data = await response.json();
        setListing(data);
        setNewBooking((prev) => ({
          ...prev,
          listing: data._id,
          seller: data.seller,
        }));
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [orid]);

  const calculateTotalPrice = () => {
    const nights =
      (new Date(newBooking.CheckOut) - new Date(newBooking.CheckIn)) /
      (1000 * 60 * 60 * 24);
    if (nights > 0 && listing) {
      setNewBooking((prev) => ({
        ...prev,
        totalPrice: nights * listing.price,
      }));
    } else {
      setNewBooking((prev) => ({
        ...prev,
        totalPrice: 0,
      }));
    }
  };

  const handleBooking = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        alert("Please log in to book.");
        return;
      }

      const userResponse = await fetch("http://localhost:3001/api/users/me", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const userData = await userResponse.json();

      const bookingDetails = {
        ...newBooking,
        user: userData.id,
        title: listing.title,
      };

      const response = await fetch("http://localhost:3001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        alert("Booking successful!");
        navigate("/profile");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        {listing ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Slider */}
            <div className="relative">
              <Slide>
                {listing.images.map((slideImage, index) => (
                  <div key={index}>
                    <img
                      src={slideImage}
                      alt={`Slide ${index}`}
                      className="w-full h-72 object-cover"
                    />
                  </div>
                ))}
              </Slide>
            </div>

            {/* Booking Content */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Book <span className="text-teal-600">{listing.title}</span>
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                {listing.description || "Experience an unforgettable stay!"}
              </p>

              <div className="space-y-4">
                {/* Check-In */}
                <div className="flex flex-col">
                  <label
                    htmlFor="check-in"
                    className="text-sm font-medium text-gray-700"
                  >
                    Check-In
                  </label>
                  <input
                    id="check-in"
                    type="date"
                    value={newBooking.CheckIn}
                    onChange={(e) => {
                      const CheckIn = e.target.value;
                      if (newBooking.CheckOut < CheckIn) {
                        alert(
                          `Please choose a date before ${newBooking.CheckOut}`
                        );
                        setNewBooking({
                          ...newBooking,
                          CheckIn: newBooking.CheckOut,
                        });
                      } else {
                        setNewBooking({ ...newBooking, CheckIn });
                      }
                      calculateTotalPrice();
                    }}
                    className="mt-2 border rounded-md px-4 py-2"
                  />
                </div>

                {/* Check-Out */}
                <div className="flex flex-col">
                  <label
                    htmlFor="check-out"
                    className="text-sm font-medium text-gray-700"
                  >
                    Check-Out
                  </label>
                  <input
                    id="check-out"
                    type="date"
                    value={newBooking.CheckOut}
                    onChange={(e) => {
                      const CheckOut = e.target.value;
                      if (newBooking.CheckIn > CheckOut) {
                        alert(
                          `Please choose a date after ${newBooking.CheckIn}`
                        );
                        setNewBooking({
                          ...newBooking,
                          CheckOut: newBooking.CheckIn,
                        });
                      } else {
                        setNewBooking({ ...newBooking, CheckOut });
                      }
                      calculateTotalPrice();
                    }}
                    className="mt-2 border rounded-md px-4 py-2"
                  />
                </div>

                {/* Guests */}
                <div className="flex flex-col">
                  <label
                    htmlFor="guests"
                    className="text-sm font-medium text-gray-700"
                  >
                    Guests
                  </label>
                  <input
                    id="guests"
                    type="number"
                    min="1"
                    value={newBooking.guests}
                    onChange={(e) => {
                      const guestInput = Number(e.target.value);
                      if (guestInput > listing.guests) {
                        alert(
                          `The maximum number of guests allowed is ${listing.guests}.`
                        );
                        setNewBooking({
                          ...newBooking,
                          guests: listing.guests,
                        });
                      } else {
                        setNewBooking({ ...newBooking, guests: guestInput });
                      }
                    }}
                    className="mt-2 border rounded-md px-4 py-2"
                  />
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-6">
                <p className="text-lg text-gray-800 font-semibold">
                  Total Price:{" "}
                  <span className="text-teal-600 font-bold">
                    ${newBooking.totalPrice}
                  </span>
                </p>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleBooking}
                className="mt-6 w-full bg-teal-600 text-white font-medium text-lg py-3 rounded-md shadow-md hover:bg-teal-700 transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
