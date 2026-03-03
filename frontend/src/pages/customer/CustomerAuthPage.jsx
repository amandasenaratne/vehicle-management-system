import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";

const INITIAL_SIGNUP = { name: "", email: "", password: "" };
const INITIAL_LOGIN = { email: "", password: "" };

export default function CustomerAuthPage() {
  const navigate = useNavigate();
  const { customerUser, customerSignup, customerLogin } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [signupForm, setSignupForm] = useState(INITIAL_SIGNUP);
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN);

  if (customerUser) {
    return <Navigate to="/customer/portal" replace />;
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await customerSignup(signupForm);
      toast.success("Account created successfully");
      navigate("/customer/portal");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await customerLogin(loginForm);
      toast.success("Signed in successfully");
      navigate("/customer/portal");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
        <section className="surface-card relative overflow-hidden p-7 sm:p-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(11,94,215,0.16),transparent_33%),radial-gradient(circle_at_90%_5%,rgba(16,185,129,0.12),transparent_30%)]" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Customer Access</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Manage Your Vehicle Service Journey</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Create your account to book appointments, view service history, and track every booking from a single dashboard.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "Secure account access with email and password",
                "Centralized service history and status timeline",
                "Quick booking flow with real-time workshop updates",
              ].map((item) => (
                <div key={item} className="surface-muted px-4 py-3 text-sm font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card p-6 sm:p-8">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setMode("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setMode("signup")}
            >
              Create Account
            </button>
          </div>

          {mode === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={signupForm.name}
                  onChange={(event) => setSignupForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={signupForm.email}
                  onChange={(event) => setSignupForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={signupForm.password}
                  onChange={(event) => setSignupForm((prev) => ({ ...prev, password: event.target.value }))}
                  className="input-field"
                  minLength={6}
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
