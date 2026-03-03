import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const SECTION_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

function BrandMark() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 14h16" />
        <path d="M6 14 8 8h8l2 6" />
        <path d="M6.5 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm11 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
    </span>
  );
}

export default function CustomerHeader({ active }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerUser } = useAuth();
  const displayName = customerUser?.name || customerUser?.email || "Customer";
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || "C";
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const syncScrolled = () => {
      setIsScrolled(window.scrollY > 16);
    };

    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });
    return () => window.removeEventListener("scroll", syncScrolled);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const sectionFromHash = location.hash.replace("#", "");
    if (SECTION_LINKS.some((item) => item.id === sectionFromHash)) {
      setActiveSection(sectionFromHash);
      return;
    }
    if (SECTION_LINKS.some((item) => item.id === active)) {
      setActiveSection(active);
      return;
    }
    setActiveSection("about");
  }, [location.pathname, location.hash, active]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const sectionElements = SECTION_LINKS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean);
    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-34% 0px -52% 0px",
        threshold: [0.12, 0.35, 0.6],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleSectionClick = (id) => {
    setActiveSection(id);
    if (location.pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${id}`);
      return;
    }
    navigate(`/#${id}`);
  };

  const handleBrandClick = (event) => {
    if (location.pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLandingTop = location.pathname === "/" && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isLandingTop
          ? "border-transparent bg-transparent"
          : "border-slate-200 bg-white shadow-[0_12px_34px_-26px_rgba(15,23,42,0.55)]"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
        <div className="relative flex items-center justify-between gap-4">
          <Link
            to="/"
            onClick={handleBrandClick}
            className="flex items-center gap-3"
          >
            <BrandMark />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900">
                AutoService Center
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Vehicle Management System
              </p>
            </div>
          </Link>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex">
            {SECTION_LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionClick(item.id)}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === "/" && activeSection === item.id
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            {customerUser ? (
              <div className="hidden items-center gap-4 border-r border-slate-300 pr-4 xl:flex">
                <Link
                  to="/track-booking"
                  className={`text-sm font-semibold transition-colors ${
                    active === "track"
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Track Booking
                </Link>
                <Link
                  to="/customer/portal"
                  className={`text-sm font-semibold transition-colors ${
                    active === "portal"
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  My Portal
                </Link>
              </div>
            ) : null}
            {customerUser ? (
              <Link
                to="/customer/profile"
                className="flex items-center gap-2 rounded-lg px-1 py-1 text-slate-700 transition-colors hover:text-slate-900"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-sm font-bold text-white">
                  {avatarLetter}
                </span>
                <span className="hidden text-sm font-semibold sm:inline-flex">
                  {displayName}
                </span>
              </Link>
            ) : (
              <Link to="/customer/auth" className="btn-primary text-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>

        <nav className="mt-3 flex flex-wrap items-center justify-center gap-4 lg:hidden">
          {SECTION_LINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSectionClick(item.id)}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === "/" && activeSection === item.id
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
