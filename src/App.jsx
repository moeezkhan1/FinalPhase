import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import ListingDetails from "./pages/ListingDetails";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import SellerPage from "./pages/SellerPage";

import CustomerProfile from "./pages/CustomerProfile";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings/:orid" element={<ListingDetails />} />
        <Route path="/bookings/:orid" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/profile" element={<CustomerProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
