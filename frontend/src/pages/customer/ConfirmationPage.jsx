import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Badge from "../../components/ui/Badge.jsx";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

export default function ConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(booking.id);
      toast.success("Booking ID copied");
    } catch {
      toast.error("Failed to copy Booking ID");
    }
  };

  const details = [
    { label: "Booking ID", value: booking.id, copy: true },
    { label: "Customer Name", value: booking.customerName },
    { label: "Phone", value: booking.phone },
    { label: "Vehicle Number", value: booking.vehicleNumber },
    { label: "Service Type", value: booking.serviceType },
    { label: "Date", value: booking.date },
    { label: "Time", value: booking.time },
  ];

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        <section className="surface-card p-6 text-center sm:p-8">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <SuccessIcon />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Booking Confirmed</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            Your request has been received successfully. Keep your booking reference to track updates later.
          </p>

          <div className="mt-8 space-y-3 text-left">
            {details.map(({ label, value, copy }) => (
              <div key={label} className="surface-muted flex items-center justify-between gap-3 p-3">
                <span className="text-sm text-slate-500">{label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold text-slate-900 ${copy ? "font-mono" : ""}`}>{value}</span>
                  {copy ? (
                    <button type="button" onClick={handleCopyId} className="btn-secondary px-2.5 py-1.5 text-xs">
                      Copy
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            <div className="surface-muted flex items-center justify-between gap-3 p-3">
              <span className="text-sm text-slate-500">Status</span>
              <Badge status="Pending" />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-left">
            <p className="text-sm font-semibold text-blue-900">Next Step</p>
            <p className="mt-1 text-sm text-blue-800">Use your booking ID or vehicle number and phone to monitor progress.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => navigate("/")} className="btn-primary py-3">
              Book Another Service
            </button>
            <button type="button" onClick={() => navigate("/track-booking")} className="btn-secondary py-3">
              Track This Booking
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
