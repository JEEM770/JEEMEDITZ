import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingActionButton = () => {
  const whatsappLink = 'https://wa.me/8801992331822';

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-shadow duration-300 flex items-center justify-center group"
      animate={{ y: [0, -8, 0, -4, 0] }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 17,
        y: {
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }
      }}
      aria-label="Contact on WhatsApp"
    >
      {/* Single pulse ring with longer delay */}
      <motion.span 
        className="absolute inset-0 rounded-full bg-emerald-500"
        animate={{ 
          scale: [1, 1.5],
          opacity: [0.2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeOut"
        }}
      />
      
      {/* WhatsApp Icon */}
      <motion.div
        animate={{ rotate: [0, -10, 10, -5, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 4
        }}
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </motion.div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-emerald-500/90 backdrop-blur-sm text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Chat on WhatsApp
      </span>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
    </motion.a>
  );
};

export default FloatingActionButton;
