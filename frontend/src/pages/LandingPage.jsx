import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import CustomerHeader from "../components/layout/CustomerHeader.jsx";

const highlights = [
  { label: "Years in Service", value: "12+" },
  { label: "Completed Jobs", value: "18,500+" },
  { label: "Customer Satisfaction", value: "98.4%" },
];

const process = [
  {
    title: "Create Account",
    description: "Sign up with your name, email, and password to access your service portal.",
  },
  {
    title: "Book Appointment",
    description: "Choose your required service, preferred date, and time in a guided booking form.",
  },
  {
    title: "Track Progress",
    description: "View real-time status and complete service history from your dashboard.",
  },
];

export default function LandingPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await axiosInstance.get("/services?active=true");
        setServices(data.data.slice(0, 6));
      } catch {
        setServices([]);
      }
    };

    loadServices();
  }, []);

  return (
    <div className="min-h-screen">
      <CustomerHeader active="home" />

      <main>
        <section className="border-b border-slate-200 bg-white/70">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-2 px-4 py-3 sm:px-6">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#services", label: "Services" },
              { href: "#process", label: "Process" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <section id="home" className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-14 lg:pt-12">
          <article className="surface-card relative overflow-hidden p-7 sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(11,94,215,0.14),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(21,128,61,0.12),transparent_30%)]" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Premium Vehicle Care</p>
              <h2 className="mt-3 max-w-xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                Enterprise-Grade Vehicle Service Management
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                Reliable diagnostics, preventive maintenance, and transparent booking workflows for modern drivers and fleet owners.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/customer/auth" className="btn-primary px-6 py-3">
                  Create Account
                </Link>
                <Link to="/track-booking" className="btn-secondary px-6 py-3">
                  Track Existing Booking
                </Link>
              </div>
            </div>
          </article>

          <aside className="surface-card p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">At a Glance</p>
            <div className="mt-4 space-y-3">
              {highlights.map((item) => (
                <div key={item.label} className="surface-muted flex items-center justify-between p-4">
                  <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                  <span className="text-lg font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-900">Customer Portal Enabled</p>
              <p className="mt-1 text-sm text-blue-800">Log in to review booking history, dates, services, and current statuses.</p>
            </div>
          </aside>
        </section>

        <section id="about" className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6">
          <div className="surface-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">About</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Trusted by Daily Drivers and Fleet Teams</h3>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
              AutoService Center delivers reliable maintenance and repair operations with transparent communication, predictable turnaround times, and consistent service quality across every appointment.
            </p>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:pb-12">
          <div className="surface-card p-6 sm:p-8">
            <div className="panel-header">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Services</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Workshop Capabilities</h3>
              </div>
              <Link to="/customer/auth" className="btn-secondary text-sm">
                Book a Service
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(services.length ? services : [{ id: "fallback", name: "General Inspection", description: "Complete multi-point health check for your vehicle." }]).map(
                (service) => (
                  <article key={service.id} className="surface-muted p-4">
                    <h4 className="text-base font-bold text-slate-900">{service.name}</h4>
                    <p className="mt-1 text-sm text-slate-600">{service.description || "Professional service delivered by certified technicians."}</p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:pb-12">
          <div className="surface-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">How It Works</p>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {process.map((item, index) => (
                <article key={item.title} className="surface-muted p-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h4 className="mt-3 text-base font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:pb-16">
          <div className="surface-card grid grid-cols-1 gap-4 p-6 sm:grid-cols-3 sm:p-8">
            <div className="surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Location</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Colombo Workshop Hub</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Hotline</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">+94 11 555 0190</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Email</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">support@autoservice.example</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
