import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

export default function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-slate-100/70">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
