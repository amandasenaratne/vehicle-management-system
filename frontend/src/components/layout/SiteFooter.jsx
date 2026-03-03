import { Link } from "react-router-dom";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">AutoService Center</p>
          <h3 className="mt-2 text-xl font-bold text-white">Premium Vehicle Service Operations</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Enterprise-grade diagnostics and maintenance workflows with transparent booking and service tracking.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Quick Links</p>
          <div className="mt-3 space-y-2 text-sm">
            <a href="/#about" className="block text-slate-400 transition-colors hover:text-white">
              About
            </a>
            <a href="/#services" className="block text-slate-400 transition-colors hover:text-white">
              Services
            </a>
            <a href="/#process" className="block text-slate-400 transition-colors hover:text-white">
              Process
            </a>
            <a href="/#contact" className="block text-slate-400 transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Customer</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link to="/customer/auth" className="block text-slate-400 transition-colors hover:text-white">
              Sign In / Register
            </Link>
            <Link to="/track-booking" className="block text-slate-400 transition-colors hover:text-white">
              Track Booking
            </Link>
            <Link to="/customer/portal" className="block text-slate-400 transition-colors hover:text-white">
              My Portal
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Support</p>
          <div className="mt-3 space-y-2 text-sm text-slate-400">
            <p>Colombo Workshop Hub</p>
            <p>+94 11 555 0190</p>
            <p>support@autoservice.example</p>
            <Link to="/admin" className="inline-flex rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white">
              Admin Access
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:px-6">
          <p>© {year} AutoService Center. All rights reserved.</p>
          <p>Vehicle Management System</p>
        </div>
      </div>
    </footer>
  );
}
