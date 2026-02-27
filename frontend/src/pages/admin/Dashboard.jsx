import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import StatCard from "../../components/ui/StatCard.jsx";
import axiosInstance from "../../api/axiosInstance.js";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/bookings/stats")
      .then(({ data }) => setStats(data.data))
      .catch(() => toast.error("Failed to load stats"))
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { title: "Total Bookings", value: stats.total, icon: "📋", color: "blue" },
        { title: "Pending", value: stats.pending, icon: "⏳", color: "yellow" },
        { title: "Approved", value: stats.approved, icon: "✅", color: "blue" },
        { title: "Completed", value: stats.completed, icon: "🏁", color: "green" },
        { title: "Rejected", value: stats.rejected, icon: "❌", color: "red" },
        { title: "Today's Bookings", value: stats.todayBookings, icon: "📅", color: "purple" },
      ]
    : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Dashboard" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Overview</h3>
            <p className="text-sm text-gray-500">Booking statistics at a glance</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => <StatCard key={card.title} {...card} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
