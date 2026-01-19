import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleIdRef = useRef(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMoveRef = useRef({ x: 0, y: 0 });

  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for the character body (follows with cute delay)
  const bodyX = useSpring(cursorX, { stiffness: 200, damping: 25, mass: 0.8 });
  const bodyY = useSpring(cursorY, { stiffness: 200, damping: 25, mass: 0.8 });

  // Eye tracking - pupils move toward cursor direction
  const pupilOffsetX = useMotionValue(0);
  const pupilOffsetY = useMotionValue(0);
  const smoothPupilX = useSpring(pupilOffsetX, { stiffness: 300, damping: 30 });
  const smoothPupilY = useSpring(pupilOffsetY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setIsIdle(false);
      
      // Calculate velocity for eye movement
      const velocityX = e.clientX - lastMoveRef.current.x;
      const velocityY = e.clientY - lastMoveRef.current.y;
      lastMoveRef.current = { x: e.clientX, y: e.clientY };

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Clamp pupil offset for realistic eye movement
      const clampedX = Math.max(-4, Math.min(4, velocityX * 0.5));
      const clampedY = Math.max(-4, Math.min(4, velocityY * 0.5));
      pupilOffsetX.set(clampedX);
      pupilOffsetY.set(clampedY);

      // Reset idle timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        pupilOffsetX.set(0);
        pupilOffsetY.set(0);
      }, 3000);

      // Spawn sparkles occasionally
      if (Math.random() > 0.92) {
        const newSparkle: Sparkle = {
          id: sparkleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
        };
        setSparkles((prev) => [...prev.slice(-4), newSparkle]);
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
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [cursorX, cursorY, pupilOffsetX, pupilOffsetY]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  if (prefersReducedMotion) return null;

  const characterSize = isHovering ? 52 : isClicking ? 40 : 46;

  return (
    <>
      {/* Sparkle particles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="pointer-events-none fixed z-[9997]"
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            left: sparkle.x,
            top: sparkle.y,
            x: "-50%",
            y: "-50%",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" className="fill-primary">
            <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
          </svg>
        </motion.div>
      ))}

      {/* Main character body */}
      <motion.div
        className="pointer-events-none fixed z-[10000]"
        style={{
          left: bodyX,
          top: bodyY,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Character face */}
        <motion.div
          className="relative rounded-full"
          animate={{
            width: characterSize,
            height: characterSize,
            scale: isClicking ? 0.9 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            background: "linear-gradient(135deg, #fef3e2 0%, #fde1c4 50%, #fcd5b0 100%)",
            boxShadow: `
              0 0 20px hsl(var(--primary) / 0.4),
              0 4px 12px rgba(0, 0, 0, 0.15),
              inset 0 -2px 4px rgba(0, 0, 0, 0.05),
              inset 0 2px 4px rgba(255, 255, 255, 0.8)
            `,
          }}
        >
          {/* Left eye */}
          <div
            className="absolute bg-white rounded-full overflow-hidden"
            style={{
              width: isIdle ? 10 : 12,
              height: isIdle ? 4 : isClicking ? 2 : 12,
              left: "22%",
              top: isIdle ? "38%" : "32%",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "height 0.2s ease, top 0.2s ease",
            }}
          >
            {!isClicking && !isIdle && (
              <motion.div
                className="absolute rounded-full bg-[#2d3748]"
                style={{
                  width: 6,
                  height: 6,
                  left: 3,
                  top: 3,
                  x: smoothPupilX,
                  y: smoothPupilY,
                }}
              >
                {/* Eye highlight */}
                <div 
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{ top: 0, left: 1 }}
                />
              </motion.div>
            )}
          </div>

          {/* Right eye */}
          <div
            className="absolute bg-white rounded-full overflow-hidden"
            style={{
              width: isIdle ? 10 : 12,
              height: isIdle ? 4 : isClicking ? 2 : 12,
              right: "22%",
              top: isIdle ? "38%" : "32%",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              transition: "height 0.2s ease, top 0.2s ease",
            }}
          >
            {!isClicking && !isIdle && (
              <motion.div
                className="absolute rounded-full bg-[#2d3748]"
                style={{
                  width: 6,
                  height: 6,
                  left: 3,
                  top: 3,
                  x: smoothPupilX,
                  y: smoothPupilY,
                }}
              >
                {/* Eye highlight */}
                <div 
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{ top: 0, left: 1 }}
                />
              </motion.div>
            )}
          </div>

          {/* Blush - left */}
          <motion.div
            className="absolute rounded-full"
            animate={{
              opacity: isHovering ? 0.7 : 0.3,
              scale: isHovering ? 1.1 : 1,
            }}
            style={{
              width: 8,
              height: 5,
              left: "12%",
              top: "52%",
              background: "rgba(255, 150, 150, 0.6)",
              filter: "blur(1px)",
            }}
          />

          {/* Blush - right */}
          <motion.div
            className="absolute rounded-full"
            animate={{
              opacity: isHovering ? 0.7 : 0.3,
              scale: isHovering ? 1.1 : 1,
            }}
            style={{
              width: 8,
              height: 5,
              right: "12%",
              top: "52%",
              background: "rgba(255, 150, 150, 0.6)",
              filter: "blur(1px)",
            }}
          />

          {/* Mouth */}
          <div
            className="absolute"
            style={{
              left: "50%",
              top: isClicking ? "60%" : "58%",
              transform: "translateX(-50%)",
            }}
          >
            {isClicking ? (
              // Surprised "O" mouth
              <div
                className="rounded-full bg-[#d4a89a]"
                style={{
                  width: 6,
                  height: 6,
                  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.2)",
                }}
              />
            ) : isHovering ? (
              // Big happy smile
              <div
                style={{
                  width: 14,
                  height: 7,
                  borderRadius: "0 0 7px 7px",
                  background: "#d4a89a",
                  boxShadow: "inset 0 -1px 2px rgba(0, 0, 0, 0.1)",
                }}
              />
            ) : isIdle ? (
              // Sleepy mouth
              <div
                style={{
                  width: 8,
                  height: 2,
                  borderRadius: "2px",
                  background: "#d4a89a",
                }}
              />
            ) : (
              // Normal smile
              <div
                style={{
                  width: 10,
                  height: 5,
                  borderRadius: "0 0 5px 5px",
                  background: "#d4a89a",
                  boxShadow: "inset 0 -1px 2px rgba(0, 0, 0, 0.1)",
                }}
              />
            )}
          </div>

          {/* Idle ZZZ bubbles */}
          {isIdle && (
            <div className="absolute -right-3 -top-2">
              <motion.span
                className="text-[8px] font-bold text-primary/60"
                animate={{ opacity: [0, 1, 0], y: [0, -5, -10] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              >
                z
              </motion.span>
              <motion.span
                className="text-[10px] font-bold text-primary/70 absolute left-2 -top-1"
                animate={{ opacity: [0, 1, 0], y: [0, -5, -10] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                Z
              </motion.span>
              <motion.span
                className="text-[12px] font-bold text-primary/80 absolute left-4 -top-2"
                animate={{ opacity: [0, 1, 0], y: [0, -5, -10] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              >
                Z
              </motion.span>
            </div>
          )}
        </motion.div>

        {/* Glow ring underneath */}
        <motion.div
          className="absolute rounded-full -z-10"
          animate={{
            width: characterSize + 20,
            height: characterSize + 20,
            opacity: isHovering ? 0.5 : 0.25,
          }}
          style={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
