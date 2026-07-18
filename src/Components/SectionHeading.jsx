import { motion } from "framer-motion";

export default function SectionHeading({
  number,
  label,
  words = [],          // array of { text, accent? } objects
  description,
  accentGradient = "linear-gradient(90deg,#61dafb,#b450ff)",
  lineColor = "rgba(255,255,255,0.25)",
}) {
  return (
    <div className="mb-12 md:mb-20">
      {/* Number label */}
      <motion.div
        className="flex items-center gap-3 mb-5 md:mb-8"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
      >
        <motion.span
          className="h-px block"
          style={{ background: lineColor }}
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          viewport={{ once: true }}
        />
        <span
          className="text-[9px] md:text-[11px] tracking-[4px] text-white/60 uppercase font-semibold"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          {number} — {label}
        </span>
      </motion.div>

      {/* Heading words — each slides up from behind a clip mask */}
      <div className="flex flex-wrap items-baseline gap-x-[18px] gap-y-0 mb-5 md:mb-7">
        {words.map(({ text, accent }, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.span
              className="block"
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "clamp(40px,7vw,82px)",
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                ...(accent
                  ? {
                      background: accentGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 18px rgba(97,218,251,0.35))",
                    }
                  : { color: "white" }),
              }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              transition={{
                delay: 0.08 + i * 0.11,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              {text}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Description */}
      {description && (
        <motion.p
          className="text-white/70 text-[12px] md:text-[14px] max-w-2xl leading-relaxed"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      )}

      {/* Divider line — sweeps in */}
      <motion.div
        className="h-px mt-6 md:mt-8"
        style={{
          background: `linear-gradient(to right, ${lineColor}, rgba(255,255,255,0.03))`,
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.85, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </div>
  );
}
