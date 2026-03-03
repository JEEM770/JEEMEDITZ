import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
const GOLDEN_THEME = {
  skinGradient: "linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)",
  blushColor: "rgba(255, 150, 100, 0.5)",
  mouthColor: "#d97706",
  eyeColor: "#78350f",
  glowColor: "rgba(245, 158, 11, 0.4)",
};

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMoveRef = useRef({ x: 0, y: 0 });

  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Simplified spring physics (reduced stiffness for better performance)
  const bodyX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const bodyY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  // Eye tracking - simplified
  const pupilOffsetX = useMotionValue(0);
  const pupilOffsetY = useMotionValue(0);
  const smoothPupilX = useSpring(pupilOffsetX, { stiffness: 200, damping: 25 });
  const smoothPupilY = useSpring(pupilOffsetY, { stiffness: 200, damping: 25 });

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
        !!target.closest("[data-cursor-hover]");
      
      setIsHovering(isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover, { passive: true });
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

  const characterSize = isHovering ? 48 : isClicking ? 38 : 42;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
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
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: GOLDEN_THEME.skinGradient,
          boxShadow: `
            0 0 15px ${GOLDEN_THEME.glowColor},
            0 3px 8px rgba(0, 0, 0, 0.15),
            inset 0 -2px 4px rgba(0, 0, 0, 0.05),
            inset 0 2px 4px rgba(255, 255, 255, 0.8)
          `,
        }}
      >
        {/* Left eye */}
        <div
          className="absolute bg-white rounded-full overflow-hidden"
          style={{
            width: isIdle ? 10 : 11,
            height: isIdle ? 4 : isClicking ? 2 : 11,
            left: "22%",
            top: isIdle ? "38%" : "32%",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
            transition: "height 0.15s ease, top 0.15s ease",
          }}
        >
          {!isClicking && !isIdle && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 5,
                height: 5,
                left: 3,
                top: 3,
                x: smoothPupilX,
                y: smoothPupilY,
                backgroundColor: GOLDEN_THEME.eyeColor,
              }}
            >
              <div 
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ top: 0, left: 1 }}
              />
            </motion.div>
          )}
        </div>

        {/* Right eye */}
        <div
          className="absolute bg-white rounded-full overflow-hidden"
          style={{
            width: isIdle ? 10 : 11,
            height: isIdle ? 4 : isClicking ? 2 : 11,
            right: "22%",
            top: isIdle ? "38%" : "32%",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
            transition: "height 0.15s ease, top 0.15s ease",
          }}
        >
          {!isClicking && !isIdle && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 5,
                height: 5,
                left: 3,
                top: 3,
                x: smoothPupilX,
                y: smoothPupilY,
                backgroundColor: GOLDEN_THEME.eyeColor,
              }}
            >
              <div 
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ top: 0, left: 1 }}
              />
            </motion.div>
          )}
        </div>

        {/* Blush - left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 7,
            height: 4,
            left: "14%",
            top: "52%",
            background: GOLDEN_THEME.blushColor,
            opacity: isHovering ? 0.6 : 0.25,
            filter: "blur(1px)",
            transition: "opacity 0.2s ease",
          }}
        />

        {/* Blush - right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 7,
            height: 4,
            right: "14%",
            top: "52%",
            background: GOLDEN_THEME.blushColor,
            opacity: isHovering ? 0.6 : 0.25,
            filter: "blur(1px)",
            transition: "opacity 0.2s ease",
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
            <div
              className="rounded-full"
              style={{
                width: 5,
                height: 5,
                backgroundColor: GOLDEN_THEME.mouthColor,
              }}
            />
          ) : isHovering ? (
            <div
              style={{
                width: 12,
                height: 6,
                borderRadius: "0 0 6px 6px",
                backgroundColor: GOLDEN_THEME.mouthColor,
              }}
            />
          ) : isIdle ? (
            <div
              style={{
                width: 7,
                height: 2,
                borderRadius: "2px",
                backgroundColor: GOLDEN_THEME.mouthColor,
              }}
            />
          ) : (
            <div
              style={{
                width: 9,
                height: 4,
                borderRadius: "0 0 4px 4px",
                backgroundColor: GOLDEN_THEME.mouthColor,
              }}
            />
          )}
        </div>

        {/* Idle ZZZ - simplified */}
        {isIdle && (
          <div className="absolute -right-2 -top-1 text-[10px] font-bold" style={{ color: GOLDEN_THEME.mouthColor, opacity: 0.5 }}>
            z
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CursorFollower;
