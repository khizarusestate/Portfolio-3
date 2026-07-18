import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Code, Zap, Layers } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────
const TECH = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Electron.js",
  "Next.js",
  "REST APIs",
];
const CORE = [
  "Problem Solving",
  "UI Architecture",
  "Performance Optimization",
  "Responsive UX",
  "Debugging",
  "Clean Code",
];
const TOOLS = ["GitHub", "VS Code", "AI Editors", "Canva", "Postman", "Figma", "npm", "Terminal"];

const STATS = [
  { target: 2, suffix: "+", label: "Years Exp.", bar: "40%" },
  { target: 10, suffix: "+", label: "Projects", bar: "75%" },
  { target: 10, suffix: "+", label: "Technologies", bar: "60%" },
];

const TRACKS = [
  { label: "Technical Skills", items: TECH, icon: Code },
  { label: "Core Skills", items: CORE, icon: Zap },
  { label: "Tools", items: TOOLS, icon: Layers },
];

// ─── Count-up ──────────────────────────────────────────────────────────────
function CountUp({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{val}</span>;
}

// ─── Bar fill ─────────────────────────────────────────────────────────────
function BarFill({ width }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="w-full h-px my-[8px] md:my-[10px] relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: inView ? width : "0%",
          background: "linear-gradient(to right, rgba(255,255,255,0.5), transparent)",
          transition: "width 1200ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}

// ─── Skills Grid ────────────────────────────────────────────────────────
function SkillsGrid({ label, items, Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-8 md:mb-12"
    >
      {/* Section label */}
      <div className="flex items-center gap-2 text-[10px] md:text-[12px] tracking-[3px] md:tracking-[5px] text-white/50 uppercase font-['Exo_2'] mb-4 md:mb-6">
        <Icon size={16} className="text-white/60 flex-shrink-0" />
        {label}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 100 
            }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div
              className="relative overflow-hidden rounded-xl px-3 py-2 md:px-4 md:py-3 transition-all duration-300 hover:scale-[1.06] cursor-default"
              style={{
                background: "rgba(255,255,255,0.055)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.13)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
              />
              {/* top edge highlight */}
              <div className="absolute top-0 left-3 right-3 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)" }}
              />
              <div
                className="text-[11px] md:text-[13px] font-['Exo_2'] tracking-wide text-center transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {skill}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full bg-[#060606] relative overflow-hidden text-[rgb(234,234,234)] py-12 md:py-20"
    >
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes greenGlow {
          0%,100% { opacity:1; }
          50%      { opacity:0.4; }
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div
          className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full"
          style={{ background: "rgba(255,255,255,0.03)", filter: "blur(120px)" }}
        />
      </div>

      {/* TWO-COLUMN GRID - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative z-10 pt-12 md:pt-0">
        {/* ── LEFT ──────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col justify-center px-6 md:px-[8%] py-12 md:py-20"
          style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
        >
          {/* Section label */}
          <motion.div
            className="flex items-center gap-[8px] md:gap-[10px] mb-5 md:mb-7 font-['Exo_2'] text-[8px] md:text-[9px] tracking-[3px] md:tracking-[6px] text-white/50 uppercase"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="w-4 md:w-6 h-px bg-white/20" />
            01 — Who I Am
          </motion.div>

          {/* Heading */}
          <h1 className="font-['Anton'] text-[36px] md:text-[60px] leading-[0.88] tracking-[-0.5px] md:tracking-[-1px] mb-5 md:mb-8">
            {["CRAFTING", "DIGITAL"].map((word, wi) => (
              <div key={word} style={{ overflow: "hidden" }}>
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                transition={{ delay: 0.08 + wi * 0.13, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{
                  background: "linear-gradient(135deg, rgb(234,234,234), rgba(160,160,160,0.6))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </motion.span>
              </div>
            ))}
            <div style={{ overflow: "hidden" }}>
            <motion.span
              className="block text-[24px] md:text-[60px]"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              transition={{ delay: 0.34, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                background: "linear-gradient(90deg,#61dafb,#b450ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 14px rgba(97,218,251,0.3))",
              }}
            >
              EXPERIENCES
            </motion.span>
            </div>
          </h1>

          {/* Story */}
          <motion.p
            className="text-[10px] md:text-[12px] leading-[1.8] md:leading-[2] text-white/70 max-w-[320px] md:max-w-[380px] font-['Exo_2'] pl-3 md:pl-4 mb-6 md:mb-9"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I design and build scalable systems with a focus on structure,
            performance, and refined user experience. Every interface I create
            is driven by clarity, intentional spacing, and meaningful
            interaction — not just code, but craft.
          </motion.p>

          {/* Signature */}
          <motion.p
            className="font-['Anton'] text-[10px] md:text-[12px] tracking-[2px] md:tracking-[4px] text-white/60 uppercase mb-6 md:mb-9"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Khizar Hayat · Software Engineer
          </motion.p>

          {/* Stats - Responsive */}
          <motion.div
            className="grid grid-cols-3 pt-5 md:pt-7 font-['Exo_2'] gap-3 md:gap-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
          >
            {STATS.map(({ target, suffix, label, bar }, i) => (
              <div
                key={label}
                className="relative"
                style={{
                  paddingRight: i < 2 ? "12px" : "0",
                  paddingLeft: i > 0 ? "12px" : "0",
                  borderRight:
                    i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <div className="flex items-baseline gap-[2px]">
                  <span className="font-['Anton'] text-[24px] md:text-[36px] leading-none text-[rgb(234,234,234)]">
                    {label === "Years Exp." ? 2 : <CountUp target={target} />}
                  </span>
                  <span className="font-['Anton'] text-[12px] md:text-[18px] text-white/60">
                    {suffix}
                  </span>
                </div>
                <BarFill width={bar} />
                <p className="text-[7px] md:text-[9px] tracking-[2px] md:tracking-[3px] uppercase text-white/55">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center py-12 md:py-20 px-4 md:px-0 overflow-hidden">
          {TRACKS.map(({ label, items, icon: Icon }) => (
            <SkillsGrid
              key={label}
              label={label}
              items={items}
              Icon={Icon}
            />
          ))}

          {/* Available badge */}
          <motion.div
            className="flex items-center gap-[8px] md:gap-[10px] mx-4 md:mx-[5%] px-3 md:px-[18px] py-2 md:py-[10px] rounded-lg md:rounded-[8px] w-fit font-['Exo_2'] text-[8px] md:text-[9px] tracking-[2px] md:tracking-[4px] uppercase text-white/65"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span
              className="w-[4px] md:w-[6px] h-[4px] md:h-[6px] rounded-full bg-green-400 flex-shrink-0"
              style={{
                boxShadow: "0 0 8px #4ade80",
                animation: "greenGlow 2s ease-in-out infinite",
              }}
            />
            Available · Remote / Worldwide
          </motion.div>
        </div>
      </div>
    </section>
  );
}
