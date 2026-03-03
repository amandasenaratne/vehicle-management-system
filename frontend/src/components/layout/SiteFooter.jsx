import { Link } from "react-router-dom";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-transparent text-slate-600">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr] lg:py-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">AutoService Center</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">Premium Vehicle Service Operations</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            Enterprise-grade diagnostics and maintenance workflows with transparent booking and service tracking.
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">Quick Links</p>
          <div className="mt-3 space-y-2 text-sm">
            <a href="/#about" className="block text-slate-600 transition-colors hover:text-slate-900">
              About
            </a>
            <a href="/#services" className="block text-slate-600 transition-colors hover:text-slate-900">
              Services
            </a>
            <a href="/#process" className="block text-slate-600 transition-colors hover:text-slate-900">
              Process
            </a>
            <a href="/#contact" className="block text-slate-600 transition-colors hover:text-slate-900">
              Contact
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">Customer</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link to="/customer/auth" className="block text-slate-600 transition-colors hover:text-slate-900">
              Sign In / Register
            </Link>
            <Link to="/track-booking" className="block text-slate-600 transition-colors hover:text-slate-900">
              Track Booking
            </Link>
            <Link to="/customer/portal" className="block text-slate-600 transition-colors hover:text-slate-900">
              My Portal
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">Support</p>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p>Colombo Workshop Hub</p>
            <p>+94 11 555 0190</p>
            <p>support@autoservice.example</p>
            <Link to="/admin" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-900">
              Admin Access
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/80">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-4 text-xs text-slate-500 sm:justify-between sm:px-6">
          <p>(c) {year} AutoService Center. All rights reserved.</p>
          <p>Vehicle Management System</p>
        </div>
      </div>
    </footer>
  );
}
