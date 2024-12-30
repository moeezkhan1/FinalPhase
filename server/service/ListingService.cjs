const Listing = require('../models/Listing.cjs');
const mongoose = require('mongoose');
const getListingsBySeller = async (sellerId) => {
  try {
   
    //console.log(Listing);
    const listings = await Listing.find({ seller: sellerId });
   //console.log(listings);
    return listings;
  } catch (error) {
    console.error(`Error fetching listings for seller ID ${sellerId}:`, error);
    throw new Error('Failed to fetch listings. Please try again later.');
  }
};


const deleteListingById = async (listingId, sellerId) => {
  try {
    const listing = await Listing.findOneAndDelete({ _id: listingId, seller: sellerId });
    if (!listing) {
      throw new Error('Listing not found or unauthorized action.');
    }
    return { message: 'Listing deleted successfully' };
  } catch (error) {
    console.error(`Error deleting listing ID ${listingId} for seller ID ${sellerId}:`, error);
    throw new Error(error.message || 'Failed to delete listing. Please try again later.');
  }
};
const deleteListingById_a = async (listingId) => {
    try {
      const listing = await Listing.findOneAndDelete({ _id: listingId });
      if (!listing) {
        throw new Error('Listing not found or unauthorized action.');
      }
      return { message: 'Listing deleted successfully' };
    } catch (error) {
      console.error(`Error deleting listing ID ${listingId} for seller ID ${sellerId}:`, error);
      throw new Error(error.message || 'Failed to delete listing. Please try again later.');
    }
  };

module.exports = {
  getListingsBySeller,
  deleteListingById, 
  deleteListingById_a
};
