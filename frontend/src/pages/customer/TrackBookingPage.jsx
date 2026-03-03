import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";
import Badge from "../../components/ui/Badge.jsx";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";
import SiteFooter from "../../components/layout/SiteFooter.jsx";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function IdCardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <circle cx="8.2" cy="12" r="1.6" />
      <path d="M11.5 10.4h6M11.5 13.6h6" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 14h16" />
      <path d="M6 14 8 8h8l2 6" />
      <circle cx="6.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M6.5 3.5h3l1.3 3.4-1.9 1.7a14 14 0 0 0 6.3 6.3l1.7-1.9 3.4 1.3v3a2 2 0 0 1-2.2 2 17 17 0 0 1-13.9-14 2 2 0 0 1 2.3-2.1Z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.6 12.2 2.2 2.2 4.6-4.6" />
    </svg>
  );
}

export default function TrackBookingPage() {
  const [mode, setMode] = useState("id");
  const [bookingId, setBookingId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

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
        { label: "Description", value: result.notes?.trim() || "No description provided" },
        { label: "Date", value: result.date },
        { label: "Time", value: result.time },
      ]
    : [];

  return (
    <div className="min-h-screen">
      <CustomerHeader active="track" />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-cyan-300/16 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
          <section
            className={`surface-card p-6 sm:p-8 transition-all duration-700 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Booking Lookup</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Track Booking Status</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Check whether your request is pending, approved, completed, or rejected.
                </p>
              </div>
              <span className="hidden h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 sm:inline-flex">
                <SearchIcon />
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <div className="relative grid grid-cols-2">
                <span
                  className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-lg bg-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    mode === "details" ? "translate-x-full" : "translate-x-0"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setMode("id")}
                  className={`relative z-10 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    mode === "id" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Booking ID
                </button>
                <button
                  type="button"
                  onClick={() => setMode("details")}
                  className={`relative z-10 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    mode === "details" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Vehicle + Phone
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white/65 p-4">
              <div className="relative min-h-[225px] sm:min-h-[195px]">
                <form
                  onSubmit={handleSubmit}
                  className={`absolute inset-0 space-y-4 transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    mode === "id" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                  aria-hidden={mode !== "id"}
                >
                  <div>
                    <label htmlFor="bookingId" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Booking ID
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <IdCardIcon />
                      </span>
                      <input
                        id="bookingId"
                        type="text"
                        value={bookingId}
                        onChange={(event) => setBookingId(event.target.value)}
                        className="input-field pl-11"
                        placeholder="Paste your confirmation ID"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading || mode !== "id"} className="btn-primary w-full py-3">
                    {loading && mode === "id" ? "Checking..." : "Check Booking Status"}
                  </button>
                </form>

                <form
                  onSubmit={handleSubmit}
                  className={`absolute inset-0 space-y-4 transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    mode === "details" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                  aria-hidden={mode !== "details"}
                >
                  <div>
                    <label htmlFor="vehicleNumber" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Vehicle Number
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <CarIcon />
                      </span>
                      <input
                        id="vehicleNumber"
                        type="text"
                        value={vehicleNumber}
                        onChange={(event) => setVehicleNumber(event.target.value)}
                        className="input-field pl-11"
                        placeholder="ABC-1234"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <PhoneIcon />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="input-field pl-11"
                        placeholder="07XXXXXXXX"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading || mode !== "details"} className="btn-primary w-full py-3">
                    {loading && mode === "details" ? "Checking..." : "Check Booking Status"}
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                "Use exact booking ID from confirmation",
                "Vehicle and phone lookup also supported",
                "Live status shown immediately after lookup",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-semibold text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section
            className={`surface-card p-6 sm:p-8 transition-all duration-700 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Latest Result</h3>
                <p className="mt-1 text-sm text-slate-600">Search details will appear here after your lookup.</p>
              </div>
              <span className="hidden h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 sm:inline-flex">
                <CheckCircleIcon />
              </span>
            </div>

            {result ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-700">Current Status</span>
                    <Badge status={result.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {info.map(({ label, value }) => (
                    <div key={label} className="surface-muted p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{value || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-sm font-semibold text-slate-700">No status loaded</p>
                <p className="mt-1 text-sm text-slate-500">Use the lookup form to retrieve current booking details.</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
