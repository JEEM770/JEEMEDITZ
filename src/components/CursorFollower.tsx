import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
}

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);

  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for the outer ring (follows with delay)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.5 });

  // Spring physics for the glow (even more delay)
  const glowX = useSpring(cursorX, { stiffness: 80, damping: 25, mass: 1 });
  const glowY = useSpring(cursorY, { stiffness: 80, damping: 25, mass: 1 });

  useEffect(() => {
    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail particles with throttling
      const now = Date.now();
      if (now - lastTrailTime.current > 30) {
        lastTrailTime.current = now;
        const newParticle: TrailParticle = {
          id: trailIdRef.current++,
          x: e.clientX,
          y: e.clientY,
        };
        setTrail((prev) => [...prev.slice(-7), newParticle]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Detect hovering over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        !!target.closest("[role='button']") ||
        !!target.closest("[data-cursor-hover]") ||
        getComputedStyle(target).cursor === "pointer";
      
      setIsHovering(isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Clean up old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Trail particles */}
      {trail.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-[9997] rounded-full"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            left: particle.x,
            top: particle.y,
            width: 6 - index * 0.5,
            height: 6 - index * 0.5,
            x: "-50%",
            y: "-50%",
            background: `hsl(var(--primary) / ${0.4 - index * 0.05})`,
            boxShadow: `0 0 ${10 - index}px hsl(var(--primary) / 0.5)`,
          }}
        />
      ))}

      {/* Outer glow (slowest follow) */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full opacity-30"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          width: isHovering ? 80 : 60,
          height: isHovering ? 80 : 60,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
          filter: "blur(8px)",
          opacity: isVisible ? 0.3 : 0,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
        }}
      />

      {/* Outer ring (medium follow speed) */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border-2"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          width: isHovering ? 50 : isClicking ? 30 : 40,
          height: isHovering ? 50 : isClicking ? 30 : 40,
          borderColor: "hsl(var(--primary) / 0.5)",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease, border-color 0.2s ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Primary cursor dot (fastest, precise follow) */}
      <motion.div
        className="pointer-events-none fixed z-[10000] rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          width: isHovering ? 12 : isClicking ? 6 : 8,
          height: isHovering ? 12 : isClicking ? 6 : 8,
          backgroundColor: "hsl(var(--primary))",
          boxShadow: `0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.4)`,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
};

export default CursorFollower;
