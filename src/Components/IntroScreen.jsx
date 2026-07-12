import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ── Dev tech SVG icons (inline, no deps) ───────────────────────────────────
const HTML_ICON = (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
    <path d="M4 2l2.4 27L16 31l9.6-2L28 2H4z" fill="#E34F26"/>
    <path d="M16 28.8l7.8-2.16L25.94 5.6H16v23.2z" fill="#EF652A"/>
    <path d="M16 13.2H11.4l-.32-3.6H16V6H7.6l.84 9.6H16v-2.4zM16 21.4l-.02.004-3.9-1.054-.25-2.75H8.4l.48 5.4 7.1 1.97.02-.006V21.4z" fill="#fff"/>
    <path d="M16 13.2v2.4h4.3l-.4 4.746-3.9 1.054V24.97l7.1-1.97.52-5.8.52-5.8H16v-3.6h8.22l.28-3.2H16v3.6z" fill="#EBEBEB"/>
  </svg>
);

const CSS_ICON = (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
    <path d="M4 2l2.4 27L16 31l9.6-2L28 2H4z" fill="#1572B6"/>
    <path d="M16 28.8l7.8-2.16L25.94 5.6H16v23.2z" fill="#33A9DC"/>
    <path d="M16 13.2h4.6l-.32 3.54-4.28 1.16V13.2zM16 6h8.5l-.28 3.2H16V6z" fill="#EBEBEB"/>
    <path d="M16 13.2H11.4l-.32-3.6H16V6H7.6l.84 9.6H16v-2.4zM16 21.84l-.02.006-3.9-1.054-.25-2.75H8.4l.48 5.4 7.1 1.97.02-.006V21.84z" fill="#fff"/>
  </svg>
);

const JS_ICON = (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
    <rect width="32" height="32" rx="3" fill="#F7DF1E"/>
    <path d="M9.5 24.6l2.3-1.4c.44.78.84 1.44 1.8 1.44.92 0 1.5-.36 1.5-1.76V15h2.84v7.94c0 2.9-1.7 4.22-4.18 4.22-2.24 0-3.54-1.16-4.26-2.56z" fill="#323330"/>
    <path d="M18.2 24.32l2.3-1.34c.6 1 1.38 1.74 2.76 1.74 1.16 0 1.9-.58 1.9-1.38 0-.96-.76-1.3-2.04-1.86l-.7-.3c-2.02-.86-3.36-1.94-3.36-4.22 0-2.1 1.6-3.7 4.1-3.7 1.78 0 3.06.62 3.98 2.24l-2.18 1.4c-.48-.86-.1-1.82-1.82-1.82-.82 0-1.38.38-1.38 1.1 0 .76.52 1.08 1.74 1.6l.7.3c2.38 1.02 3.72 2.06 3.72 4.4 0 2.52-1.98 3.9-4.64 3.9-2.6 0-4.28-1.24-5.1-2.86z" fill="#323330"/>
  </svg>
);

const REACT_ICON = (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
    <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/>
  </svg>
);

const NODE_ICON = (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
    <path d="M16 2L3 9.5v15L16 32l13-7.5v-15L16 2z" fill="#339933"/>
    <path d="M16 8c-.55 0-1 .18-1.38.52l-5.5 3.18c-.76.44-1.12 1.26-1.12 2.06v6.34c0 .8.36 1.56 1.12 2l5.5 3.18c.38.22.82.34 1.28.34.46 0 .9-.12 1.28-.34l5.5-3.18c.76-.44 1.12-1.2 1.12-2V13.76c0-.8-.36-1.62-1.12-2.06L17.38 8.52C17 8.18 16.55 8 16 8z" fill="#fff"/>
    <text x="16" y="20" textAnchor="middle" fontSize="7" fill="#339933" fontWeight="900" fontFamily="Arial">NODE</text>
  </svg>
);

