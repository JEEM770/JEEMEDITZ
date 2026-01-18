import * as React from "react";
import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps, buttonVariants } from "./button";

interface MagneticButtonProps extends ButtonProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.4, radius = 100, variant, size, ...props }, ref) => {
    const buttonRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);
    const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate distance from center
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Only apply magnetic effect within radius
      if (distance < radius) {
        const pullStrength = (1 - distance / radius) * strength;
        x.set(deltaX * pullStrength);
        y.set(deltaY * pullStrength);
        scale.set(1.05);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      scale.set(1);
    };

    return (
      <motion.div
        ref={buttonRef}
        className="inline-block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          scale: scaleSpring,
        }}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-shadow duration-300",
            "hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
            className
          )}
          variant={variant}
          size={size}
          {...props}
        >
          <motion.span
            className="relative z-10 flex items-center gap-2"
            style={{
              x: useSpring(useMotionValue(0), springConfig),
              y: useSpring(useMotionValue(0), springConfig),
            }}
          >
            {children}
          </motion.span>
        </Button>
      </motion.div>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

// Magnetic wrapper for any element (links, custom buttons, etc.)
interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: React.ElementType;
}

export const MagneticElement = ({
  children,
  className,
  strength = 0.35,
  radius = 120,
  as: Component = "div",
}: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < radius) {
      const pullStrength = (1 - distance / radius) * strength;
      x.set(deltaX * pullStrength);
      y.set(deltaY * pullStrength);
      scale.set(1.02);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
        scale: scaleSpring,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
