import React, { ReactNode, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  springTransition,
} from '@/lib/animations';

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Fade In component with customizable direction
export const FadeIn = ({ 
  children, 
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: MotionWrapperProps & { 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionVariants = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...directionVariants[direction],
        filter: "blur(10px)",
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0,
        filter: "blur(0px)",
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Slide In component with spring physics
export const SlideIn = ({ 
  children, 
  className,
  delay = 0,
  direction = 'left',
}: MotionWrapperProps & { direction?: 'left' | 'right' | 'up' | 'down' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionVariants = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...directionVariants[direction],
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
      } : {}}
      transition={{
        ...springTransition,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Scale In component
export const ScaleIn = ({ 
  children, 
  className,
  delay = 0,
}: MotionWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        ...springTransition,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container for lists
export const StaggerContainer = ({ 
  children, 
  className,
  delay = 0,
  staggerDelay = 0.1,
}: MotionWrapperProps & { staggerDelay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item - use inside StaggerContainer
export const StaggerItem = ({ 
  children, 
  className,
}: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
};

// 3D Hover Card with tilt effect
export const HoverCard3D = ({ 
  children, 
  className,
  intensity = 10,
}: MotionWrapperProps & { intensity?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// Parallax wrapper
export const Parallax = ({ 
  children, 
  className,
  speed = 0.5,
}: MotionWrapperProps & { speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  
  const y = useTransform(scrollY, [0, 1], [0, 100 * speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Text Reveal - word by word
export const TextReveal = ({
  text, 
  className,
  delay = 0,
}: { text: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] inline-block"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 20,
              filter: "blur(10px)",
            },
            visible: { 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Magnetic button effect
export const MagneticWrapper = ({ 
  children, 
  className,
  strength = 0.3,
}: MotionWrapperProps & { strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
    >
      {children}
    </motion.div>
  );
};

export default {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverCard3D,
  Parallax,
  TextReveal,
  MagneticWrapper,
};
