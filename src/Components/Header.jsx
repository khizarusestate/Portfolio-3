import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

const navLinks = ["Home", "About", "Portfolio", "Contact"];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      const sections = navLinks
        .map((item) => document.getElementById(item.toLowerCase()))
        .filter(Boolean);
      const center = window.scrollY + window.innerHeight * 0.35;
      const current = sections.find((section) => {
        const start = section.offsetTop;
        const end = start + section.offsetHeight;
        return center >= start && center < end;
      });
      if (current) {
        setActive(current.id[0].toUpperCase() + current.id.slice(1));
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (link) => {
    setActive(link);
    setMobileMenuOpen(false);
    const element = document.getElementById(link.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDownloadCv = () => {
    window.location.href = "/assets/CV.pdf";
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-green-300 z-[70]"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[min(96%,1100px)] z-50"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "bg-black/55 border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              : "bg-black/25 border-white/10 backdrop-blur-xl"
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_35%,rgba(114,46,255,0.12))]" />
          <div className="relative flex h-[62px] items-center justify-between px-4 md:px-6">
            <button
              onClick={handleDownloadCv}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-[10px] font-semibold tracking-[1.3px] uppercase text-white transition-all hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-black/55 hover:shadow-[0_8px_24px_rgba(56,189,248,0.3)] md:px-4 md:text-[11px]"
            >
              <ArrowDownToLine size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </button>

            <ul className="hidden md:flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {navLinks.map((item) => {
                const isActive = active === item;
                return (
                  <li key={item}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`relative rounded-lg px-4 py-2 text-[12px] font-semibold tracking-[1.5px] uppercase transition-colors ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-lg border border-white/20 bg-gradient-to-r from-white/18 to-white/8"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => handleNavClick("Contact")}
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[1.8px] uppercase text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
            >
              Let&apos;s Talk <ArrowUpRight size={14} />
            </button>

            <button
              className="md:hidden relative h-10 w-10 rounded-xl border border-white/20 bg-white/5"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              <span className="sr-only">Toggle menu</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10" />
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 0 : -5 }}
                className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 bg-white"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 bg-white"
              />
              <motion.span
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? 0 : 5 }}
                className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 bg-white"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-[84px] left-1/2 -translate-x-1/2 z-40 w-[94%] overflow-hidden rounded-2xl border border-white/15 bg-black/80 backdrop-blur-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="p-3">
              <a
                href="/assets/CV.pdf"
                download="Khizar-Hayat-CV.pdf"
                className="mb-2 flex w-full items-center justify-between rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-4 py-3 text-left text-[11px] font-semibold tracking-[1.5px] uppercase text-cyan-100"
              >
                <span>Download CV</span>
                <ArrowDownToLine size={14} />
              </a>
              {navLinks.map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`mb-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[12px] font-semibold tracking-[1.5px] uppercase ${
                    active === item
                      ? "bg-white/12 text-white border border-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/8"
                  }`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span>{item}</span>
                  <ArrowUpRight size={14} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

