import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full bg-accent/20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Loader content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated logo/spinner */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className="w-20 h-20 rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner spinning arc */}
          <motion.div
            className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-primary border-r-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-primary"
            style={{ transform: 'translate(-50%, -50%)' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Loading text */}
        <motion.div 
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Loading
          </span>
          <motion.span
            className="text-primary"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>
      </div>

      {/* Progress bar at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
};

export default PageLoader;
