import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import CustomerHeader from "../components/layout/CustomerHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";

const process = [
  {
    title: "Create Account",
    description:
      "Sign up with your name, email, and password to access your secure customer workspace.",
  },
  {
    title: "Book Appointment",
    description:
      "Select service category, preferred date, and timeslot through the guided booking flow.",
  },
  {
    title: "Track Progress",
    description:
      "Monitor status changes and complete service history from your customer portal.",
  },
];

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M12 3 5 6v6c0 4.4 2.9 7.8 7 9 4.1-1.2 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="m14 7 3 3m-9 9-3-3m2-5 8-8 5 5-8 8H7v-5Z" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <rect x="3.5" y="4.5" width="7" height="5" rx="1.2" />
      <rect x="13.5" y="4.5" width="7" height="5" rx="1.2" />
      <rect x="8.5" y="14.5" width="7" height="5" rx="1.2" />
      <path d="M10.5 7h3M12 9.5v5" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M4 10h4l2-3h4l2 3h4v8H4z" />
      <path d="M8 18v2m8-2v2M9 10V7m6 3V7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 12h3v3H8z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="m12 3 2.3 4.7L19 10l-4.7 2.3L12 17l-2.3-4.7L5 10l4.7-2.3L12 3Z" />
      <path d="m6 18 1.1 2.2L9.3 21l-2.2 1.1L6 24l-1.1-1.9L2.7 21l2.2-.8L6 18Z" />
    </svg>
  );
}

function SafetyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M12 3 6 6v5c0 4.4 2.4 7.7 6 10 3.6-2.3 6-5.6 6-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path d="M6.5 3.5h3l1.3 3.4-1.9 1.7a14 14 0 0 0 6.3 6.3l1.7-1.9 3.4 1.3v3a2 2 0 0 1-2.2 2 17 17 0 0 1-13.9-14 2 2 0 0 1 2.3-2.1Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9.2a2.6 2.6 0 1 1 4.3 2c-.7.5-1.4 1-1.4 2v.4" />
      <circle cx="12" cy="16.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
    </svg>
  );
}

const serviceIcons = [
  EngineIcon,
  ToolsIcon,
  SafetyIcon,
  CalendarIcon,
  SparkIcon,
  WorkflowIcon,
];

const fallbackServices = [
  {
    id: "fallback-1",
    name: "General Inspection",
    description: "Complete multi-point health check for your vehicle.",
  },
  {
    id: "fallback-2",
    name: "Preventive Maintenance",
    description: "Routine maintenance package to prevent downtime.",
  },
  {
    id: "fallback-3",
    name: "Diagnostics",
    description: "Digital fault detection and system-level assessment.",
  },
  {
    id: "fallback-4",
    name: "Brake & Safety",
    description: "Critical safety systems inspection and servicing.",
  },
  {
    id: "fallback-5",
    name: "Engine Tune-Up",
    description: "Performance optimization and fuel efficiency tuning.",
  },
  {
    id: "fallback-6",
    name: "Electrical Service",
    description: "Battery, alternator, and electrical system support.",
  },
];

const aboutFeatures = [
  {
    title: "Certified Service Standards",
    description:
      "Our workshop practices follow structured quality checkpoints so every appointment meets consistent reliability and safety standards.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Modern Diagnostic Capability",
    description:
      "From routine servicing to advanced inspections, we combine skilled technicians with digital tooling for faster and more accurate outcomes.",
    Icon: ToolsIcon,
  },
  {
    title: "Transparent Service Workflow",
    description:
      "Every booking progresses through a clear status pipeline, giving customers operational visibility from request to completion.",
    Icon: WorkflowIcon,
  },
];

const contactChannels = [
  {
    label: "Location",
    title: "Colombo Workshop Hub",
    detail:
      "Dedicated intake and diagnostics facility for daily vehicles and fleet operations.",
    Icon: MapPinIcon,
  },
  {
    label: "Hotline",
    title: "+94 11 555 0190",
    detail:
      "Live support for booking coordination, service updates, and urgent inquiries.",
    Icon: PhoneIcon,
  },
  {
    label: "Email",
    title: "support@autoservice.example",
    detail:
      "Structured ticket handling for estimates, service records, and follow-up care.",
    Icon: MailIcon,
  },
];

const faqItems = [
  {
    question: "How do I create my first appointment?",
    answer:
      "Create your account, choose a service category, select a preferred date and time slot, then submit your booking request in a few steps.",
  },
  {
    question: "Can I track my booking after confirmation?",
    answer:
      "Yes. Your portal shows live status updates, service history, and appointment timelines so you always know the current progress.",
  },
  {
    question: "Do you handle fleet and business vehicles?",
    answer:
      "We support both individual drivers and fleet operators with structured workflows, preventive schedules, and centralized service visibility.",
  },
  {
    question: "How will I know when service is completed?",
    answer:
      "You will see completion updates in your portal and can review the final service record with date, category, and status details.",
  },
];

