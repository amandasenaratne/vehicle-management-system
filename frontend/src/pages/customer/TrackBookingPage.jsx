import { useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import toast from "react-hot-toast";

export default function TrackBookingPage() {
  const [mode, setMode] = useState("id"); // "id" or "details"
  const [bookingId, setBookingId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    try {
      setLoading(true);

      let response;
      if (mode === "id") {
        if (!bookingId.trim()) {
          toast.error("Please enter your Booking ID");
          return;
        }
        response = await axiosInstance.get(
          `/bookings/public/${bookingId.trim()}`,
        );
      } else {
        if (!vehicleNumber.trim() || !phone.trim()) {
          toast.error("Please enter vehicle number and phone");
          return;
        }
        const params = new URLSearchParams({
          vehicleNumber: vehicleNumber.trim(),
          phone: phone.trim(),
        });
        response = await axiosInstance.get(
          `/bookings/lookup?${params.toString()}`,
        );
      }

      setResult(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "No booking found for the given details";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const info = result
    ? [
        { label: "Booking ID", value: result.id },
        { label: "Customer Name", value: result.customerName },
        { label: "Phone", value: result.phone },
        { label: "Vehicle Number", value: result.vehicleNumber },
        { label: "Service Type", value: result.serviceType },
        { label: "Date", value: result.date },
        { label: "Time", value: result.time },
        { label: "Status", value: result.status },
      ]
    : [];

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
              <p className="text-xs text-gray-500">Track Your Booking</p>
            </div>
          </div>
          <a
            href="/"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            ← Book a Service
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Track Your Booking Status
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Use your Booking ID or your vehicle number and phone to check
            whether your booking is pending, approved, completed, or rejected.
          </p>

          {/* Mode switch */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setMode("id")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg border ${
                mode === "id"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Use Booking ID
            </button>
            <button
              type="button"
              onClick={() => setMode("details")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg border ${
                mode === "details"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Use Vehicle & Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "id" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking ID
                </label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="input-field"
                  placeholder="Paste your Booking ID from the confirmation page"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="input-field"
                    placeholder="e.g. ABC-1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    placeholder="e.g. 0771234567"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 mt-2 text-base"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>
          </form>

          {result && (
            <div className="mt-8 bg-gray-50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Booking Details
              </h3>
              <div className="space-y-2 text-sm">
                {info.map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-gray-500">{label}</span>
                    <span
                      className={
                        label === "Status"
                          ? `font-semibold ${
                              value === "Approved"
                                ? "text-blue-600"
                                : value === "Completed"
                                  ? "text-green-600"
                                  : value === "Rejected"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                            }`
                          : "font-medium text-gray-900"
                      }
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
