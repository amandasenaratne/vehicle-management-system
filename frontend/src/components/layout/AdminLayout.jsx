import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

export default function AdminLayout({ title, subtitle, children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileSidebarOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-slate-100/70">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className={`fixed inset-0 z-50 lg:hidden ${isMobileSidebarOpen ? "" : "pointer-events-none"}`}>
        <button
          type="button"
          className={`absolute inset-0 bg-slate-950/35 transition-opacity duration-300 ${
            isMobileSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
        <div
          className={`absolute inset-y-0 left-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-[102%]"
          }`}
        >
          <Sidebar mobile onClose={() => setIsMobileSidebarOpen(false)} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
