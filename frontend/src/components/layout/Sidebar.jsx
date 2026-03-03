import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z" />
    </svg>
  );
}

function BookingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 4h10l3 3v13H4V4h3Zm3 0v4h4V4" />
      <path d="M8 12h8M8 16h6" />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m14 7 3 3m-9 9-3-3m2-5 8-8 5 5-8 8H7v-5Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 17v2a2 2 0 0 0 2 2h7V3h-7a2 2 0 0 0-2 2v2" />
      <path d="m15 12-4-4m4 4-4 4M3 12h12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.1">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", caption: "Performance and trends", Icon: DashboardIcon },
  { to: "/admin/bookings", label: "Bookings", caption: "Requests and statuses", Icon: BookingsIcon },
  { to: "/admin/services", label: "Services", caption: "Service catalog", Icon: ServicesIcon },
];

export default function Sidebar({ mobile = false, onClose = () => {} }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    onClose();
    navigate("/admin/login");
  };

  const rootClassName = mobile
    ? "flex h-full w-[84vw] max-w-[330px] flex-col border-r border-slate-800 bg-slate-950 text-slate-100"
    : "sticky top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-slate-100";

  return (
    <aside className={rootClassName}>
      <div className="border-b border-slate-800 p-4 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden ">
              <img src="/imgs/logo.png" alt="Axis AutoCare logo" className="h-full w-full object-cover" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-white">Axis AutoCare</h1>
              <p className="truncate text-xs text-slate-400">Admin Console</p>
            </div>
          </div>

          {mobile ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
              aria-label="Close sidebar"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3 md:p-4">
        {navItems.map(({ to, label, caption, Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                isActive ? "bg-slate-800 text-white shadow-inner" : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`
            }
            title={label}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-slate-200 group-hover:bg-slate-800">
              <Icon />
            </span>
            <span className="min-w-0">
              <span className="block truncate">{label}</span>
              <span className="block truncate text-xs font-medium text-slate-400">{caption}</span>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3 md:p-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-rose-950/40 hover:text-rose-100"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-300 group-hover:bg-rose-900/40">
            <LogoutIcon />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
