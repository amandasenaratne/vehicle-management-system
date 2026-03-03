import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const SECTION_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

const LANDING_PATHS = ["/", "/about", "/services", "/process", "/contact", "/faq", "/reviews"];

function BrandMark() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden">
      <img src="/imgs/logo.png" alt="AutoService Center logo" className="h-full w-full object-cover" />
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItemsVisible, setNavItemsVisible] = useState(false);

  useEffect(() => {
    if (!LANDING_PATHS.includes(location.pathname)) {
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
    if (!LANDING_PATHS.includes(location.pathname)) return;
    const sectionFromPath = location.pathname.replace("/", "").trim();
    if (SECTION_LINKS.some((item) => item.id === sectionFromPath)) {
      setActiveSection(sectionFromPath);
      return;
    }
    if (SECTION_LINKS.some((item) => item.id === active)) {
      setActiveSection(active);
      return;
    }
    setActiveSection("about");
  }, [location.pathname, active]);

  useEffect(() => {
    if (!LANDING_PATHS.includes(location.pathname)) return;
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setNavItemsVisible(false);
    let timerId = null;
    const frame = requestAnimationFrame(() => {
      timerId = setTimeout(() => setNavItemsVisible(true), 40);
    });
    return () => {
      cancelAnimationFrame(frame);
      if (timerId) clearTimeout(timerId);
    };
  }, [location.pathname]);

  const handleSectionClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const destination = `/${id}`;
    if (LANDING_PATHS.includes(location.pathname)) {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (location.pathname !== destination) {
        navigate(destination);
      }
      return;
    }
    navigate(destination);
  };

  const handleBrandClick = (event) => {
    if (!LANDING_PATHS.includes(location.pathname)) return;
    event.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLandingTop = LANDING_PATHS.includes(location.pathname) && !isScrolled;

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
            {SECTION_LINKS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionClick(item.id)}
                style={{ transitionDelay: `${120 + index * 90}ms` }}
                className={`text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                } transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  navItemsVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center text-slate-900 transition-opacity hover:opacity-70 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.1">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <div className="hidden items-center justify-end gap-3 lg:flex">
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
                  <span className="text-sm font-semibold">{displayName}</span>
                </Link>
              ) : (
                <Link to="/customer/auth" className="btn-primary text-sm">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            mobileMenuOpen ? "" : "pointer-events-none"
          }`}
        >
          <button
            type="button"
            className={`absolute inset-0 bg-slate-900/25 transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside
            className={`absolute bottom-0 left-0 top-0 w-[75vw] max-w-sm border-r border-slate-200 bg-white p-3 shadow-[0_30px_60px_-32px_rgba(15,23,42,0.7)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-[105%]"
            }`}
          >
            <div className="mb-2 flex items-center justify-between border-b border-slate-200 px-1 pb-3">
              <p className="text-sm font-bold text-slate-900">Menu</p>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center text-slate-700"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.1">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              {SECTION_LINKS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectionClick(item.id)}
                  className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    activeSection === item.id
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {customerUser ? (
                <>
                  <Link
                    to="/track-booking"
                    className="mt-1 block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Track Booking
                  </Link>
                  <Link
                    to="/customer/portal"
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Portal
                  </Link>
                  <Link
                    to="/customer/profile"
                    className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-semibold text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {displayName}
                  </Link>
                </>
              ) : (
                <Link
                  to="/customer/auth"
                  className="mt-2 block w-full rounded-lg bg-slate-900 px-3 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </aside>
        </div>
      </div>
    </header>
  );
}
