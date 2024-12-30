import { useEffect, useState } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import Categories from "./Categories";
import ListingCard from "./ListingCard";

const socket = io("http://localhost:3001");

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (searchActive) return;

    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/listings");
        const data = await response.json();
        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };

    fetchListings();

    socket.on("listingUpdated", (updatedListings) => {
      if (!searchActive) setListings(updatedListings);
    });

    return () => socket.off("listingUpdated");
  }, [searchActive]);

  const handleSearch = (searchResults) => {
    setListings(searchResults);
    setSearchActive(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchActive(false); // Reset search when filtering by category
  };

  const filteredListings = selectedCategory
    ? listings.filter((listing) => listing.amenities.includes(selectedCategory))
    : listings;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onSearch={handleSearch} />
      <Categories onCategorySelect={handleCategorySelect} />

      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Explore Our Listings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard
                key={listing.orid}
                orid={listing.orid}
                images={listing.images}
                title={listing.title}
                host={listing.host}
                status={listing.status}
                price={listing.price}
                location={listing.location}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No listings found. Please try a different category or search term.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
