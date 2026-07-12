import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "KHIZAR HAYAT".split("");

export default function IntroScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 3800);
    const t2 = setTimeout(() => onComplete?.(), 4700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#030303" }}
      animate={exiting ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* RGB Ray 1 — slow clockwise */}
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
              transparent 0deg,
              rgba(255,70,70,0.22) 12deg,
              transparent 28deg,
              transparent 82deg,
              rgba(60,130,255,0.22) 98deg,
              transparent 114deg,
              transparent 168deg,
              rgba(60,255,180,0.18) 184deg,
              transparent 200deg,
              transparent 256deg,
              rgba(255,190,0,0.16) 272deg,
              transparent 288deg,
              transparent 342deg,
              rgba(200,60,255,0.2) 358deg,
              transparent 360deg
            )`,
            filter: "blur(45px)",
          }}
        />
      </motion.div>

      {/* RGB Ray 2 — faster counter-clockwise */}
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
              transparent 0deg,
              rgba(255,255,255,0.07) 18deg,
              transparent 36deg,
              transparent 108deg,
              rgba(255,255,255,0.06) 126deg,
              transparent 144deg,
              transparent 216deg,
              rgba(255,255,255,0.08) 234deg,
              transparent 252deg,
              transparent 324deg,
              rgba(255,255,255,0.06) 342deg,
              transparent 360deg
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
          background:
            "radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(100,140,255,0.06) 35%, transparent 70%)",
          filter: "blur(50px)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.6, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.8, ease: "easeOut" }}
      />

      {/* Corner brackets */}
      {[
        { cls: "top-8 left-8", bt: true, bl: true },
        { cls: "top-8 right-8", bt: true, br: true },
        { cls: "bottom-8 left-8", bb: true, bl: true },
        { cls: "bottom-8 right-8", bb: true, br: true },
      ].map(({ cls, bt, bl, bb, br }, i) => (
        <motion.div
          key={i}
          className={`absolute ${cls} w-8 h-8 pointer-events-none`}
          style={{
            borderTop: bt ? "1px solid rgba(255,255,255,0.18)" : "none",
            borderBottom: bb ? "1px solid rgba(255,255,255,0.18)" : "none",
            borderLeft: bl ? "1px solid rgba(255,255,255,0.18)" : "none",
            borderRight: br ? "1px solid rgba(255,255,255,0.18)" : "none",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.8 }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center" style={{ gap: "20px" }}>
        {/* KH Monogram */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 1.5, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(80px, 15vw, 130px)",
              lineHeight: 1,
              background:
                "linear-gradient(140deg, rgba(255,255,255,0.95) 0%, rgba(180,210,255,0.7) 60%, rgba(255,255,255,0.4) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(140,180,255,0.5))",
              display: "block",
            }}
          >
            KH
          </span>
          {/* Bloom behind monogram */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(100,160,255,0.35) 0%, transparent 70%)",
              filter: "blur(25px)",
            }}
          />
        </motion.div>

        {/* Divider line */}
        <motion.div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "260px", opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
        />

        {/* Name — letter by letter */}
        <div
          className="flex items-center overflow-hidden"
          style={{ gap: "0px" }}
        >
          {LETTERS.map((char, i) =>
            char === " " ? (
              <span key={i} style={{ display: "inline-block", width: "18px" }} />
            ) : (
              <motion.span
                key={i}
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  lineHeight: 1,
                  color: "white",
                  display: "inline-block",
                  filter: "drop-shadow(0 0 10px rgba(200,220,255,0.55))",
                  letterSpacing: "1px",
                }}
                initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 1.3 + i * 0.055,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            )
          )}
        </div>

        {/* Subtitle */}
        <motion.p
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "clamp(8px, 1.2vw, 11px)",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
            margin: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.9 }}
        >
          Software Engineer
        </motion.p>

        {/* Progress bar */}
        <motion.div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
          initial={{ width: "0px", opacity: 0 }}
          animate={{ width: "180px", opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.4 }}
        >
          <motion.div
            style={{
              height: "100%",
              background:
                "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.7), rgba(255,255,255,0.15))",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.6, duration: 1.1, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Bottom label */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center pointer-events-none"
        style={{ gap: "12px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.7 }}
      >
        <div
          style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.14)" }}
        />
        <span
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "8px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          Portfolio 2025
        </span>
        <div
          style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.14)" }}
        />
      </motion.div>
    </motion.div>
  );
}
