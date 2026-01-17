// Centralized animation variants, timing, and presets for Framer-like smooth animations

export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export const smoothTransition = {
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: 0.6,
};

export const quickTransition = {
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: 0.3,
};

// Stagger container for lists and grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: smoothTransition,
  },
};

export const fadeUp = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: smoothTransition,
  },
};

export const fadeDown = {
  hidden: { 
    opacity: 0, 
    y: -30,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: smoothTransition,
  },
};

export const fadeLeft = {
  hidden: { 
    opacity: 0, 
    x: 50,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: smoothTransition,
  },
};

export const fadeRight = {
  hidden: { 
    opacity: 0, 
    x: -50,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: smoothTransition,
  },
};

// Scale animations
export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springTransition,
  },
};

export const scaleUp = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: springTransition,
  },
};

// 3D Tilt effect
export const tilt3D = {
  rest: { 
    rotateX: 0, 
    rotateY: 0,
    scale: 1,
  },
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Slide in animations with spring physics
export const slideInLeft = {
  hidden: { 
    x: -100, 
    opacity: 0,
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: springTransition,
  },
};

export const slideInRight = {
  hidden: { 
    x: 100, 
    opacity: 0,
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: springTransition,
  },
};

export const slideInUp = {
  hidden: { 
    y: 100, 
    opacity: 0,
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: springTransition,
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 20,
  },
};

export const hoverLift = {
  y: -8,
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 20,
  },
};

// Text reveal animation
export const textReveal = {
  hidden: { 
    opacity: 0,
    y: 50,
    skewY: 5,
  },
  visible: { 
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Character stagger for text
export const characterStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

export const character = {
  hidden: { 
    opacity: 0, 
    y: 20,
    rotateX: -90,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

// Blob/orb animation
export const blobFloat = {
  animate: {
    x: [0, 30, -20, 0],
    y: [0, -30, 20, 0],
    scale: [1, 1.1, 0.95, 1],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Counter animation helper
export const counterSpring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
