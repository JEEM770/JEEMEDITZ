import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glowButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-[1.02]",
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
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [glowPosition, setGlowPosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setGlowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    // When asChild is true, render without the glow wrapper structure
    if (asChild) {
      return (
        <Slot
          ref={buttonRef as React.Ref<HTMLElement>}
          className={cn(glowButtonVariants({ variant, size, className }))}
          onMouseMove={handleMouseMove as any}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...(props as any)}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={buttonRef}
        className={cn(glowButtonVariants({ variant, size, className }))}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
    );
  }
);
GlowButton.displayName = "GlowButton";

export { GlowButton, glowButtonVariants };