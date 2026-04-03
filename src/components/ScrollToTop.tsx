import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm border border-primary/30 text-foreground shadow-lg hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:border-primary/60 transition-all duration-300 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--border))" strokeWidth="2" className="opacity-30" />
            <motion.circle
              cx="24" cy="24" r="20" fill="none"
              stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
              className="drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]"
            />
          </svg>
          <ArrowUp className="w-5 h-5 text-primary" />
          <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
