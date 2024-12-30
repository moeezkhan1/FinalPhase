const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  images: { type: [String], default: [] },
  orid: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  amenities: { type: [String], default: [] },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  title: { type: String, required: true },
  host: { type: String, required: true },
  status: { type: String, default: 'Booking open' },
  price: { type: Number, required: true },
  booked: { type: Boolean, default: false },
  location: { type: String, required: true },
  seller: { type: String,  required: true },
}, { timestamps: true });

// Ensure the Listing model is only created once
module.exports = mongoose.models.Listing || mongoose.model('Listing', listingSchema);
