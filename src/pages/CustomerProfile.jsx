import Navbar from "../components/Navbar_CP";
// eslint-disable-next-line no-unused-vars
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const CustomerProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);
        fetchBookings(data.id);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/bookings/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      }
    };

    fetchUserData();
  }, []);

  const handleCancelBooking = async (bookingId, listingId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3001/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await fetch(`http://localhost:3001/api/listings/id/${listingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booked: false, status: "Booking open" }),
      });
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );
      alert("Booking canceled successfully!");
    } catch (err) {
      console.error("Error canceling booking:", err);
      alert("Failed to cancel the booking. Please try again.");
    }
  };

  const handleEditBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const { _id, CheckIn, CheckOut } = editingBooking;
      const response = await fetch(
        `http://localhost:3001/api/bookings/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ CheckIn, CheckOut }),
        }
      );

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === _id ? { ...updatedBooking } : booking
          )
        );
        setEditingBooking(null);
        alert("Booking updated successfully!");
      } else {
        alert("Failed to update booking. Please try again.");
      }
    } catch (err) {
      console.error("Error editing booking:", err);
    }
  };

  const BookingCard = ({ booking }) => (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-gray-50">
      <p className="text-gray-700">
        <strong>Listing:</strong> {booking.title}
      </p>
      <p className="text-gray-700">
        <strong>Check-In:</strong>{" "}
        {new Date(booking.CheckIn).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        <strong>Check-Out:</strong>{" "}
        {new Date(booking.CheckOut).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        <strong>Total Price:</strong> ${booking.totalPrice}
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleCancelBooking(booking._id, booking.listing)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => setEditingBooking(booking)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-cyan-600  to-teal-600 ">
      <Navbar />
      <div className=" container mx-auto my-10 px-6">
        <h1 className="text-3xl font-bold text-teal-600 text-center mb-8">
          Customer Profile
        </h1>
        {user && (
          <div className="bg-white shadow p-6 rounded-lg mb-10 items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Profile Details
            </h2>
            <p className="text-gray-600">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Bookings
          </h2>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <p className="text-center text-gray-600">No bookings found.</p>
          )}
          {editingBooking && (
            <div className="bg-gray-50 p-6 rounded-lg shadow mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Edit Booking
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Check-In:
                </label>
                <input
                  type="date"
                  value={editingBooking.CheckIn}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      CheckIn: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Check-Out:
                </label>
                <input
                  type="date"
                  value={editingBooking.CheckOut}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      CheckOut: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleEditBooking}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
