import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import BookingsPage from "./pages/admin/BookingsPage.jsx";
import ServicesPage from "./pages/admin/ServicesPage.jsx";
import BookingPage from "./pages/customer/BookingPage.jsx";
import ConfirmationPage from "./pages/customer/ConfirmationPage.jsx";
import TrackBookingPage from "./pages/customer/TrackBookingPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<BookingPage />} />
      <Route path="/track-booking" element={<TrackBookingPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/admin/login" element={<LoginPage />} />

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
