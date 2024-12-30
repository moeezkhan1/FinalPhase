//Bookings Schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    user: { type: String, required: true},
    seller: { type: String, required: true},
    CheckIn: { type: Date, required: true },
    CheckOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
  });
  
  // Ensure the Booking model is only created once
  module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);