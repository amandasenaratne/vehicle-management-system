import Badge from "../ui/Badge.jsx";

const STATUS_OPTIONS = ["Pending", "Approved", "Completed", "Rejected", "Cancelled"];

export default function BookingTable({ bookings, onStatusChange, onDelete, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center py-14">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="p-10 text-center">
        <p className="text-base font-semibold text-slate-700">No bookings found</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting the date or status filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="data-table min-w-[980px] w-full">
        <thead>
          <tr>
            {["Customer", "Contact", "Vehicle", "Service", "Schedule", "Status", "Actions"].map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {bookings.map((booking) => (
            <tr key={booking.id} className="transition-colors hover:bg-slate-50/80">
              <td>
                <p className="font-semibold text-slate-900">{booking.customerName}</p>
                <p className="font-mono text-xs text-slate-500">{booking.id?.slice(0, 8)}</p>
              </td>
              <td className="text-slate-700">{booking.phone}</td>
              <td className="font-semibold text-slate-700">{booking.vehicleNumber}</td>
              <td className="text-slate-700">{booking.serviceType}</td>
              <td>
                <p className="font-semibold text-slate-900">{booking.date}</p>
                <p className="text-xs text-slate-500">{booking.time}</p>
              </td>
              <td>
                <Badge status={booking.status} />
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <select
                    value={booking.status}
                    onChange={(event) => onStatusChange(booking.id, event.target.value)}
                    className="input-field min-w-[138px] py-1.5 text-xs"
                    aria-label="Update booking status"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => onDelete(booking.id)}
                    className="btn-danger px-3 py-1.5 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
