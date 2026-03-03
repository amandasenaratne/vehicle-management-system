import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import CustomerHeader from "../components/layout/CustomerHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";

const process = [
  {
    title: "Create Account",
    description: "Sign up with your name, email, and password to access your secure customer workspace.",
  },
  {
    title: "Book Appointment",
    description: "Select service category, preferred date, and timeslot through the guided booking flow.",
  },
  {
    title: "Track Progress",
    description: "Monitor status changes and complete service history from your customer portal.",
  },
];

function useCountUp(target, duration = 1700) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId = null;
    const startedAt = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(target * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  return count;
}

function AnimatedMetric({ label, value, decimals = 0, suffix = "" }) {
  const animated = useCountUp(value);
  const rounded = Number(animated.toFixed(decimals));
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rounded);

  return (
    <div data-reveal className="rounded-2xl border border-slate-200 bg-white/75 px-5 py-4 text-center shadow-[0_18px_38px_-30px_rgba(15,23,42,0.65)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-900">
        {formatted}
        {suffix}
      </p>
    </div>
  );
}

export default function LandingPage() {
  const [services, setServices] = useState([]);
  const location = useLocation();

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

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.replace("#", "");
    const section = document.getElementById(sectionId);
    if (!section) return;
    setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }, [location.hash]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <CustomerHeader active="home" />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <section id="home" className="scroll-mt-24 mx-auto w-full max-w-6xl px-4 pb-12 pt-12 text-center sm:px-6 lg:pb-16 lg:pt-16">
          <p data-reveal className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Premium Vehicle Care
          </p>
          <h2 data-reveal className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Enterprise-Grade Vehicle Service Management
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Reliable diagnostics, preventive maintenance, and transparent booking workflows for modern drivers and fleet owners.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/customer/auth" className="btn-primary px-6 py-3">
              Create Account
            </Link>
            <Link to="/track-booking" className="btn-secondary px-6 py-3">
              Track Existing Booking
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
            <AnimatedMetric label="Years in Service" value={12} suffix="+" />
            <AnimatedMetric label="Completed Jobs" value={18500} suffix="+" />
            <AnimatedMetric label="Customer Satisfaction" value={98.4} suffix="%" decimals={1} />
          </div>
          <p data-reveal className="mx-auto mt-5 max-w-2xl text-sm text-slate-600">
            Customer Portal Enabled. Log in to review booking history, dates, services, and current statuses.
          </p>
        </section>

        <section id="about" className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6">
          <div data-reveal className="surface-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">About</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Trusted by Daily Drivers and Fleet Teams</h3>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
              AutoService Center delivers reliable maintenance and repair operations with transparent communication, predictable turnaround times, and consistent service quality across every appointment.
            </p>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:pb-12">
          <div data-reveal className="surface-card p-6 sm:p-8">
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
              {(services.length
                ? services
                : [{ id: "fallback", name: "General Inspection", description: "Complete multi-point health check for your vehicle." }]
              ).map((service) => (
                <article key={service.id} className="surface-muted p-4">
                  <h4 className="text-base font-bold text-slate-900">{service.name}</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    {service.description || "Professional service delivered by certified technicians."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:pb-12">
          <div data-reveal className="surface-card p-6 sm:p-8">
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

        <section id="contact" className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:pb-16">
          <div data-reveal className="surface-card p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Staff or operations team?</p>
              <Link to="/admin" className="btn-secondary text-sm">
                Open Admin Access Portal
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
