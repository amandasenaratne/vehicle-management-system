import { Link } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Book Service", key: "book" },
  { to: "/track-booking", label: "Track Booking", key: "track" },
];

function BrandMark() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 14h16" />
        <path d="M6 14 8 8h8l2 6" />
        <path d="M6.5 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm11 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
    </span>
  );
}

export default function CustomerHeader({ active }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Vehicle Management System
            </p>
            <h1 className="text-lg font-bold text-slate-900">AutoService Center</h1>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  active === link.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link to="/admin/login" className="btn-secondary text-sm">
            Admin Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
