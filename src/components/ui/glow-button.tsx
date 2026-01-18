import * as React from "react";
import { useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const glowButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-primary/30 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]",
        ghost: "hover:bg-primary/10 hover:text-primary",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10 text-base font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
  magneticStrength?: number;
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = true, magneticStrength = 0.4, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [glowPosition, setGlowPosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    // Magnetic effect motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);
    const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      if (!buttonRef.current && !wrapperRef.current) return;
      const targetRef = wrapperRef.current || buttonRef.current;
      if (!targetRef) return;
      
      const rect = targetRef.getBoundingClientRect();
      
      // Glow position
      setGlowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      // Magnetic effect
      if (magnetic) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const radius = Math.max(rect.width, rect.height);

        if (distance < radius) {
          const pullStrength = (1 - distance / radius) * magneticStrength;
          x.set(deltaX * pullStrength);
          y.set(deltaY * pullStrength);
          scale.set(1.02);
        }
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
      scale.set(1);
    };

    // When asChild is true, render without the glow wrapper structure
    if (asChild) {
      return (
        <motion.div
          ref={wrapperRef}
          className="inline-block"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={magnetic ? {
            x: mouseXSpring,
            y: mouseYSpring,
            scale: scaleSpring,
          } : {}}
        >
          <Slot
            ref={buttonRef as React.Ref<HTMLElement>}
            className={cn(glowButtonVariants({ variant, size, className }))}
            {...(props as any)}
          >
            {children}
          </Slot>
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={wrapperRef}
        className="inline-block"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={magnetic ? {
          x: mouseXSpring,
          y: mouseYSpring,
          scale: scaleSpring,
        } : {}}
      >
        <button
          ref={buttonRef}
          className={cn(glowButtonVariants({ variant, size, className }))}
          {...props}
        >
          {/* Mouse-following glow effect */}
          <span
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(150px circle at ${glowPosition.x}px ${glowPosition.y}px, hsl(var(--primary) / 0.35), transparent 50%)`,
            }}
          />
          {/* Gradient border effect on hover */}
          <span
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, transparent 50%, hsl(var(--accent) / 0.2) 100%)',
            }}
          />
          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
      </motion.div>
    );
  }
);
GlowButton.displayName = "GlowButton";

export { GlowButton, glowButtonVariants };