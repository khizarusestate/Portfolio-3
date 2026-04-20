import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trailParticles, setTrailParticles] = useState([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const idRef = useRef(0);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });

      // Create trail particles
      const distance = Math.hypot(
        clientX - lastPosRef.current.x,
        clientY - lastPosRef.current.y
      );

      if (distance > 8) {
        const id = idRef.current++;
        const newParticle = {
          id,
          x: clientX,
          y: clientY,
          size: Math.random() * 4 + 2,
          life: 1,
        };

        setTrailParticles((prev) => {
          const updated = [...prev, newParticle];
          return updated.slice(-30); // Keep only last 30 particles
        });

        lastPosRef.current = { x: clientX, y: clientY };
      }

      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('interactive') ||
        target.closest('a') ||
        target.closest('button');

      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -100, y: -100 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Animate trail particles (fade out)
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.05 }))
          .filter((p) => p.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom Cursor Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: mousePos.x,
          y: mousePos.y,
          left: 0,
          top: 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
      >
        {/* Inner dot */}
        <div
          className="absolute w-2 h-2 rounded-full bg-white"
          style={{
            left: '-4px',
            top: '-4px',
            boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(74,222,128,0.4)',
          }}
        />

        {/* Outer ring - appears on hover */}
        {isHovering && (
          <motion.div
            className="absolute w-6 h-6 rounded-full border-2 border-white"
            style={{
              left: '-12px',
              top: '-12px',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Glow effect */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '20px',
            height: '20px',
            left: '-10px',
            top: '-10px',
            background: 'radial-gradient(circle, rgba(74,222,128,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: isHovering ? 1.8 : 1,
          }}
        />
      </motion.div>

      {/* Trail Particles */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: 0,
          top: 0,
        }}
      >
        {trailParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              x: particle.x,
              y: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.life * 0.6,
              background: `linear-gradient(135deg, 
                rgba(74,222,128,${particle.life * 0.8}), 
                rgba(255,255,255,${particle.life * 0.4}))`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(74,222,128,${particle.life * 0.6})`,
            }}
            initial={{
              scale: 1,
              y: particle.y - 10,
            }}
            animate={{
              scale: 0,
              y: particle.y + 20,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Click ripple effect */}
      <ClickRipple />
    </>
  );
}

// Ripple effect on click
function ClickRipple() {
  const [ripples, setRipples] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleClick = (e) => {
      const id = idRef.current++;
      const newRipple = {
        id,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            x: ripple.x,
            y: ripple.y,
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            border: '2px solid rgba(74,222,128,0.6)',
          }}
          animate={{
            width: 80,
            height: 80,
            x: ripple.x - 40,
            y: ripple.y - 40,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          initial={{
            opacity: 1,
          }}
        />
      ))}
    </>
  );
}
