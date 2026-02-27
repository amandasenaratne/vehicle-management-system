import { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import BookingTable from "../../components/bookings/BookingTable.jsx";
import axiosInstance from "../../api/axiosInstance.js";
import toast from "react-hot-toast";

const STATUS_FILTERS = ["All", "Pending", "Approved", "Completed", "Rejected"];

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "All", date: "" });
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: pagination.page, limit: 10 };
      if (filters.status !== "All") params.status = filters.status;
      if (filters.date) params.date = filters.date;

      const { data } = await axiosInstance.get("/bookings", { params });
      setBookings(data.data);
      setPagination((p) => ({ ...p, pages: data.pagination.pages }));
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosInstance.put(`/bookings/${id}/status`, { status });
      toast.success(`Status updated to ${status}`);
      fetchBookings();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axiosInstance.delete(`/bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Bookings" />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="input-field w-36"
              >
                {STATUS_FILTERS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="input-field w-40"
              />
            </div>
            {(filters.status !== "All" || filters.date) && (
              <button
                onClick={() => setFilters({ status: "All", date: "" })}
                className="btn-secondary text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">All Bookings</h3>
            </div>
            <BookingTable
              bookings={bookings}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPagination({ ...pagination, page: p })}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    p === pagination.page ? "bg-blue-600 text-white" : "bg-white text-gray-600 border hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
