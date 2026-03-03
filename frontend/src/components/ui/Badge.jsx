const statusStyles = {
  Pending: "border-amber-200 bg-amber-50 text-amber-800",
  Approved: "border-blue-200 bg-blue-50 text-blue-800",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Rejected: "border-rose-200 bg-rose-50 text-rose-800",
};

const statusDotStyles = {
  Pending: "bg-amber-500",
  Approved: "bg-blue-500",
  Completed: "bg-emerald-500",
  Rejected: "bg-rose-500",
};

export default function Badge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] || "border-slate-200 bg-slate-100 text-slate-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status] || "bg-slate-500"}`} />
      {status}
    </span>
  );
}
