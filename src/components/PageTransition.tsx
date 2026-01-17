import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: 'blur(12px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(8px)',
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: 0.6,
};

const exitTransition = {
  type: 'tween' as const,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: 0.4,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
