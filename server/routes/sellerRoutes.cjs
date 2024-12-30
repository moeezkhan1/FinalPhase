const express = require("express");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authMiddleware.cjs");
const ListingService = require("../service/ListingService.cjs");
const router = express.Router();
const BookingService = require("../service/BookingService.cjs");
router.post(
  "/listings",
  authenticateUser,
  authorizeRoles("seller"),
  async (req, res) => {
    const sellerId = req.user.id;
    try {
      const listings = await ListingService.getListingsBySeller(sellerId);
      return res.status(200).json(listings);
    } catch (error) {
      console.error("⁠Error fetching listings for seller ${sellerId}:", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch listings. Please try again later." });
    }
  }
);
/**
 * Route: GET /listings
 * Description: Get all listings for the authenticated seller.
 */
router.get(
  "/bookings",
  authenticateUser,
  authorizeRoles("seller"),
  async (req, res) => {
    const sellerId = req.user.id;

    try {
      const bookings = await BookingService.getBookingsBySeller(sellerId);
      //console.log(listings);
      if (!bookings.length) {
        return res
          .status(404)
          .json({ message: "No bookings found for this seller." });
      }

      return res.status(200).json(bookings);
    } catch (error) {
      console.error(`Error fetching bookings for seller ${sellerId}:`, error);
      return res
        .status(500)
        .json({ message: "Failed to fetch bookings. Please try again later." });
    }
  }
);

router.get(
  "/listings",
  authenticateUser,
  authorizeRoles("seller"),
  async (req, res) => {
    const sellerId = req.user.id;

    try {
      const listings = await ListingService.getListingsBySeller(sellerId);
      //console.log(listings);
      if (!listings.length) {
        return res
          .status(404)
          .json({ message: "No listings found for this seller." });
      }

      return res.status(200).json(listings);
    } catch (error) {
      console.error(`Error fetching listings for seller ${sellerId}:`, error);
      return res
        .status(500)
        .json({ message: "Failed to fetch listings. Please try again later." });
    }
  }
);

/**
 * Route: DELETE /listings/:id
 * Description: Delete a specific listing by ID for the authenticated seller.
 */
router.delete(
  "/listings/:id",
  authenticateUser,
  authorizeRoles("seller"),
  async (req, res) => {
    const { id: listingId } = req.params;
    const sellerId = req.user.id;

    try {
      const deletedListing = await ListingService.deleteListingById(
        listingId,
        sellerId
      );

      if (!deletedListing) {
        return res
          .status(404)
          .json({ message: "Listing not found or unauthorized action." });
      }

      return res.status(200).json({ message: "Listing deleted successfully." });
    } catch (error) {
      console.error(
        `Error deleting listing ID ${listingId} for seller ${sellerId}:`,
        error
      );
      return res
        .status(500)
        .json({ message: "Failed to delete listing. Please try again later." });
    }
  }
);

module.exports = router;