const customerReviews = [
  {
    name: "A. Perera",
    role: "Daily Driver",
    service: "Preventive Maintenance",
    rating: 5,
    quote:
      "The booking flow was fast and transparent. Every status update appeared on time, and the handover quality was excellent.",
  },
  {
    name: "S. Fernando",
    role: "Fleet Coordinator",
    service: "Fleet Diagnostics",
    rating: 5,
    quote:
      "Clear communication and reliable turnaround. The portal makes it easy to track multiple vehicle jobs without confusion.",
  },
  {
    name: "K. Jayasinghe",
    role: "Business Owner",
    service: "Brake and Safety Service",
    rating: 5,
    quote:
      "Professional team, predictable timelines, and clean service records. It feels like a proper premium support experience.",
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

function AnimatedMetric({ label, value, decimals = 0, suffix = "", Icon }) {
  const animated = useCountUp(value);
  const rounded = Number(animated.toFixed(decimals));
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rounded);

  return (
    <div
      data-reveal
      className="flex min-h-[128px] items-center gap-4 rounded-xl border border-slate-200 bg-white/75 px-5 py-5 text-left shadow-[0_18px_38px_-30px_rgba(15,23,42,0.65)] backdrop-blur sm:px-6 sm:py-6"
    >
      {Icon ? (
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
          <Icon />
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </p>
        <p className="mt-2 text-3xl font-extrabold text-slate-900">
          {formatted}
          {suffix}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [services, setServices] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const location = useLocation();
  const servicesList = services.length ? services : fallbackServices;
  const maxSlideIndex = Math.max(servicesList.length - cardsPerView, 0);
  const totalPages = Math.max(Math.ceil(servicesList.length / cardsPerView), 1);
  const activePage = Math.floor(slideIndex / cardsPerView);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await axiosInstance.get("/services?active=true");
        setServices(data.data);
      } catch {
        setServices([]);
      }
    };

    loadServices();
  }, []);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return undefined;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  useEffect(() => {
    const sectionId = location.pathname.replace("/", "").trim();
    if (!sectionId) return;

    const validSections = new Set([
      "about",
      "services",
      "process",
      "contact",
      "faq",
      "reviews",
    ]);
    if (!validSections.has(sectionId)) return;

    const section = document.getElementById(sectionId);
    if (!section) return;
    setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }, [location.pathname]);

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

  useEffect(() => {
    const syncCardsPerView = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    syncCardsPerView();
    window.addEventListener("resize", syncCardsPerView);
    return () => window.removeEventListener("resize", syncCardsPerView);
  }, []);

  useEffect(() => {
    setSlideIndex((current) => Math.min(current, maxSlideIndex));
  }, [maxSlideIndex]);

  useEffect(() => {
    if (isCarouselPaused || maxSlideIndex <= 0) return undefined;
    const intervalId = setInterval(() => {
      setSlideIndex((current) => {
        const next = current + cardsPerView;
        return next > maxSlideIndex ? 0 : next;
      });
    }, 4600);
    return () => clearInterval(intervalId);
  }, [isCarouselPaused, maxSlideIndex, cardsPerView]);

  return (
    <div className="min-h-screen">
      <CustomerHeader active="home" />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <section
          id="home"
          className="scroll-mt-24 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-[100px] text-center sm:px-6 lg:pb-24 lg:pt-[116px] 2xl:pt-[124px]"
        >
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
          >
            Premium Vehicle Care
          </p>
          <h2
            data-reveal
            className="mx-auto mt-4 max-w-5xl text-[1.75rem] font-extrabold leading-[1.12] text-slate-900 sm:text-[clamp(2.5rem,6vw,4.9rem)] sm:leading-[1.06]"
          >
            Service That Matches
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Your Standards
          </h2>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[1.15rem]"
          >
            Reliable diagnostics, preventive maintenance, and transparent
            booking workflows for modern drivers and fleet owners.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/customer/auth" className="btn-primary px-6 py-3">
              Sign Up
            </Link>
            <Link to="/track-booking" className="btn-secondary px-6 py-3">
              Track Existing Booking
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-14 2xl:gap-6">
            <AnimatedMetric
              label="Years in Service"
              value={12}
              suffix="+"
              Icon={CalendarIcon}
            />
            <AnimatedMetric
              label="Completed Jobs"
              value={18500}
              suffix="+"
              Icon={ToolsIcon}
            />
            <AnimatedMetric
              label="Customer Satisfaction"
              value={98.4}
              suffix="%"
              decimals={1}
              Icon={ShieldCheckIcon}
            />
          </div>
          <p
            data-reveal
            className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-slate-600"
          >
            Customer Portal Enabled. Log in to review booking history, dates,
            services, and current statuses.
          </p>
        </section>

        <section
          id="about"
          className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-16"
        >
          <div data-reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              About
            </p>
            <h3 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Trusted by Daily Drivers and Fleet Teams
            </h3>
          </div>

          <div className="surface-card mt-10 p-8 sm:mt-12 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-7">
                {[
                  { label: "Average Turnaround", value: "24-48 Hrs" },
                  { label: "Technician Team", value: "35+" },
                  { label: "Operational Uptime", value: "99.2%" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    data-reveal
                    style={{ transitionDelay: `${index * 110}ms` }}
                    className="surface-muted p-6 text-center lg:p-7"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-10 text-base leading-8 text-slate-600">
                Axis AutoCare Center operates as a modern vehicle service
                partner focused on consistency, transparency, and delivery
                discipline. Our goal is to turn traditional workshop operations
                into a clear, trackable customer experience where every booking,
                update, and final handover is visible and dependable.
              </p>
              <p className="mt-6 text-base leading-8 text-slate-600">
                We serve both individual vehicle owners and operational fleets
                with structured service workflows, experienced technicians, and
                measurable quality controls. From preventive maintenance to
                detailed diagnostics, each service request is managed with
                process rigor and communication clarity to ensure predictable
                turnaround and premium customer confidence.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
              {aboutFeatures.map(({ title, description, Icon }, index) => (
                <article
                  key={title}
                  data-reveal
                  style={{ transitionDelay: `${index * 110}ms` }}
                  className="surface-muted h-full p-6 text-center transition-transform duration-300 hover:-translate-y-1 lg:p-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Icon />
                  </span>
                  <h4 className="mt-4 text-lg font-bold text-slate-900">
                    {title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-16"
        >
          <div data-reveal className="w-full">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Services
              </p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Workshop Capabilities
              </h3>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Structured service modules designed for reliability, safety, and
                measurable operational quality.
              </p>
            </div>

            <div className="surface-card mt-10 p-8 sm:mt-12 sm:p-10 lg:p-12">
              <div
                className="relative"
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setSlideIndex((current) => {
                      if (current <= 0) return maxSlideIndex;
                      return Math.max(current - cardsPerView, 0);
                    })
                  }
                  className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/85 text-slate-700 transition-colors hover:bg-white md:inline-flex"
                  aria-label="Previous services"
                >
                  <ChevronLeftIcon />
                </button>

                <div className="overflow-hidden px-0 md:px-14">
                  <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: `translateX(-${(slideIndex * 100) / cardsPerView}%)`,
                    }}
                  >
                    {servicesList.map((service, index) => {
                      const Icon = serviceIcons[index % serviceIcons.length];
                      return (
                        <div
                          key={service.id}
                          className="w-full shrink-0 px-2"
                          style={{
                            flexBasis: `${100 / cardsPerView}%`,
                          }}
                        >
                          <article className="h-full rounded-2xl border border-slate-200/90 bg-white/72 p-6 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                              <Icon />
                            </span>
                            <h4 className="mt-4 text-lg font-bold text-slate-900">
                              {service.name}
                            </h4>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                              {service.description ||
                                "Professional service delivered by certified technicians with standardized quality checks."}
                            </p>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSlideIndex((current) => {
                      const next = current + cardsPerView;
                      return next > maxSlideIndex ? 0 : next;
                    })
                  }
                  className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/85 text-slate-700 transition-colors hover:bg-white md:inline-flex"
                  aria-label="Next services"
                >
                  <ChevronRightIcon />
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setSlideIndex(
                        Math.min(index * cardsPerView, maxSlideIndex),
                      )
                    }
                    className={`h-2.5 rounded-full transition-all ${
                      activePage === index
                        ? "w-8 bg-blue-600"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Link
                  to="/customer/auth"
                  className="btn-primary px-8 py-3 text-sm"
                >
                  Book a Service
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-16"
        >
          <div data-reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              How It Works
            </p>
            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              Service Journey in Three Steps
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-600">
              A streamlined operational flow from customer onboarding to
              real-time tracking and final service completion.
            </p>
          </div>

          <div
            data-reveal
            className="surface-card mt-10 overflow-hidden p-8 sm:mt-12 sm:p-10 lg:p-12"
          >
            <div className="space-y-4 md:hidden">
              {process.map((item, index) => {
                const StepIcon = [ShieldCheckIcon, CalendarIcon, WorkflowIcon][
                  index % 3
                ];
                return (
                  <div key={item.title}>
                    <article
                      data-reveal
                      style={{ transitionDelay: `${index * 110}ms` }}
                      className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_18px_32px_-28px_rgba(15,23,42,0.75)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                          <StepIcon />
                        </span>
                      </div>
                      <h4 className="mt-4 text-lg font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                    {index < process.length - 1 ? (
                      <div className="my-2 flex justify-center text-blue-400/90">
                        <svg
                          viewBox="0 0 24 32"
                          className="h-8 w-8"
                          fill="none"
                        >
                          <path
                            d="M12 2v11h6v8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="m13 18 5 5 5-5"
                            transform="translate(-6 4)"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-4 lg:gap-6">
              {process.map((item, index) => {
                const StepIcon = [ShieldCheckIcon, CalendarIcon, WorkflowIcon][
                  index % 3
                ];
                return (
                  <div key={item.title} className="contents">
                    <article
                      data-reveal
                      style={{ transitionDelay: `${index * 110}ms` }}
                      className={`h-full rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_18px_32px_-28px_rgba(15,23,42,0.75)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_-28px_rgba(15,23,42,0.8)] lg:p-7 ${
                        index === 1 ? "md:translate-y-7" : "md:-translate-y-2"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                          <StepIcon />
                        </span>
                      </div>
                      <h4 className="mt-4 text-lg font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                    {index < process.length - 1 ? (
                      <div className="hidden md:flex items-center justify-center text-blue-400/90">
                        <svg
                          viewBox="0 0 72 40"
                          className="h-10 w-[72px]"
                          fill="none"
                        >
                          <path
                            d={
                              index === 0
                                ? "M2 14h20v12h22V14h20"
                                : "M2 26h20V14h22v12h20"
                            }
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d={index === 0 ? "m61 8 7 6-7 6" : "m61 20 7 6-7 6"}
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-16"
        >
          <div data-reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Q&A
            </p>
            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Quick answers to common customer and fleet booking questions.
            </p>
          </div>

          <div className="surface-card mt-10 p-8 sm:mt-12 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
              {faqItems.map((item, index) => (
                <article
                  key={item.question}
                  data-reveal
                  style={{ transitionDelay: `${index * 90}ms` }}
                  className="surface-muted h-full p-5 sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <HelpCircleIcon />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {item.question}
                      </h4>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="reviews"
          className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-16"
        >
          <div data-reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Ratings & Reviews
            </p>
            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              Trusted Feedback from Real Customers
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Verified service experiences from drivers and operational teams.
            </p>
          </div>

          <div className="surface-card mt-10 p-8 sm:mt-12 sm:p-10 lg:p-12">
            <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 text-center">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <ShieldCheckIcon />
              </span>
              <p className="text-sm font-semibold text-slate-700">
                4.9/5 average rating from verified service feedback.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-10 lg:gap-6">
              {customerReviews.map((review, index) => (
                <article
                  key={`${review.name}-${review.service}`}
                  data-reveal
                  style={{ transitionDelay: `${index * 110}ms` }}
                  className="h-full rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_18px_32px_-28px_rgba(15,23,42,0.75)]"
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span
                        key={starIndex}
                        className={
                          starIndex < review.rating
                            ? "text-amber-400"
                            : "text-slate-300"
                        }
                      >
                        <StarIcon />
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    "{review.quote}"
                  </p>
                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <p className="text-sm font-bold text-slate-900">
                      {review.name}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-500">
                      {review.role}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-blue-700">
                      {review.service}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pb-24 lg:pt-16"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-[#d5e2f4] bg-gradient-to-br from-[#102e58] via-[#174983] to-[#1f63aa] px-6 py-10 text-white shadow-[0_30px_65px_-38px_rgba(12,26,49,0.95)] sm:px-10 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl" />

            <div data-reveal className="relative z-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">
                  Contact
                </p>
                <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  Reach Our Service Desk
                </h3>
                <p className="mt-4 text-base leading-8 text-blue-50/95">
                  Connect with our support and operations teams through
                  structured channels designed for fast response and clear
                  resolution.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-12 lg:gap-6">
                {contactChannels.map(
                  ({ label, title, detail, Icon }, index) => (
                    <article
                      key={label}
                      data-reveal
                      style={{ transitionDelay: `${index * 110}ms` }}
                      className="h-full rounded-2xl border border-white/25 bg-white/10 p-5 text-center backdrop-blur lg:p-6"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                        <Icon />
                      </span>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-blue-100">
                        {label}
                      </p>
                      <p className="mt-2 text-sm font-bold text-white lg:text-base">
                        {title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-blue-50/90">
                        {detail}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
