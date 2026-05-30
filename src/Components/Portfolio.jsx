import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, Zap, Code2 } from "lucide-react";

const PORTFOLIO_WEBSITES = [
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
];

const SAAS_PRODUCTS = [
  {
    id: "fixitnow",
    name: "Fix It Now",
    tagline: "Enterprise Service Marketplace",
    description: "Full-stack service booking platform. Real-time tracking, admin dashboard, payment integration. Built entirely solo.",
    color: "#FF6B35",
    colorRgb: "255,107,53",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Vercel", "Railway"],
    link: "https://fix-it-now-omega.vercel.app/",
    desktopImage: "/assets/FixItNow_Desktop.png",
    phoneImage: "/assets/FixItNow_Mobile.png",
    badge: "ENTERPRISE • SOLO",
    featured: true,
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

function TabButton({ label, isActive, onClick, icon: Icon }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-6 md:px-8 py-2 md:py-3 flex items-center gap-2 text-[11px] md:text-[13px] font-bold tracking-[1.2px] uppercase transition-colors"
      style={{
        color: isActive ? "white" : "rgba(255,255,255,0.5)",
      }}
      whileHover={{ color: "white" }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon size={16} />}
      {label}
      
      {isActive && (
        <motion.div
          layoutId="tabUnderline"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/40 via-white to-white/40"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

function FeaturedBadge({ badge }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="absolute top-4 right-4 md:top-6 md:right-6 z-30"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-lg opacity-75 animate-pulse" />
        <div className="relative bg-gradient-to-r from-orange-500 to-red-500 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
          <span className="text-[8px] md:text-[10px] font-black tracking-[1.5px] text-white uppercase">
            {badge}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onHover, isFeatured }) {
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
      layout
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl transition-all duration-500 ${
        isFeatured ? "md:col-span-2 h-[500px] md:h-[600px]" : "h-[400px] md:h-[500px]"
      }`}
      style={{
        background: `linear-gradient(135deg, ${project.color}16, transparent 55%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        boxShadow: `0 20px 60px -15px rgba(${project.colorRgb},0.4)`,
        y: -8
      }}
    >
      {/* Featured Badge */}
      {isFeatured && <FeaturedBadge badge={project.badge} />}

      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: `1px solid ${project.color}33`,
        }}
        animate={{
          boxShadow: [
            `0 0 20px ${project.color}00`,
            `0 0 40px ${project.color}44`,
            `0 0 20px ${project.color}00`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="absolute inset-0 p-4 md:p-6">
        <div className={`grid ${isFeatured ? "grid-cols-3 gap-4" : "grid-cols-5 gap-3"} h-[60%] md:h-[65%]`}>
          <div className={`${isFeatured ? "col-span-2" : "col-span-3"} overflow-hidden rounded-2xl border border-white/15 bg-black/40`}>
            <motion.img
              src={project.desktopImage}
              alt={`${project.name} desktop preview`}
              className="h-full w-full object-contain p-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className={`${isFeatured ? "col-span-1" : "col-span-2"} overflow-hidden rounded-2xl border border-white/15 bg-black/40`}>
            <motion.img
              src={project.phoneImage}
              alt={`${project.name} mobile preview`}
              className="h-full w-full object-contain p-2"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Content Box */}
        <motion.div
          className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/75 p-4 md:p-6 backdrop-blur-xl md:inset-x-6 md:bottom-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <h3 className="font-['Anton'] text-[28px] md:text-[40px] leading-none tracking-tight">{project.name}</h3>
          <p className="mt-2 text-[10px] md:text-[12px] font-bold tracking-[1.5px] uppercase text-transparent bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text">
            {project.tagline}
          </p>
          <p className="mt-3 text-[12px] md:text-[13px] text-white/70 leading-relaxed">{project.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="rounded-full border px-2.5 md:px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.8px] transition-all"
                style={{
                  borderColor: `${project.color}88`,
                  color: project.color,
                  background: `${project.color}15`,
                }}
                whileHover={{ 
                  background: `${project.color}25`,
                  transform: "scale(1.1)"
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/8 px-4 py-2.5 text-[11px] font-bold tracking-[1.5px] uppercase text-white transition-all hover:border-white/50 hover:bg-white/14"
            whileHover={{ x: 4, gap: "14px" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Open Project</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink size={14} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState("saas");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setOrbPos({ x: e.clientX - 250, y: e.clientY - 250 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = activeTab === "saas" ? SAAS_PRODUCTS : PORTFOLIO_WEBSITES;

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
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
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
            : "radial-gradient(circle, rgba(255,107,53,0.08), transparent 50%)",
          filter: "blur(80px)",
        }}
        animate={{
          opacity: activeProject ? 0.5 : 0.25,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Accent Glows */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(255,107,53,0.12), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-20">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-20"
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
            <span className="w-6 md:w-8 h-px bg-gradient-to-r from-orange-500 to-transparent" />
            <span className="text-[8px] md:text-[10px] tracking-[3px] md:tracking-[4px] text-white/30 uppercase font-['Exo_2'] font-semibold">
              03 — Featured Work
            </span>
          </motion.div>

          <motion.h1
            className="font-['Anton'] text-[44px] md:text-[80px] leading-[1.05] tracking-[-1.5px] md:tracking-[-2px] mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            <motion.span
              className="bg-gradient-to-r from-orange-400 via-white to-orange-300 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              PORTFOLIO
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-white/40 text-[12px] md:text-[14px] max-w-3xl leading-relaxed font-['Exo_2']"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A carefully curated collection of digital experiences. From SaaS platforms built solo to full-scale enterprise applications, each project demonstrates technical excellence and creative problem-solving.
          </motion.p>

          <div
            className="h-px mt-6 md:mt-8"
            style={{
              background: "linear-gradient(to right, rgba(255,107,53,0.4), rgba(255,255,255,0.05))",
            }}
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex items-center gap-8 md:gap-12 mb-14 md:mb-20 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <TabButton
            label="SaaS Products"
            isActive={activeTab === "saas"}
            onClick={() => setActiveTab("saas")}
            icon={Zap}
          />
          <TabButton
            label="Portfolio Websites"
            isActive={activeTab === "websites"}
            onClick={() => setActiveTab("websites")}
            icon={Code2}
          />
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onHover={setActiveProject}
                isFeatured={project.featured}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6"
            whileHover={{ scale: 1.02, borderColor: "rgba(255,107,53,0.6)" }}
          >
            <Zap size={16} className="text-orange-400" />
            <span className="text-[11px] font-bold tracking-[1px] text-orange-300 uppercase">
              Want to build something amazing?
            </span>
          </motion.div>
          
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-white font-['Anton'] text-[14px] md:text-[16px] tracking-[2px] uppercase group"
            whileHover={{ gap: "14px", x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="group-hover:text-orange-400"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
