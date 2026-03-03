import useAuth from "../../hooks/useAuth.js";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.1">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function Navbar({ title, subtitle, onMenuClick }) {
  const { user } = useAuth();
  const name = user?.name || user?.email || user?.username || "Administrator";
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "AD";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex items-start justify-between gap-3 px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onMenuClick}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
              aria-label="Open admin menu"
            >
              <MenuIcon />
            </button>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:text-xs">
              Operations Workspace
            </p>
          </div>
          <h2 className="mt-1 truncate text-lg font-bold text-slate-900 sm:text-xl">{title}</h2>
          {subtitle ? <p className="mt-1 hidden text-sm text-slate-600 sm:block">{subtitle}</p> : null}
        </div>

        <div className="surface-muted flex shrink-0 items-center gap-2 px-2.5 py-2 sm:gap-3 sm:px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
            {initials}
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">System Admin</p>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
        </div>
      </div>
    </header>
  );
}
