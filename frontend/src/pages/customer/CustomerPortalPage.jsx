import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";
import useAuth from "../../hooks/useAuth.js";
import Badge from "../../components/ui/Badge.jsx";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";

const initialForm = {
  phone: "",
  vehicleNumber: "",
  serviceType: "",
  date: "",
  time: "",
  notes: "",
};

const CANCELABLE_STATUSES = new Set(["Pending", "Approved"]);

export default function CustomerPortalPage() {
  const { customerUser, getAuthConfig } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cancellingId, setCancellingId] = useState("");

  const loadBookings = async () => {
    setLoadingHistory(true);
    try {
      const { data } = await axiosInstance.get("/bookings/mine", getAuthConfig("customer"));
      setBookings(data.data);
    } catch {
      toast.error("Failed to load booking history");
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await axiosInstance.get("/services?active=true");
        setServices(data.data);
      } catch {
        setServices([]);
      }
    };

    loadServices();
    loadBookings();
  }, []);

  const statusSummary = useMemo(
    () => [
      { label: "Total", value: bookings.length },
      { label: "Pending", value: bookings.filter((booking) => booking.status === "Pending").length },
      { label: "Completed", value: bookings.filter((booking) => booking.status === "Completed").length },
    ],
    [bookings],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.phone || !form.vehicleNumber || !form.serviceType || !form.date || !form.time) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post(
        "/bookings",
        {
          customerName: customerUser?.name || "Customer",
          ...form,
        },
        getAuthConfig("customer"),
      );
      toast.success("Booking request submitted");
      setForm((prev) => ({ ...initialForm, phone: prev.phone }));
      loadBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit booking");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelBooking = async (booking) => {
    const canCancel = CANCELABLE_STATUSES.has(booking.status);
    if (!canCancel) {
      toast.error("Only pending or approved bookings can be cancelled");
      return;
    }

    if (!window.confirm("Cancel this booking request?")) return;

    setCancellingId(booking.id);
    try {
      await axiosInstance.put(`/bookings/${booking.id}/cancel`, {}, getAuthConfig("customer"));
      toast.success("Booking cancelled");
      await loadBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId("");
    }
  };

  const getCancellationState = (status) => {
    if (CANCELABLE_STATUSES.has(status)) {
      return {
        canCancel: true,
        helperText: "You can cancel this request before final completion.",
        buttonLabel: "Cancel Booking",
      };
    }

    if (status === "Cancelled") {
      return {
        canCancel: false,
        helperText: "This booking has been cancelled and is no longer active.",
        buttonLabel: "Cancelled",
      };
    }

    if (status === "Completed") {
      return {
        canCancel: false,
        helperText: "This booking is completed and closed.",
        buttonLabel: "Completed",
      };
    }

    if (status === "Rejected") {
      return {
        canCancel: false,
        helperText: "This booking request was declined by the service desk.",
        buttonLabel: "Rejected",
      };
    }

    return {
      canCancel: false,
      helperText: "This booking is not eligible for cancellation.",
      buttonLabel: "Unavailable",
    };
  };

  return (
    <div className="min-h-screen">
      <CustomerHeader active="portal" />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="surface-card p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Customer Dashboard</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome, {customerUser?.name || "Customer"}</h2>
            <p className="mt-2 text-sm text-slate-600">
              Manage your bookings, check status updates, and schedule your next service appointment.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {statusSummary.map((item) => (
                <div key={item.label} className="surface-muted p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="surface-card p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Profile</p>
            <div className="mt-4 space-y-3">
              <div className="surface-muted p-3">
                <p className="text-xs text-slate-500">Name</p>
                <p className="text-sm font-semibold text-slate-900">{customerUser?.name || "-"}</p>
              </div>
              <div className="surface-muted p-3">
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm font-semibold text-slate-900">{customerUser?.email || customerUser?.username || "-"}</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="surface-card p-6 sm:p-7">
            <h3 className="text-xl font-bold text-slate-900">Book New Service</h3>
            <p className="mt-1 text-sm text-slate-600">Create a new appointment request from your account.</p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="vehicleNumber" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Vehicle Number
                </label>
                <input
                  id="vehicleNumber"
                  type="text"
                  value={form.vehicleNumber}
                  onChange={(event) => setForm((prev) => ({ ...prev, vehicleNumber: event.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Service Type
                </label>
                <select
                  id="serviceType"
                  value={form.serviceType}
                  onChange={(event) => setForm((prev) => ({ ...prev, serviceType: event.target.value }))}
                  className="input-field"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Preferred Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  className="input-field resize-none"
                  placeholder="Optional details or concerns"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
                {submitting ? "Submitting..." : "Submit Booking"}
              </button>
            </form>
          </article>

          <article className="surface-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-5">
              <h3 className="text-xl font-bold text-slate-900">Booking History</h3>
              <p className="mt-1 text-sm text-slate-600">Your past and current service appointments.</p>
            </div>

            {loadingHistory ? (
              <div className="flex justify-center py-14">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
              </div>
            ) : bookings.length ? (
              <div className="max-h-[720px] space-y-3 overflow-y-auto p-5">
                {bookings.map((booking) => {
                  const cancelState = getCancellationState(booking.status);
                  const isCancelling = cancellingId === booking.id;

                  return (
                    <div key={booking.id} className="surface-muted p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-slate-900">{booking.serviceType}</p>
                      <Badge status={booking.status} />
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-slate-500">Vehicle</p>
                        <p className="font-semibold text-slate-800">{booking.vehicleNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Date & Time</p>
                        <p className="font-semibold text-slate-800">
                          {booking.date} at {booking.time}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs text-slate-500">Booking ID</p>
                        <p className="font-mono text-xs font-semibold text-slate-700">{booking.id}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs text-slate-500">Description</p>
                        <p className="text-sm font-medium text-slate-700">
                          {booking.notes?.trim() || "No description provided"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
                      <p className="text-xs text-slate-500">{cancelState.helperText}</p>
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(booking)}
                        disabled={!cancelState.canCancel || isCancelling}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                          cancelState.canCancel
                            ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                            : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isCancelling ? "Cancelling..." : cancelState.buttonLabel}
                      </button>
                    </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-10 text-center">
                <p className="text-base font-semibold text-slate-700">No bookings yet</p>
                <p className="mt-1 text-sm text-slate-500">Create your first appointment using the form on this page.</p>
              </div>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}
