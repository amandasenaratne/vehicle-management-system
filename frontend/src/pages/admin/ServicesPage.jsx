import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import Modal from "../../components/ui/Modal.jsx";
import axiosInstance from "../../api/axiosInstance.js";
import toast from "react-hot-toast";

export default function ServicesPage() {
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

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Service name is required");
    setSubmitting(true);
    try {
      await axiosInstance.post("/services", form);
      toast.success("Service created successfully");
      setForm({ name: "", description: "" });
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create service");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axiosInstance.delete(`/services/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Service Categories" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Manage available service types</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              + Add Service
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl mb-2">🔧</div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      {service.description && (
                        <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-400 hover:text-red-600 text-sm transition-colors ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              {!services.length && (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  No services yet. Add your first service category.
                </div>
              )}
            </div>
          )}

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Service Category">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Oil Change"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Brief description..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? "Creating..." : "Create Service"}
                </button>
              </div>
            </form>
          </Modal>
        </main>
      </div>
    </div>
  );
}
