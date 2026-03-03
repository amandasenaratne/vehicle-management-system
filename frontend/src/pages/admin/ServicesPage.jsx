import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";
import AdminLayout from "../../components/layout/AdminLayout.jsx";
import Modal from "../../components/ui/Modal.jsx";
import useAuth from "../../hooks/useAuth.js";

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m14 7 3 3m-9 9-3-3m2-5 8-8 5 5-8 8H7v-5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M9 7V5h6v2m-7 0 1 12h6l1-12" />
    </svg>
  );
}

export default function ServicesPage() {
  const { getAuthConfig } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/services");
      setServices(data.data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      toast.error("Service name is required");
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post("/services", form, getAuthConfig("admin"));
      toast.success("Service created successfully");
      setForm({ name: "", description: "" });
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create service");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axiosInstance.delete(`/services/${id}`, getAuthConfig("admin"));
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <AdminLayout title="Service Categories" subtitle="Maintain the service catalog used for customer bookings">
      <section className="panel-header">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Catalog</h3>
          <p className="text-sm text-slate-600">Create and manage available workshop service categories.</p>
        </div>
        <button type="button" onClick={() => setIsModalOpen(true)} className="btn-primary text-sm">
          Add Service
        </button>
      </section>

      {loading ? (
        <div className="surface-card flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="surface-card p-5">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <WrenchIcon />
              </div>
              <div className="mb-5">
                <h4 className="text-lg font-bold text-slate-900">{service.name}</h4>
                <p className="mt-1 text-sm text-slate-600">{service.description || "No description provided yet."}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(service.id)}
                className="btn-danger w-full text-sm"
              >
                <TrashIcon />
                Remove Service
              </button>
            </article>
          ))}

          {!services.length ? (
            <div className="surface-card col-span-full p-10 text-center">
              <p className="text-base font-semibold text-slate-700">No services configured yet</p>
              <p className="mt-1 text-sm text-slate-500">Create your first service category to start accepting bookings.</p>
            </div>
          ) : null}
        </section>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Service Category">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="serviceName" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Service Name
            </label>
            <input
              id="serviceName"
              type="text"
              value={form.name}
              onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
              className="input-field"
              placeholder="Oil Change"
              required
            />
          </div>
          <div>
            <label htmlFor="serviceDescription" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="serviceDescription"
              value={form.description}
              onChange={(event) => setForm((previous) => ({ ...previous, description: event.target.value }))}
              className="input-field resize-none"
              rows={4}
              placeholder="Describe this service category"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? "Creating..." : "Create Service"}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
