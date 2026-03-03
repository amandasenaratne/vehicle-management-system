import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";
import BookingTable from "../../components/bookings/BookingTable.jsx";
import AdminLayout from "../../components/layout/AdminLayout.jsx";
import useAuth from "../../hooks/useAuth.js";

const STATUS_FILTERS = ["All", "Pending", "Approved", "Completed", "Rejected", "Cancelled"];

export default function BookingsPage() {
  const { getAuthConfig } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "All", date: "" });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: pagination.page, limit: 10 };
      if (filters.status !== "All") params.status = filters.status;
      if (filters.date) params.date = filters.date;

      const { data } = await axiosInstance.get("/bookings", { params, ...getAuthConfig("admin") });
      setBookings(data.data);
      setPagination((previous) => ({
        ...previous,
        pages: data.pagination.pages,
        total: data.pagination.total,
      }));
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, getAuthConfig]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosInstance.put(`/bookings/${id}/status`, { status }, getAuthConfig("admin"));
      toast.success(`Status updated to ${status}`);
      fetchBookings();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axiosInstance.delete(`/bookings/${id}`, getAuthConfig("admin"));
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <AdminLayout title="Bookings" subtitle="Filter and manage incoming service requests">
      <section className="surface-card mb-6 p-5">
        <div className="panel-header mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Filters</h3>
            <p className="text-sm text-slate-600">Narrow down by current status or preferred date.</p>
          </div>
          {(filters.status !== "All" || filters.date) && (
            <button
              type="button"
              onClick={() => {
                setFilters({ status: "All", date: "" });
                setPagination((previous) => ({ ...previous, page: 1 }));
              }}
              className="btn-secondary text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-lg">
          <div>
            <label htmlFor="statusFilter" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              id="statusFilter"
              value={filters.status}
              onChange={(event) => {
                setFilters((previous) => ({ ...previous, status: event.target.value }));
                setPagination((previous) => ({ ...previous, page: 1 }));
              }}
              className="input-field"
            >
              {STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dateFilter" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Date
            </label>
            <input
              id="dateFilter"
              type="date"
              value={filters.date}
              onChange={(event) => {
                setFilters((previous) => ({ ...previous, date: event.target.value }));
                setPagination((previous) => ({ ...previous, page: 1 }));
              }}
              className="input-field"
            />
          </div>
        </div>
      </section>

      <section className="surface-card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-base font-bold text-slate-900">Booking Register</h3>
          <p className="text-sm text-slate-600">
            Showing page {pagination.page} of {pagination.pages} {pagination.total ? `(${pagination.total} total)` : ""}
          </p>
        </div>

        <BookingTable
          bookings={bookings}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          loading={loading}
        />
      </section>

      {pagination.pages > 1 ? (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, index) => index + 1).map((pageNo) => (
            <button
              key={pageNo}
              type="button"
              onClick={() => setPagination((previous) => ({ ...previous, page: pageNo }))}
              className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition-colors ${
                pageNo === pagination.page
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {pageNo}
            </button>
          ))}
        </div>
      ) : null}
    </AdminLayout>
  );
}
