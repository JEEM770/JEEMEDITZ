import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Video, Camera, Palette, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Camera },
    { name: 'About', path: '/about', icon: Video },
    { name: 'Portfolio', path: '/portfolio', icon: Palette },
    { name: 'Services', path: '/services', icon: Video },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
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
                <span className={`link-underline ${isActive(item.path) ? 'glow-text' : ''}`}>{item.name}</span>
                {isActive(item.path) && (
                  <span className="absolute inset-0 rounded-lg bg-primary/5 animate-pulse-glow" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative btn-glow"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 stagger-children ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]'
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
