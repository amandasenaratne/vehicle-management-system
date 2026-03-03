import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";
import AdminLayout from "../../components/layout/AdminLayout.jsx";
import StatCard from "../../components/ui/StatCard.jsx";
import useAuth from "../../hooks/useAuth.js";

function TotalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l3 2" />
    </svg>
  );
}

function ApprovedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function CompletedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 16h16M7 16V8h10v8M9 8V5h6v3" />
    </svg>
  );
}

function RejectedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6m0-6-6 6" />
    </svg>
  );
}

function TodayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export default function Dashboard() {
  const { getAuthConfig } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/bookings/stats", getAuthConfig("admin"));
        setStats(data.data);
      } catch {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [getAuthConfig]);

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      { title: "Total Bookings", value: stats.total, icon: <TotalIcon />, color: "blue" },
      { title: "Pending", value: stats.pending, icon: <PendingIcon />, color: "yellow" },
      { title: "Approved", value: stats.approved, icon: <ApprovedIcon />, color: "blue" },
      { title: "Completed", value: stats.completed, icon: <CompletedIcon />, color: "green" },
      { title: "Rejected", value: stats.rejected, icon: <RejectedIcon />, color: "red" },
      { title: "Today", value: stats.todayBookings, icon: <TodayIcon />, color: "purple" },
    ];
  }, [stats]);

  return (
    <AdminLayout title="Dashboard" subtitle="Track booking volume and operational status in real time">
      <section className="panel-header">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Overview</h3>
          <p className="text-sm text-slate-600">Operational snapshot of booking performance.</p>
        </div>
      </section>

      {loading ? (
        <div className="surface-card flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
