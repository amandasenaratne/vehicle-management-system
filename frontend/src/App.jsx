import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import CustomerProtectedRoute from "./routes/CustomerProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import BookingsPage from "./pages/admin/BookingsPage.jsx";
import ServicesPage from "./pages/admin/ServicesPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CustomerAuthPage from "./pages/customer/CustomerAuthPage.jsx";
import CustomerPortalPage from "./pages/customer/CustomerPortalPage.jsx";
import TrackBookingPage from "./pages/customer/TrackBookingPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/track-booking" element={<TrackBookingPage />} />
      <Route path="/customer/auth" element={<CustomerAuthPage />} />
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Protected Customer routes */}
      <Route element={<CustomerProtectedRoute />}>
        <Route path="/customer/portal" element={<CustomerPortalPage />} />
      </Route>

      {/* Protected Admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/bookings" element={<BookingsPage />} />
        <Route path="/admin/services" element={<ServicesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
