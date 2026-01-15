import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Video, Camera, Palette, Mail, Sun, Moon } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Camera },
    { name: 'About', path: '/about', icon: Video },
    { name: 'Portfolio', path: '/portfolio', icon: Palette },
    { name: 'Services', path: '/services', icon: Video },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all duration-300">
              <img
                src="https://i.postimg.cc/ydzd8zDd/IMG-3305.jpg" 
                alt="JEEM Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-gradient">JEEM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className={`w-4 h-4 transition-all duration-300 ${isActive(item.path) ? 'text-primary' : 'group-hover:text-primary'}`} />
                <span className={`link-underline ${isActive(item.path) ? 'font-medium' : ''}`}>{item.name}</span>
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <GlowButton
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
            >
              <Sun className={`w-5 h-5 absolute transition-all duration-300 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <Moon className={`w-5 h-5 transition-all duration-300 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
            </GlowButton>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            <GlowButton
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </GlowButton>
            <GlowButton
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </GlowButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50 animate-slide-up">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                style={{ '--i': index } as React.CSSProperties}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-primary' : ''}`} />
                <span className={isActive(item.path) ? 'text-gradient font-medium' : ''}>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
