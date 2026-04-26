import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, ChevronDown, Terminal, Globe } from "lucide-react";

const DESKTOP_PARTICLES = 95;
const MOBILE_ORBS = 8;

export default function Home() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorTailRefs = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const cursorTrailFrameRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const mobileParticles = useMemo(
    () =>
      Array.from({ length: MOBILE_ORBS }).map((_, index) => ({
        id: index,
        left: `${12 + (index * 11) % 78}%`,
        top: `${9 + (index * 17) % 74}%`,
        delay: `${(index * 0.7).toFixed(2)}s`,
        duration: `${6 + (index % 4)}s`,
      })),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const tails = cursorTailRefs.current.filter(Boolean);
    const trailPoints = Array.from({ length: tails.length }).map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    const onMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      cursor.style.opacity = "1";
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target;
      const isPointer = target?.closest?.("a,button,input,textarea,[role='button']");
      cursor.classList.toggle("is-pointer", Boolean(isPointer));
    };
    const onLeave = () => {
      cursor.style.opacity = "0";
      tails.forEach((tail) => {
        tail.style.opacity = "0";
      });
    };

    const animateTrail = () => {
      let prevX = pointerRef.current.x;
      let prevY = pointerRef.current.y;
      for (let i = 0; i < trailPoints.length; i += 1) {
        const point = trailPoints[i];
        point.x += (prevX - point.x) * (0.23 - i * 0.018);
        point.y += (prevY - point.y) * (0.23 - i * 0.018);
        prevX = point.x;
        prevY = point.y;
        const tail = tails[i];
        if (!tail) continue;
        tail.style.opacity = "1";
        tail.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${1 - i * 0.08})`;
      }
      cursorTrailFrameRef.current = requestAnimationFrame(animateTrail);
    };

    animateTrail();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(cursorTrailFrameRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    const host = canvas.parentElement;
    const particles = [];

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(host.clientWidth * scale);
      canvas.height = Math.floor(host.clientHeight * scale);
      canvas.style.width = `${host.clientWidth}px`;
      canvas.style.height = `${host.clientHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      particles.length = 0;
      for (let i = 0; i < DESKTOP_PARTICLES; i += 1) {
        particles.push({
          x: Math.random() * host.clientWidth,
          y: Math.random() * host.clientHeight,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: Math.random() * 1.8 + 0.7,
        });
      }
      pointerRef.current = { x: host.clientWidth * 0.65, y: host.clientHeight * 0.5 };
    };

    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const draw = () => {
      context.clearRect(0, 0, host.clientWidth, host.clientHeight);
      const { x: px, y: py } = pointerRef.current;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const dx = px - p.x;
        const dy = py - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 0) {
          p.vx -= (dx / dist) * 0.007;
          p.vy -= (dy / dist) * 0.007;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = host.clientWidth;
        if (p.x > host.clientWidth) p.x = 0;
        if (p.y < 0) p.y = host.clientHeight;
        if (p.y > host.clientHeight) p.y = 0;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = "rgba(214,225,255,0.56)";
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const linkDist = Math.hypot(p.x - q.x, p.y - q.y);
          if (linkDist < 120) {
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.strokeStyle = `rgba(170,190,255,${0.14 - linkDist / 1000})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    host.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      host.removeEventListener("mousemove", onMove);
    };
  }, [isMobile]);

  return (
    <section
      id="home"
      className="h-screen w-screen bg-[#060606] relative overflow-hidden flex items-center pt-16 md:pt-0"
    >
      {!isMobile && (
        <>
          <div ref={cursorRef} className="custom-cursor">
            <img src="/cursor.png" alt="" className="custom-cursor__image" />
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              ref={(element) => {
                cursorTailRefs.current[i] = element;
              }}
              className="custom-cursor-tail"
            />
          ))}
        </>
      )}

      {!isMobile && <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />}

      {isMobile && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(90,118,255,0.22),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(181,88,255,0.2),transparent_52%),linear-gradient(180deg,#080808_0%,#0c0b12_100%)]" />
          {mobileParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-400/15 via-cyan-300/10 to-transparent blur-xl"
              style={{
                left: particle.left,
                top: particle.top,
                animation: `mobileFloat ${particle.duration} ease-in-out ${particle.delay} infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_70%_50%,transparent_35%,#060606_100%)]" />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[linear-gradient(to_right,#060606_0%,transparent_42%)]" />
      <div
        className="absolute inset-0 z-[3] opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/noise.svg')" }}
      />

      <style>{`
        @keyframes mobileFloat {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.7; }
          50% { transform: translate3d(0, -18px, 0); opacity: 1; }
        }
      `}</style>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full px-6 md:px-[8%]">
        <motion.article
          className="w-full lg:w-1/2 py-12 md:py-20"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-white/60 font-['Exo_2'] text-sm md:text-base tracking-wider uppercase"
          >
            Hello, I'm
          </motion.div>
          
          <motion.h1 
            className="text-[48px] md:text-[76px] text-white font-bold leading-tight"
            style={{ fontFamily: "Anton, sans-serif" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            KHIZAR HAYAT
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl text-white/80 font-['Exo_2']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            Software Engineer & Creative Developer
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-white/60 font-['Exo_2'] max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            Passionate about creating exceptional digital experiences with modern technologies. 
            Specialized in React, Node.js, and crafting intuitive user interfaces that delight and inspire.
          </motion.p>

          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg flex items-center justify-center text-white hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-110 group">
              <Code size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-lg flex items-center justify-center text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-110 group">
              <Terminal size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg flex items-center justify-center text-white hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 hover:scale-110 group">
              <Globe size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
          </motion.div>
        </div>
      </motion.article>

        {/* Right Side Content */}
        <motion.div
          className="w-full lg:w-1/2 py-12 md:py-20 lg:pl-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="space-y-8">

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white/80 font-['Exo_2']">Core Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'Tailwind', 'MongoDB'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 3.1 + index * 0.1, duration: 0.4 }}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white/80 font-['Exo_2'] hover:bg-white/20 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.6 }}
              className="pt-4"
            >
              <p className="text-white/60 font-['Exo_2'] text-sm leading-relaxed">
                Let's build something amazing together! I'm always excited to take on new challenges and create innovative solutions.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 right-8 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <ChevronDown size={24} className="animate-bounce" />
      </motion.div>
    </section>
  );
}