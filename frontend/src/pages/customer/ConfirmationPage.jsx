import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  if (!booking) {
    navigate("/");
    return null;
  }

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(booking.id);
      toast.success("Booking ID copied to clipboard");
    } catch {
      toast.error("Failed to copy Booking ID");
    }
  };

  const details = [
    { label: "Booking ID", value: booking.id },
    { label: "Customer Name", value: booking.customerName },
    { label: "Phone", value: booking.phone },
    { label: "Vehicle Number", value: booking.vehicleNumber },
    { label: "Service Type", value: booking.serviceType },
    { label: "Date", value: booking.date },
    { label: "Time", value: booking.time },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          ✅
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 mb-6">
          We've received your request. Our team will contact you shortly.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-4">
          {details.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center gap-3 text-sm"
            >
              <span className="text-gray-500">{label}</span>

              {label === "Booking ID" ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-900 text-xs md:text-sm">
                    {value}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              ) : (
                <span className="font-medium text-gray-900">{value}</span>
              )}
            </div>
          ))}
          <div className="flex justify-between text-sm pt-3 border-t">
            <span className="text-gray-500">Status</span>
            <span className="font-medium text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
              Pending
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-4">
          Keep your Booking ID or vehicle number + phone to track your status
          later.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn-primary w-full py-3"
        >
          Book Another Appointment
        </button>
        <button
          onClick={() => navigate("/track-booking")}
          className="btn-secondary w-full py-3 mt-2"
        >
          Track Your Booking
        </button>
      </div>
    </div>
  );
}
