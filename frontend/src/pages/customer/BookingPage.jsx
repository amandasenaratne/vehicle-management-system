import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BookingForm from "../../components/bookings/BookingForm.jsx";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function BookingPage() {
  const navigate = useNavigate();

  const handleSuccess = (booking) => {
    toast.success("Booking submitted successfully");
    navigate("/confirmation", { state: { booking } });
  };

  return (
    <div className="min-h-screen">
      <CustomerHeader active="book" />

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <section className="surface-card relative overflow-hidden p-7 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(11,94,215,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_40%)]" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Customer Portal</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Book a Service Appointment</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Submit your booking request and our service team will contact you to confirm availability and finalize your service slot.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Fast booking process with instant confirmation reference",
                "Track approval and completion status online",
                "Support for all major vehicle service categories",
              ].map((item) => (
                <div key={item} className="surface-muted flex items-start gap-3 p-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <CheckIcon />
                  </span>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-900">Service Request Form</h3>
          <p className="mb-6 mt-1 text-sm text-slate-600">Provide your details to create a booking request.</p>
          <BookingForm onSuccess={handleSuccess} />
        </section>
      </main>
    </div>
  );
}
