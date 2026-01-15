import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      {/* Floating Pill Navigation */}
      <div className="nav-pill flex items-center gap-1 px-2">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 px-3 py-2 group">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300">
            <img
              src="https://i.postimg.cc/ydzd8zDd/IMG-3305.jpg" 
              alt="JEEM Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-bold text-gradient hidden sm:block">JEEM</span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border mx-2" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border mx-2" />
        
        {/* Theme Toggle */}
        <GlowButton
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-9 h-9"
        >
          <Sun className={`w-4 h-4 absolute transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
          <Moon className={`w-4 h-4 transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
        </GlowButton>

        {/* Mobile Menu Button */}
        <GlowButton
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden rounded-full w-9 h-9"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </GlowButton>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-3 nav-pill md:hidden animate-slide-up">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 0.05}s` }}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 animate-fade-in ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <span className={isActive(item.path) ? 'font-semibold' : ''}>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;