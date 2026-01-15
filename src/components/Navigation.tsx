import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Video, Camera, Palette, Mail, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
              <img
                src="https://i.postimg.cc/ydzd8zDd/IMG-3305.jpg" 
                alt="JEEM Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold">JEEM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm transition-colors ${
                  isActive(item.path)
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-8 h-8"
            >
              <Sun className={`w-4 h-4 absolute transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <Moon className={`w-4 h-4 transition-all ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </Button>

            {/* CTA Button */}
            <Button size="sm" className="btn-glow text-sm">
              Get Template
            </Button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="btn-glow"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-3 space-y-1 border-t border-border/50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded text-sm transition-colors ${
                  isActive(item.path)
                    ? 'text-foreground bg-secondary/50'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
