import { Youtube, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/30 backdrop-blur-xl border-t border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-500">
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
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:tunjanna11@gmail.com"
                className="group flex items-center space-x-4 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="link-underline">tunjanna11@gmail.com</span>
              </a>
              <a
                href="tel:01992331822"
                className="group flex items-center space-x-4 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </span>
                <span className="link-underline">01992331822</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://youtube.com/@jeem_editz?si=8zTx6DRW8Cu-8FIj"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-110"
              >
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
              <a
                href="https://www.facebook.com/share/1Aqc1xuJLE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © {currentYear} <span className="text-gradient font-semibold">JEEM</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;