const MONGO_ICON = (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
    <path d="M16 2C10.5 2 8 8.5 8 13.5c0 4.5 2.5 8 6 9.5l1 7h2l1-7c3.5-1.5 6-5 6-9.5C24 8.5 21.5 2 16 2z" fill="#47A248"/>
    <path d="M16 4c-4.5 0-6.5 5.5-6.5 9.5 0 3.8 2 7 5 8.5V23c0 0 1 6.5 1.5 6.5S17 23 17 23v-.5c3-1.5 5-4.7 5-8.5C22 9.5 20.5 4 16 4z" fill="#4FAA41"/>
    <rect x="15" y="18" width="2" height="12" rx="1" fill="#B8C4B1"/>
  </svg>
);

const ICONS = [
  { el: HTML_ICON,  label: "HTML5",   color: "rgba(227,79,38,0.35)",   glow: "rgba(227,79,38,0.6)"   },
  { el: CSS_ICON,   label: "CSS3",    color: "rgba(21,114,182,0.35)",  glow: "rgba(21,114,182,0.6)"  },
  { el: JS_ICON,    label: "JS",      color: "rgba(247,223,30,0.35)",  glow: "rgba(247,223,30,0.6)"  },
  { el: REACT_ICON, label: "React",   color: "rgba(97,218,251,0.35)",  glow: "rgba(97,218,251,0.6)"  },
  { el: NODE_ICON,  label: "Node.js", color: "rgba(51,153,51,0.35)",   glow: "rgba(51,153,51,0.6)"   },
  { el: MONGO_ICON, label: "MongoDB", color: "rgba(71,162,72,0.35)",   glow: "rgba(71,162,72,0.6)"   },
];

const HEADLINE = "CRAFTING DIGITAL".split("");
const HEADLINE2 = "EXPERIENCES".split("");

