import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance.js";

const initialState = {
  customerName: "", phone: "", vehicleNumber: "",
  serviceType: "", date: "", time: "", notes: "",
};

export default function BookingForm({ onSuccess }) {
  const [form, setForm] = useState(initialState);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance.get("/services").then(({ data }) => setServices(data.data)).catch(console.error);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.customerName.trim()) newErrors.customerName = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle number is required";
    if (!form.serviceType) newErrors.serviceType = "Please select a service";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/bookings", form);
      onSuccess(data.data);
      setForm(initialState);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const fields = [
    { name: "customerName", label: "Full Name", type: "text", placeholder: "John Doe" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+94 77 123 4567" },
    { name: "vehicleNumber", label: "Vehicle Number", type: "text", placeholder: "ABC-1234" },
    { name: "date", label: "Preferred Date", type: "date", min: today },
    { name: "time", label: "Preferred Time", type: "time" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(({ name, label, type, placeholder, min }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              min={min}
              className={`input-field ${errors[name] ? "border-red-400 focus:ring-red-400" : ""}`}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className={`input-field ${errors.serviceType ? "border-red-400 focus:ring-red-400" : ""}`}
          >
            <option value="">Select a service</option>
            {services.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any specific concerns or requests..."
          className="input-field resize-none"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
        {loading ? "Submitting..." : "Book Appointment"}
      </button>
    </form>
  );
}
