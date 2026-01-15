import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientRevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  gradient?: string;
}

export const GradientRevealText = ({
  children,
  className,
  delay = 0,
  duration = 1.2,
  gradient = 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
}: GradientRevealTextProps) => {
  return (
    <motion.span
      className={cn('relative inline-block overflow-hidden', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Base text (revealed) */}
      <motion.span
        className="inline-block"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.01, delay: delay + duration * 0.3 }
          }
        }}
      >
        {children}
      </motion.span>
      
      {/* Gradient sweep overlay */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: gradient,
          backgroundSize: '200% 100%',
        }}
        variants={{
          hidden: { 
            x: '-100%',
            opacity: 1,
          },
          visible: { 
            x: '200%',
            opacity: 0,
            transition: { 
              x: { duration, delay, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3, delay: delay + duration * 0.7 }
            }
          }
        }}
      />
      
      {/* Text mask that reveals */}
      <motion.span
        className="absolute inset-0 overflow-hidden"
        variants={{
          hidden: { clipPath: 'inset(0 100% 0 0)' },
          visible: { 
            clipPath: 'inset(0 0% 0 0)',
            transition: { duration: duration * 0.8, delay, ease: [0.16, 1, 0.3, 1] }
          }
        }}
      >
        <span className="text-gradient">{children}</span>
      </motion.span>
    </motion.span>
  );
};

interface SweepRevealHeadingProps {
  normalText: string;
  gradientText: string;
  className?: string;
  delay?: number;
}

export const SweepRevealHeading = ({
  normalText,
  gradientText,
  className,
  delay = 0,
}: SweepRevealHeadingProps) => {
  return (
    <span className={cn('inline-block', className)}>
      <motion.span
        className="inline-block text-foreground"
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {normalText}
      </motion.span>{' '}
      <motion.span
        className="relative inline-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Hidden text for layout */}
        <span className="invisible">{gradientText}</span>
        
        {/* Reveal container */}
        <motion.span
          className="absolute inset-0 overflow-hidden"
          variants={{
            hidden: { width: '0%' },
            visible: { 
              width: '100%',
              transition: { 
                duration: 0.8, 
                delay: delay + 0.3,
                ease: [0.16, 1, 0.3, 1]
              }
            }
          }}
        >
          <span className="text-gradient whitespace-nowrap">{gradientText}</span>
        </motion.span>
        
        {/* Sweep line */}
        <motion.span
          className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-accent to-primary"
          style={{ boxShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--accent))' }}
          variants={{
            hidden: { left: '0%', opacity: 0 },
            visible: { 
              left: '100%',
              opacity: [0, 1, 1, 0],
              transition: { 
                left: { duration: 0.8, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8, delay: delay + 0.3, times: [0, 0.1, 0.9, 1] }
              }
            }
          }}
        />
      </motion.span>
    </span>
  );
};

export default GradientRevealText;