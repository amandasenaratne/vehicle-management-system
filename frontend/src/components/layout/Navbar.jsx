import useAuth from "../../hooks/useAuth.js";

export default function Navbar({ title, subtitle }) {
  const { user } = useAuth();
  const initials = user?.username?.slice(0, 2)?.toUpperCase() || "AD";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Operations Workspace</p>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
        </div>

        <div className="surface-muted flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 text-sm font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.username || "Administrator"}</p>
            <p className="text-xs text-slate-500">System Admin</p>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
        </div>
      </div>
    </header>
  );
}
