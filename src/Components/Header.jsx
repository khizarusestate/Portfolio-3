import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowDownToLine, ArrowUpRight, Sparkles } from "lucide-react";

const navLinks = ["Home", "About", "Portfolio", "Contact"];

function MagnetWrap({ children, strength = 0.22 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ x: sx, y: sy }}>{children}</motion.div>
    </div>
  );
}

export default function Header() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = navLinks.map((item) => document.getElementById(item.toLowerCase())).filter(Boolean);
      const marker = window.scrollY + window.innerHeight * 0.36;
      const current = sections.find((section) => marker >= section.offsetTop && marker < section.offsetTop + section.offsetHeight);
      if (current) setActive(current.id[0].toUpperCase() + current.id.slice(1));
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event) => { if (event.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  const handleNavClick = (link) => {
    setActive(link);
    setMobileMenuOpen(false);
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownloadCv = () => { window.location.href = "/assets/CV.pdf"; };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 z-[70] shadow-[0_0_12px_rgba(103,232,249,0.65)]"
        style={{ width: scrollProgress + "%" }}
      />

      <motion.nav
        aria-label="Main navigation"
        className="fixed top-3 md:top-5 left-1/2 -translate-x-1/2 w-[min(96%,1180px)] z-50"
        initial={{ y: -34, opacity: 0, scale: 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={"group/nav relative isolate overflow-hidden rounded-[22px] border transition-all duration-500 " + (scrolled
          ? "bg-[#080a12]/85 border-white/[0.15] shadow-[0_18px_55px_rgba(0,0,0,0.52),0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur-2xl"
          : "bg-[#080a12]/55 border-white/[0.11] shadow-[0_12px_42px_rgba(0,0,0,0.25)] backdrop-blur-xl")}>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(255,255,255,0.075),transparent_24%,transparent_70%,rgba(139,92,246,0.10))]" />
          <div className="absolute -top-20 left-[28%] -z-10 h-32 w-64 rounded-full bg-cyan-400/[0.08] blur-3xl transition-opacity duration-700 group-hover/nav:bg-cyan-400/[0.12]" />
          <div className="absolute -bottom-24 right-[18%] -z-10 h-36 w-64 rounded-full bg-violet-500/[0.09] blur-3xl" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="relative flex h-[68px] items-center justify-between px-3.5 sm:px-5 md:px-6">
            <MagnetWrap>
              <button onClick={() => handleNavClick("Home")} aria-label="Go to home" className="group/brand flex items-center gap-3 rounded-xl text-left outline-none">
                <span className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-[13px] border border-white/15 bg-gradient-to-br from-white/[0.13] to-white/[0.025] shadow-[0_5px_18px_rgba(0,0,0,0.25)]">
                  <span className="absolute inset-0 bg-gradient-to-br from-cyan-300/15 via-transparent to-violet-400/20 opacity-70 transition-opacity group-hover/brand:opacity-100" />
                  <span className="relative font-['Exo_2'] text-[15px] font-bold tracking-[-1px] text-white">KH<span className="text-cyan-300">.</span></span>
                </span>
                <span className="hidden sm:flex flex-col gap-[3px]">
                  <span className="font-['Exo_2'] text-[11px] font-bold tracking-[2.1px] text-white/90">KHIZAR HAYAT</span>
                  <span className="flex items-center gap-1.5 text-[8px] font-medium tracking-[1.8px] text-white/40">
                    <span className="h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_7px_rgba(110,231,183,0.8)]" />
                    SOFTWARE ENGINEER
                  </span>
                </span>
              </button>
            </MagnetWrap>

            <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-[15px] border border-white/[0.09] bg-black/25 p-1 md:flex">
              {navLinks.map((item) => {
                const isActive = active === item;
                return (
                  <li key={item}>
                    <button onClick={() => handleNavClick(item)} aria-current={isActive ? "page" : undefined}
                      className={"relative rounded-[11px] px-[17px] py-[10px] text-[10px] font-semibold tracking-[1.65px] uppercase transition-colors duration-300 " + (isActive ? "text-white" : "text-white/45 hover:text-white/90")}>
                      {isActive && <motion.span layoutId="nav-active-pill" className="absolute inset-0 rounded-[11px] border border-cyan-200/[0.16] bg-gradient-to-b from-white/[0.13] to-white/[0.045] shadow-[0_3px_14px_rgba(0,0,0,0.2),0_0_18px_rgba(34,211,238,0.055)]" transition={{ type: "spring", stiffness: 340, damping: 30 }} />}
                      <span className="relative z-10">{item}</span>
                      {isActive && <motion.span layoutId="nav-active-dot" className="absolute bottom-[4px] left-1/2 h-[2px] w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-2.5 md:flex">
              <MagnetWrap strength={0.14}>
                <button onClick={handleDownloadCv} className="group/cv inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.035] px-3.5 py-[11px] text-[9px] font-semibold tracking-[1.45px] uppercase text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white">
                  <ArrowDownToLine size={13} className="text-cyan-200/80 transition-transform duration-300 group-hover/cv:translate-y-0.5" />
                  Resume
                </button>
              </MagnetWrap>
              <MagnetWrap strength={0.16}>
                <button onClick={() => handleNavClick("Contact")} className="group/talk relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-cyan-200/25 bg-gradient-to-r from-cyan-300/[0.13] to-violet-400/[0.13] px-4 py-[11px] text-[9px] font-bold tracking-[1.6px] uppercase text-white shadow-[0_4px_20px_rgba(34,211,238,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/45 hover:shadow-[0_8px_28px_rgba(34,211,238,0.16)]">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover/talk:translate-x-full" />
                  <Sparkles size={12} className="relative text-cyan-200" />
                  <span className="relative">Let&apos;s Talk</span>
                  <ArrowUpRight size={13} className="relative transition-transform duration-300 group-hover/talk:translate-x-0.5 group-hover/talk:-translate-y-0.5" />
                </button>
              </MagnetWrap>
            </div>

            <button className="relative flex h-[42px] w-[42px] items-center justify-center rounded-[13px] border border-white/[0.14] bg-white/[0.045] transition-all duration-300 hover:border-cyan-200/35 hover:bg-white/[0.08] md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen}>
              <span className="absolute inset-0 rounded-[13px] bg-gradient-to-br from-cyan-400/[0.08] to-violet-500/[0.10]" />
              <span className="relative flex h-4 w-5 flex-col items-center justify-center">
                <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 3.5 : -5 }} className="absolute h-[1.5px] w-5 rounded-full bg-white" transition={{ duration: 0.25 }} />
                <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1, scaleX: mobileMenuOpen ? 0.4 : 1 }} className="absolute h-[1.5px] w-5 rounded-full bg-white/75" transition={{ duration: 0.18 }} />
                <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -3.5 : 5 }} className="absolute h-[1.5px] w-5 rounded-full bg-white" transition={{ duration: 0.25 }} />
              </span>
            </button>
          </div>
          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button aria-label="Close navigation menu" className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[3px] md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} />
            <motion.div className="fixed left-1/2 top-[91px] z-50 w-[min(94%,440px)] -translate-x-1/2 overflow-hidden rounded-[22px] border border-white/[0.14] bg-[#090b13]/95 shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl md:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -9, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.09),transparent_48%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.10),transparent_50%)]" />
              <div className="relative p-3.5">
                <div className="mb-3 flex items-center justify-between px-2 pt-1">
                  <span className="text-[9px] font-semibold tracking-[2.2px] text-white/35">NAVIGATION</span>
                  <span className="flex items-center gap-1.5 text-[8px] tracking-[1.3px] text-emerald-200/65"><span className="h-1 w-1 rounded-full bg-emerald-300" />AVAILABLE FOR WORK</span>
                </div>
                {navLinks.map((item, i) => (
                  <motion.button key={item} onClick={() => handleNavClick(item)}
                    className={"mb-1 flex w-full items-center justify-between rounded-[13px] border px-4 py-[14px] text-left transition-all duration-200 " + (active === item
                      ? "border-cyan-200/20 bg-gradient-to-r from-cyan-300/[0.11] to-violet-400/[0.08] text-white"
                      : "border-transparent text-white/60 hover:border-white/[0.08] hover:bg-white/[0.045] hover:text-white")}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.045 }}>
                    <span className="flex items-center gap-3">
                      <span className={"font-mono text-[9px] " + (active === item ? "text-cyan-200" : "text-white/25")}>0{i + 1}</span>
                      <span className="text-[11px] font-semibold tracking-[1.7px] uppercase">{item}</span>
                    </span>
                    <ArrowUpRight size={15} className={active === item ? "text-cyan-200" : "text-white/30"} />
                  </motion.button>
                ))}
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                <a href="/assets/CV.pdf" download="Khizar-Hayat-CV.pdf" className="flex w-full items-center justify-between rounded-[13px] border border-cyan-200/20 bg-cyan-300/[0.075] px-4 py-[13px] text-[10px] font-bold tracking-[1.6px] uppercase text-cyan-100 transition-colors hover:bg-cyan-300/[0.12]">
                  <span className="flex items-center gap-2.5"><ArrowDownToLine size={14} />Download Resume</span>
                  <ArrowUpRight size={14} className="text-cyan-200/60" />
                </a>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/60 to-violet-400/0" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