export default function IntroScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 4200);
    const t2 = setTimeout(() => onComplete?.(), 5100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#030303" }}
      animate={exiting ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* Ray 1 — slow clockwise */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="rounded-full"
          style={{
            width: "160vmax",
            height: "160vmax",
            background: `conic-gradient(
              transparent 0deg, rgba(255,70,70,0.2) 12deg, transparent 28deg,
              transparent 82deg, rgba(60,130,255,0.2) 98deg, transparent 114deg,
              transparent 168deg, rgba(60,255,180,0.17) 184deg, transparent 200deg,
              transparent 256deg, rgba(255,190,0,0.15) 272deg, transparent 288deg,
              transparent 342deg, rgba(200,60,255,0.18) 358deg, transparent 360deg
            )`,
            filter: "blur(45px)",
          }}
        />
      </motion.div>

      {/* Ray 2 — counter-clockwise */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="rounded-full"
          style={{
            width: "110vmax",
            height: "110vmax",
            background: `conic-gradient(
              transparent 0deg, rgba(255,255,255,0.06) 18deg, transparent 36deg,
              transparent 108deg, rgba(255,255,255,0.05) 126deg, transparent 144deg,
              transparent 216deg, rgba(255,255,255,0.07) 234deg, transparent 252deg,
              transparent 324deg, rgba(255,255,255,0.05) 342deg, transparent 360deg
            )`,
            filter: "blur(22px)",
          }}
        />
      </motion.div>

      {/* Central bloom */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(80,120,255,0.05) 35%, transparent 70%)",
          filter: "blur(50px)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.6, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.8, ease: "easeOut" }}
      />

      {/* Corner brackets */}
      {[
        { cls: "top-6 left-6",    bt: true,  bl: true  },
        { cls: "top-6 right-6",   bt: true,  br: true  },
        { cls: "bottom-6 left-6", bb: true,  bl: true  },
        { cls: "bottom-6 right-6",bb: true,  br: true  },
      ].map(({ cls, bt, bl, bb, br }, i) => (
        <motion.div
          key={i}
          className={`absolute ${cls} pointer-events-none`}
          style={{
            width: "28px", height: "28px",
            borderTop:    bt ? "1px solid rgba(255,255,255,0.22)" : "none",
            borderBottom: bb ? "1px solid rgba(255,255,255,0.22)" : "none",
            borderLeft:   bl ? "1px solid rgba(255,255,255,0.22)" : "none",
            borderRight:  br ? "1px solid rgba(255,255,255,0.22)" : "none",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.7 }}
        />
      ))}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ gap: "28px" }}>

        {/* Tech icons row */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: "14px" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {ICONS.map(({ el, label, color, glow }, i) => (
            <motion.div
              key={label}
              className="relative flex items-center justify-center"
              style={{ width: "40px", height: "40px" }}
              initial={{ opacity: 0, scale: 0.4, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.11,
                duration: 0.55,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
            >
              {/* Icon glow bg */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: color,
                  filter: "blur(8px)",
                  transform: "scale(1.3)",
                }}
              />
              {/* Icon border box */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  border: `1px solid ${glow.replace("0.6", "0.25")}`,
                  background: "rgba(0,0,0,0.55)",
                }}
              />
              {/* Icon itself */}
              <div className="relative z-10" style={{ width: "24px", height: "24px", padding: "0px" }}>
                {el}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider line — top */}
        <motion.div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "320px", opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.9, ease: "easeOut" }}
        />

        {/* Headline: CRAFTING DIGITAL */}
        <div style={{ textAlign: "center", lineHeight: 1 }}>
          <div className="flex items-center justify-center overflow-hidden" style={{ gap: "0px", marginBottom: "4px" }}>
            {HEADLINE.map((char, i) =>
              char === " " ? (
                <span key={i} style={{ display: "inline-block", width: "16px" }} />
              ) : (
                <motion.span
                  key={i}
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: "clamp(26px, 4.5vw, 46px)",
                    lineHeight: 1,
                    color: "white",
                    display: "inline-block",
                    filter: "drop-shadow(0 0 12px rgba(200,220,255,0.5))",
                    letterSpacing: "1px",
                  }}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 1.5 + i * 0.045,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              )
            )}
          </div>

          {/* EXPERIENCES — in RGB gradient */}
          <div className="flex items-center justify-center overflow-hidden" style={{ gap: "0px" }}>
            {HEADLINE2.map((char, i) => (
              <motion.span
                key={i}
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "clamp(26px, 4.5vw, 46px)",
                  lineHeight: 1,
                  display: "inline-block",
                  letterSpacing: "1px",
                  background: `linear-gradient(90deg,
                    rgba(97,218,251,1) ${(i / HEADLINE2.length) * 60}%,
                    rgba(180,80,255,1) ${50 + (i / HEADLINE2.length) * 50}%
                  )`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 16px rgba(97,218,251,0.55))",
                }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 2.0 + i * 0.055,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider line — bottom */}
        <motion.div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "320px", opacity: 1 }}
          transition={{ delay: 3.1, duration: 0.8, ease: "easeOut" }}
        />

        {/* Tech label row */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: "16px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.7 }}
        >
          {["React", "Node.js", "MongoDB", "Tailwind"].map((t, i) => (
            <span
              key={t}
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: "8px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {t}{i < 3 ? <span style={{ marginLeft: "16px", color: "rgba(255,255,255,0.15)" }}>·</span> : ""}
            </span>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
          initial={{ width: "0px", opacity: 0 }}
          animate={{ width: "200px", opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.4 }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(to right, rgba(97,218,251,0.3), rgba(97,218,251,0.9), rgba(180,80,255,0.7))",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.2, duration: 1.0, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Bottom label */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center pointer-events-none"
        style={{ gap: "12px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.7 }}
      >
        <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.12)" }} />
        <span style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: "8px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.18)",
        }}>
          Full-Stack Developer · 2025
        </span>
        <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.12)" }} />
      </motion.div>
    </motion.div>
  );
}
