import { Link, useNavigate } from "react-router-dom";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";
import useAuth from "../../hooks/useAuth.js";

export default function CustomerProfilePage() {
  const navigate = useNavigate();
  const { customerUser, logoutCustomer } = useAuth();

  const displayName = customerUser?.name || customerUser?.email || "Customer";
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || "C";

  return (
    <div className="min-h-screen">
      <CustomerHeader active="profile" />

      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
        <section className="surface-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">My Profile</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-xl font-bold text-white">
              {avatarLetter}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{displayName}</h2>
              <p className="text-sm text-slate-600">Customer Account</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="surface-muted p-4">
              <p className="text-xs text-slate-500">Full Name</p>
              <p className="text-sm font-semibold text-slate-900">{customerUser?.name || "-"}</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-xs text-slate-500">Email Address</p>
              <p className="text-sm font-semibold text-slate-900">{customerUser?.email || customerUser?.username || "-"}</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-xs text-slate-500">Account Role</p>
              <p className="text-sm font-semibold capitalize text-slate-900">{customerUser?.role || "customer"}</p>
            </div>
          </div>
        </section>

        <section className="surface-card p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-900">Account Actions</h3>
          <p className="mt-1 text-sm text-slate-600">Manage your customer workspace and session.</p>

          <div className="mt-6 space-y-3">
            <Link to="/customer/portal" className="btn-secondary w-full justify-center py-3">
              Go to My Portal
            </Link>
            <Link to="/track-booking" className="btn-secondary w-full justify-center py-3">
              Track a Booking
            </Link>
            <button
              type="button"
              onClick={() => {
                logoutCustomer();
                navigate("/customer/auth");
              }}
              className="btn-danger w-full justify-center py-3"
            >
              Log Out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
