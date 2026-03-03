import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";
import CustomerHeader from "../../components/layout/CustomerHeader.jsx";
import SiteFooter from "../../components/layout/SiteFooter.jsx";

const INITIAL_SIGNUP = { name: "", email: "", password: "" };
const INITIAL_LOGIN = { email: "", password: "" };

function ShieldLockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3 6 6v5c0 4.4 2.4 7.7 6 10 3.6-2.3 6-5.6 6-10V6z" />
      <rect x="9.1" y="10.5" width="5.8" height="4.8" rx="1" />
      <path d="M10.4 10.5V9.4a1.6 1.6 0 1 1 3.2 0v1.1" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="3.5" y="4.5" width="7" height="5" rx="1.2" />
      <rect x="13.5" y="4.5" width="7" height="5" rx="1.2" />
      <rect x="8.5" y="14.5" width="7" height="5" rx="1.2" />
      <path d="M10.5 7h3M12 9.5v5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 12h3v3H8z" />
    </svg>
  );
}

export default function CustomerAuthPage() {
  const navigate = useNavigate();
  const { customerUser, customerSignup, customerLogin } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [signupForm, setSignupForm] = useState(INITIAL_SIGNUP);
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

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

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-cyan-300/18 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-12">
          <section
            className={`px-1 py-2 sm:px-2 lg:pr-10 transition-all duration-700 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">Customer Access</p>
            <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Manage Your Vehicle Service Journey
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
              Create your account to book appointments, review service history,
              and track booking progress from one secure portal.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Live Updates", value: "Real-Time" },
                { label: "Service Records", value: "Unified" },
                { label: "Booking Flow", value: "Guided" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200/85 bg-white/55 px-4 py-3 text-center backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {[
                { text: "Secure account access with email and password", Icon: ShieldLockIcon },
                { text: "Centralized service history and status timeline", Icon: WorkflowIcon },
                { text: "Quick appointment scheduling with date selection", Icon: CalendarIcon },
              ].map(({ text, Icon }) => (
                <div key={text} className="rounded-xl border border-slate-200/85 bg-white/55 px-4 py-3 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <Icon />
                    </span>
                    <p className="pt-0.5 text-sm font-semibold text-slate-700">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            className={`surface-card p-6 sm:p-8 lg:p-9 transition-all duration-700 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Portal Access</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-[30px]">
              {mode === "signup" ? "Create Your Account" : "Sign In to Continue"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {mode === "signup"
                ? "Register once to unlock booking history, appointment tracking, and service status updates."
                : "Use your account credentials to access your service timeline and new booking options."}
            </p>

            <div className="relative mb-7 mt-6 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <span
                className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-lg bg-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mode === "signup" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              <button
                type="button"
                className={`relative z-10 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  mode === "login" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setMode("login")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`relative z-10 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  mode === "signup" ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setMode("signup")}
              >
                Create Account
              </button>
            </div>

            <div className="relative min-h-[260px] sm:min-h-[318px]">
              <form
                onSubmit={handleLogin}
                className={`absolute inset-0 space-y-4 transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mode === "login" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                }`}
                aria-hidden={mode !== "login"}
              >
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
                    disabled={mode !== "login" || loading}
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
                    disabled={mode !== "login" || loading}
                    required
                  />
                </div>
                <button type="submit" disabled={loading || mode !== "login"} className="btn-primary mt-1 w-full py-3">
                  {loading && mode === "login" ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <form
                onSubmit={handleSignup}
                className={`absolute inset-0 space-y-4 transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mode === "signup" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                }`}
                aria-hidden={mode !== "signup"}
              >
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
                    disabled={mode !== "signup" || loading}
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
                    disabled={mode !== "signup" || loading}
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
                    disabled={mode !== "signup" || loading}
                    required
                  />
                </div>
                <button type="submit" disabled={loading || mode !== "signup"} className="btn-primary mt-1 w-full py-3">
                  {loading && mode === "signup" ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
              <p className="text-sm text-slate-600">
                Need to check an existing booking without signing in?{" "}
                <Link to="/track-booking" className="font-semibold text-blue-700 hover:text-blue-800">
                  Track Booking
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
