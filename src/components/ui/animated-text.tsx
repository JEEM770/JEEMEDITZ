import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'blur' | 'word';
}

const easeSmooth = [0.16, 1, 0.3, 1] as const;

export const AnimatedText = ({
  text,
  className,
  delay = 0,
  staggerDelay = 0.05,
  animation = 'fadeUp',
}: AnimatedTextProps) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const getChildVariants = () => {
    switch (animation) {
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.6, ease: easeSmooth },
          },
        };
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.5, ease: easeSmooth },
          },
        };
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(20px)' },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: easeSmooth },
          },
        };
      case 'word':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: easeSmooth },
          },
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const childVariants = getChildVariants();

  return (
    <motion.span
      className={cn('inline-flex flex-wrap', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] inline-block"
          variants={childVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface AnimatedCharactersProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const AnimatedCharacters = ({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: AnimatedCharactersProps) => {
  const characters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: easeSmooth },
    },
  };

  return (
    <motion.span
      className={cn('inline-block', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={childVariants}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
