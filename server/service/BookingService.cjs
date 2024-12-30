const Booking = require('../models/Booking.cjs');
const mongoose = require('mongoose');
const getBookingsBySeller = async (sellerId) => {
  try {
   
    //console.log(Booking);
    const bookings = await Booking.find({ seller: sellerId });
   //console.log(bookings);
    return bookings;
  } catch (error) {
    console.error(`Error fetching bookings for seller ID ${sellerId}:`, error);
    throw new Error('Failed to fetch bookings. Please try again later.');
  }
};


const deleteBookingById = async (bookingId, sellerId) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: bookingId, seller: sellerId });
    if (!booking) {
      throw new Error('Booking not found or unauthorized action.');
    }
    return { message: 'Booking deleted successfully' };
  } catch (error) {
    console.error(`Error deleting booking ID ${bookingId} for seller ID ${sellerId}:`, error);
    throw new Error(error.message || 'Failed to delete booking. Please try again later.');
  }
};
const deleteBookingById_a = async (bookingId) => {
    try {
      const booking = await Booking.findOneAndDelete({ _id: bookingId });
      if (!booking) {
        throw new Error('Booking not found or unauthorized action.');
      }
      return { message: 'Booking deleted successfully' };
    } catch (error) {
      console.error(`Error deleting booking ID ${bookingId} for seller ID ${sellerId}:`, error);
      throw new Error(error.message || 'Failed to delete booking. Please try again later.');
    }
  };

module.exports = {
  getBookingsBySeller,
  deleteBookingById, 
  deleteBookingById_a
};
