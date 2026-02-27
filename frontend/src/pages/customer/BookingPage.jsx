import { useNavigate } from "react-router-dom";
import BookingForm from "../../components/bookings/BookingForm.jsx";
import toast from "react-hot-toast";

export default function BookingPage() {
  const navigate = useNavigate();

  const handleSuccess = (booking) => {
    toast.success("Booking submitted successfully!");
    navigate("/confirmation", { state: { booking } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚗</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AutoService Center
              </h1>
              <p className="text-xs text-gray-500">
                Professional Vehicle Services
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/track-booking"
              className="text-sm text-gray-600 hover:underline font-medium"
            >
              Track Booking
            </a>
            <a
              href="/admin/login"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Admin Login →
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Book a Service Appointment
          </h2>
          <p className="text-gray-600 mt-2">
            Fill out the form below and we'll confirm your appointment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <BookingForm onSuccess={handleSuccess} />
        </div>
      </main>
    </div>
  );
}
