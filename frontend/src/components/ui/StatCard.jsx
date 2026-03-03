export default function StatCard({ title, value, icon, color = "blue" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-amber-100 text-amber-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-rose-100 text-rose-700",
    purple: "bg-violet-100 text-violet-700",
  };

  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
    </div>
  );
}
