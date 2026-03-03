import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";
import Badge from "../../components/ui/Badge.jsx";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";

export default function TrackBookingPage() {
  const [mode, setMode] = useState("id");
  const [bookingId, setBookingId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult(null);

    try {
      setLoading(true);

      let response;
      if (mode === "id") {
        if (!bookingId.trim()) {
          toast.error("Please enter your booking ID");
          return;
        }
        response = await axiosInstance.get(`/bookings/public/${bookingId.trim()}`);
      } else {
        if (!vehicleNumber.trim() || !phone.trim()) {
          toast.error("Please enter vehicle number and phone");
          return;
        }
        const params = new URLSearchParams({
          vehicleNumber: vehicleNumber.trim(),
          phone: phone.trim(),
        });
        response = await axiosInstance.get(`/bookings/lookup?${params.toString()}`);
      }

      setResult(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "No booking found for the given details");
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
      ]
    : [];

  return (
    <div className="min-h-screen">
      <CustomerHeader active="track" />

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
        <section className="surface-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Track Booking Status</h2>
          <p className="mt-2 text-sm text-slate-600">
            Check whether your request is pending, approved, completed, or rejected.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setMode("id")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                mode === "id" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Booking ID
            </button>
            <button
              type="button"
              onClick={() => setMode("details")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                mode === "details" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Vehicle + Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "id" ? (
              <div>
                <label htmlFor="bookingId" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Booking ID
                </label>
                <input
                  id="bookingId"
                  type="text"
                  value={bookingId}
                  onChange={(event) => setBookingId(event.target.value)}
                  className="input-field"
                  placeholder="Paste your confirmation ID"
                />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="vehicleNumber" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Vehicle Number
                  </label>
                  <input
                    id="vehicleNumber"
                    type="text"
                    value={vehicleNumber}
                    onChange={(event) => setVehicleNumber(event.target.value)}
                    className="input-field"
                    placeholder="ABC-1234"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="input-field"
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? "Checking..." : "Check Booking Status"}
            </button>
          </form>
        </section>

        <section className="surface-card p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900">Latest Result</h3>
          <p className="mt-1 text-sm text-slate-600">Search details will appear here after your lookup.</p>

          {result ? (
            <div className="mt-6 space-y-3">
              {info.map(({ label, value }) => (
                <div key={label} className="surface-muted flex items-center justify-between gap-3 p-3">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-900">{value}</span>
                </div>
              ))}
              <div className="surface-muted flex items-center justify-between gap-3 p-3">
                <span className="text-sm text-slate-500">Status</span>
                <Badge status={result.status} />
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-sm font-semibold text-slate-700">No status loaded</p>
              <p className="mt-1 text-sm text-slate-500">Use the form to retrieve your current booking details.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
