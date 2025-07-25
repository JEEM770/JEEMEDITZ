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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-cinematic hover:scale-105">
            <div className="w-10 h-10 rounded-lg overflow-hidden red-glow">
              <img 
                src="https://i.postimg.cc/ydzd8zDd/IMG-3305.jpg" 
                alt="JEEM Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-primary">JEEM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-cinematic ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground red-glow'
                    : 'text-foreground hover:text-primary hover:bg-secondary'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-cinematic ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground red-glow'
                    : 'text-foreground hover:text-primary hover:bg-secondary'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;