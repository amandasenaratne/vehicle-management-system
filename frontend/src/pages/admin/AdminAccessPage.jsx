import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

export default function AdminAccessPage() {
  const { adminUser, customerUser } = useAuth();

  if (customerUser) {
    return <Navigate to="/customer/portal" replace />;
  }

  if (adminUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-6 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_70px_-45px_rgba(15,23,42,0.55)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden bg-slate-900 p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.28),transparent_42%),radial-gradient(circle_at_90%_5%,rgba(16,185,129,0.2),transparent_35%)]" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Enterprise Admin Portal</p>
            <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight">Operations Control Center</h1>
            <p className="mt-4 max-w-md text-sm text-slate-300">
              Secure workspace for booking supervision, service catalog control, and real-time operational monitoring.
            </p>
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Admin Access</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Vehicle Service Administration</h2>
          <p className="mt-2 text-sm text-slate-600">
            Authorized personnel can sign in to manage customer bookings and service categories.
          </p>

          <div className="mt-8 space-y-3">
            <Link to="/admin/login" className="btn-primary w-full justify-center py-3">
              Proceed to Admin Login
            </Link>
            <Link to="/" className="btn-secondary w-full justify-center py-3">
              Back to Customer Website
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
