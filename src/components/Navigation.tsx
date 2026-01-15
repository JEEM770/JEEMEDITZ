import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Floating Pill Navigation */}
      <motion.div 
        className={`nav-pill flex items-center gap-1 px-2 transition-all duration-500 ${
          isScrolled ? 'shadow-lg shadow-background/20' : ''
        }`}
        animate={{ 
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(16px)',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 px-3 py-2 group">
          <motion.div 
            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="https://i.postimg.cc/ydzd8zDd/IMG-3305.jpg" 
              alt="JEEM Profile" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <span className="text-lg font-bold text-gradient hidden sm:block">JEEM</span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border mx-2" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.4 }}
            >
              <Link
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary -z-10"
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border mx-2" />
        
        {/* Theme Toggle */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <GlowButton
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-9 h-9"
          >
            <Sun className={`w-4 h-4 absolute transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
            <Moon className={`w-4 h-4 transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
          </GlowButton>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <GlowButton
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-full w-9 h-9"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </GlowButton>
        </motion.div>
      </motion.div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-4 right-4 mt-2 p-3 nav-pill md:hidden"
            initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <span className={isActive(item.path) ? 'font-semibold' : ''}>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
