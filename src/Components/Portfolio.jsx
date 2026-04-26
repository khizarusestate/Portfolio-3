import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    id: "aurelia",
    name: "Aurelia",
    tagline: "Luxury Hotel Experience",
    description: "Premium hotel booking platform with seamless reservations",
    color: "#DAA400",
    colorRgb: "218,164,0",
    tech: ["React", "Tailwind", "Node.js", "MongoDB"],
    link: "https://aurelia-livid.vercel.app/",
    desktopImage: "/assets/Aurelia Desktop.png",
    phoneImage: "/assets/Aurelia Phone.png",
  },
  {
    id: "butt",
    name: "Butt Foods",
    tagline: "Fast Food Revolution",
    description: "Chef-driven fast food delivery with real-time tracking",
    color: "#FFA500",
    colorRgb: "255,165,0",
    tech: ["React", "Express", "MongoDB", "Payment API"],
    link: "https://buttfoods.vercel.app/",
    desktopImage: "/assets/Butt Foods Dextop.png",
    phoneImage: "/assets/Buut Foods Mobile.png",
  },
  {
    id: "forge",
    name: "The Forge",
    tagline: "Fitness Reimagined",
    description: "Complete gym management and workout tracking platform",
    color: "#EF4444",
    colorRgb: "239,68,68",
    tech: ["React", "Tailwind", "Next.js", "Firebase"],
    link: "https://the-forge2.vercel.app/",
    desktopImage: "/assets/The Forge Desktop.png",
    phoneImage: "/assets/The Forge Mobile].png",
  },
  {
    id: "face",
    name: "Face Detection",
    tagline: "AI Vision System",
    description: "Advanced face recognition powered by machine learning",
    color: "#10B981",
    colorRgb: "16,185,129",
    tech: ["React", "TensorFlow", "Python", "WebRTC"],
    link: "https://face-detection-app-five.vercel.app/",
    desktopImage: "/assets/FaceDetectionAppDesktop.png",
    phoneImage: "/assets/FaceDetectionAppMobile.png",
  },
  {
    id: "tabify",
    name: "Tabify",
    tagline: "Coffee Shop Management",
    description: "Desktop POS system for café and restaurant operations",
    color: "#3B82F6",
    colorRgb: "59,130,246",
    tech: ["Electron", "Node.js", "SQLite", "IPC"],
    link: "https://github.com/khizarusestate",
    desktopImage: "/assets/Tabify-1.png",
    phoneImage: "/assets/Tabify-2.png",
  },
];

function ProjectCard({ project, index, onHover }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    onHover(project);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)] transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, ${project.color}16, transparent 55%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 p-4 md:p-6">
        <div className="grid h-[65%] grid-cols-5 gap-3">
          <div className="col-span-3 overflow-hidden rounded-xl border border-white/15 bg-black/40">
            <img
              src={project.desktopImage}
              alt={`${project.name} desktop preview`}
              className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="col-span-2 overflow-hidden rounded-xl border border-white/15 bg-black/40">
            <img
              src={project.phoneImage}
              alt={`${project.name} mobile preview`}
              className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/65 p-4 backdrop-blur-xl md:inset-x-6 md:bottom-6 md:p-6">
          <h3 className="font-['Anton'] text-[30px] md:text-[38px] leading-none">{project.name}</h3>
          <p className="mt-2 text-[11px] font-semibold tracking-[1.4px] uppercase text-white/60">
            {project.tagline}
          </p>
          <p className="mt-3 text-[12px] md:text-[13px] text-white/70">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[1px]"
                style={{
                  borderColor: `${project.color}66`,
                  color: project.color,
                  background: `${project.color}1f`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/8 px-4 py-2 text-[11px] font-bold tracking-[1.5px] uppercase text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/14"
          >
            Open Project <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setOrbPos({ x: e.clientX - 250, y: e.clientY - 250 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="portfolio"
      className="relative min-h-screen w-full bg-[#060606] overflow-hidden text-[rgb(234,234,234)] py-16 md:py-32 px-4 md:px-[8%]"
      ref={containerRef}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
      `}</style>

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)
          `,
        }}
      />

      {/* Dynamic Glow Orb - Desktop only */}
      <motion.div
        className="hidden md:block fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[15]"
        style={{
          left: orbPos.x,
          top: orbPos.y,
          background: activeProject
            ? `radial-gradient(circle, ${activeProject.color}44, transparent 50%)`
            : "radial-gradient(circle, rgba(255,255,255,0.05), transparent 50%)",
          filter: "blur(80px)",
          opacity: activeProject ? 0.4 : 0.2,
        }}
        animate={{
          opacity: activeProject ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Top-Left Accent Glow */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(74,222,128,0.08), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top-Right Accent Glow */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-20">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center gap-3 mb-4 md:mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="w-6 md:w-8 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <span className="text-[8px] md:text-[10px] tracking-[3px] md:tracking-[4px] text-white/30 uppercase font-['Exo_2'] font-semibold">
              03 — Featured Work
            </span>
          </motion.div>

          <motion.h1
            className="font-['Anton'] text-[40px] md:text-[72px] leading-[1.05] tracking-[-1px] md:tracking-[-1.5px] mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              PORTFOLIO
            </span>
          </motion.h1>

          <motion.p
            className="text-white/40 text-[11px] md:text-[14px] max-w-2xl leading-relaxed font-['Exo_2']"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A curated collection of digital experiences designed and developed to solve real problems, deliver value, and push creative boundaries.
          </motion.p>

          <div
            className="h-px mt-4 md:mt-6"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
            }}
          />
        </motion.div>

        {/* Projects Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onHover={setActiveProject}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 md:mt-24 pt-8 md:pt-12 border-t border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50 font-['Exo_2'] text-[11px] md:text-[13px] mb-4 md:mb-6">
            Want to see more work or discuss a project?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-white font-['Anton'] text-[12px] md:text-[14px] tracking-[1.5px] md:tracking-[2px] uppercase"
            whileHover={{ gap: "12px", x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
