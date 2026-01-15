import { Youtube, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/50 backdrop-blur-sm border-t border-border/50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all duration-300 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)]">
                <img 
                  src="https://i.postimg.cc/5N3cH1XN/IMG-3305.jpg" 
                  alt="JEEM" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-gradient">JEEM</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Professional video editor, cinematographer, and visual storyteller crafting compelling narratives through the lens.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:tunjanna11@gmail.com"
                className="group flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <span className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="link-underline">tunjanna11@gmail.com</span>
              </a>
              <a
                href="tel:01992331822"
                className="group flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <span className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="link-underline">01992331822</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Follow Me</h3>
            <div className="flex space-x-3">
              <a
                href="https://youtube.com/@jeem_editz?si=8zTx6DRW8Cu-8FIj"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:scale-110"
              >
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
              <a
                href="https://www.facebook.com/share/1Aqc1xuJLE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground">
            © {currentYear} <span className="text-gradient font-medium">JEEM</span>. All rights reserved. Crafted with passion for visual storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
