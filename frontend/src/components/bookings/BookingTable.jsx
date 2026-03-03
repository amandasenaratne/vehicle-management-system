import Badge from "../ui/Badge.jsx";

const STATUS_OPTIONS = ["Pending", "Approved", "Completed", "Rejected"];

export default function BookingTable({ bookings, onStatusChange, onDelete, loading }) {
  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;

  if (!bookings.length) return <div className="text-center py-12 text-gray-500">No bookings found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Customer", "Phone", "Vehicle", "Service", "Date", "Time", "Status", "Actions"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.customerName}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{booking.phone}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{booking.vehicleNumber}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{booking.serviceType}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{booking.date}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{booking.time}</td>
              <td className="px-4 py-3"><Badge status={booking.status} /></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <select
                    value={booking.status}
                    onChange={(e) => onStatusChange(booking.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button
                    onClick={() => onDelete(booking.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
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
