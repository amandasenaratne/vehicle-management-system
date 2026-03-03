import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth.js";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 5 6v6c0 4.4 2.9 7.8 7 9 4.1-1.2 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success("Welcome back");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_70px_-45px_rgba(15,23,42,0.55)] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden bg-slate-900 p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.3),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.22),transparent_30%)]" />
          <div className="relative z-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <ShieldIcon />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Admin Console</p>
            <h1 className="mt-3 max-w-sm text-3xl font-bold leading-tight">Vehicle Management Operations Portal</h1>
            <p className="mt-4 max-w-md text-sm text-slate-300">
              Secure access for service managers to oversee bookings, update statuses, and maintain service categories.
            </p>
            <div className="mt-10 space-y-4 text-sm text-slate-200">
              <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Centralized booking oversight with status controls.</p>
              <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Service category management for customer booking forms.</p>
            </div>
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Sign In</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-slate-600">Enter your administrator credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(event) => setForm((previous) => ({ ...previous, username: event.target.value }))}
                className="input-field"
                placeholder="admin"
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(event) => setForm((previous) => ({ ...previous, password: event.target.value }))}
                className="input-field"
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
              {loading ? "Signing In..." : "Sign In to Console"}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-sm text-slate-500">
            <p>Vehicle Service Booking System</p>
            <Link to="/" className="font-semibold text-blue-700 hover:text-blue-800">
              Back to Customer Site
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
