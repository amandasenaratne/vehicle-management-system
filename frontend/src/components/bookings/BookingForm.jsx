import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";

const initialState = {
  customerName: "",
  phone: "",
  vehicleNumber: "",
  serviceType: "",
  date: "",
  time: "",
  notes: "",
};

export default function BookingForm({ onSuccess }) {
  const [form, setForm] = useState(initialState);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadServices = async () => {
      try {
        const { data } = await axiosInstance.get("/services");
        if (mounted) setServices(data.data);
      } catch {
        toast.error("Failed to load service list");
      } finally {
        if (mounted) setServicesLoading(false);
      }
    };

    loadServices();
    return () => {
      mounted = false;
    };
  }, []);

  const validate = () => {
    const nextErrors = {};
    if (!form.customerName.trim()) nextErrors.customerName = "Name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    if (!form.vehicleNumber.trim()) nextErrors.vehicleNumber = "Vehicle number is required";
    if (!form.serviceType) nextErrors.serviceType = "Select a service type";
    if (!form.date) nextErrors.date = "Date is required";
    if (!form.time) nextErrors.time = "Time is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/bookings", form);
      onSuccess(data.data);
      setForm(initialState);
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  const fields = useMemo(
    () => [
      { name: "customerName", label: "Customer Name", type: "text", placeholder: "John Carter" },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "+94 77 123 4567" },
      { name: "vehicleNumber", label: "Vehicle Number", type: "text", placeholder: "ABC-1234" },
      { name: "date", label: "Preferred Date", type: "date", min: new Date().toISOString().split("T")[0] },
      { name: "time", label: "Preferred Time", type: "time" },
    ],
    [],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="surface-muted p-4">
        <p className="text-sm font-semibold text-slate-700">Booking Details</p>
        <p className="mt-1 text-sm text-slate-500">All fields marked required must be completed.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {fields.map(({ name, label, type, placeholder, min }) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-slate-700">
              {label} <span className="text-rose-500">*</span>
            </label>
            <input
              id={name}
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              min={min}
              className={`input-field ${errors[name] ? "border-rose-300 ring-rose-100" : ""}`}
            />
            {errors[name] ? <p className="mt-1 text-xs font-medium text-rose-600">{errors[name]}</p> : null}
          </div>
        ))}

        <div>
          <label htmlFor="serviceType" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Service Type <span className="text-rose-500">*</span>
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className={`input-field ${errors.serviceType ? "border-rose-300 ring-rose-100" : ""}`}
            disabled={servicesLoading}
          >
            <option value="">{servicesLoading ? "Loading services..." : "Select a service"}</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.serviceType ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.serviceType}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Share any concerns, vehicle issues, or special instructions"
          className="input-field resize-none"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
        {loading ? "Submitting Request..." : "Confirm Booking Request"}
      </button>
    </form>
  );
}
