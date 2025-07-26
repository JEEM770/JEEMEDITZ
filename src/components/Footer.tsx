import { Camera, Youtube, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 gold-glow">
                <img 
                  src="https://i.postimg.cc/5N3cH1XN/IMG-3305.jpg" 
                  alt="JEEM" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-primary">JEEM</span>
            </div>
            <p className="text-muted-foreground">
              Professional video editor, cinematographer, and visual storyteller crafting compelling narratives through the lens.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-2">
              <a
                href="mailto:tunjanna11@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>tunjanna11@gmail.com</span>
              </a>
              <a
                href="tel:01992331822"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
              >
                <Phone className="w-4 h-4" />
                <span>01992331822</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://youtube.com/@jeem_editz?si=8zTx6DRW8Cu-8FIj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:gold-glow transition-cinematic"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1Aqc1xuJLE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:gold-glow transition-cinematic"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © {currentYear} JEEM. All rights reserved. Crafted with passion for visual storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;