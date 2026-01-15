import { Youtube, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-border">
                <img 
                  src="https://i.postimg.cc/5N3cH1XN/IMG-3305.jpg" 
                  alt="JEEM" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold">JEEM</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional video editor, cinematographer, and visual storyteller crafting compelling narratives through the lens.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-medium">Get In Touch</h3>
            <div className="space-y-2">
              <a
                href="mailto:tunjanna11@gmail.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>tunjanna11@gmail.com</span>
              </a>
              <a
                href="tel:01992331822"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>01992331822</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-medium">Follow Me</h3>
            <div className="flex space-x-3">
              <a
                href="https://youtube.com/@jeem_editz?si=8zTx6DRW8Cu-8FIj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1Aqc1xuJLE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} JEEM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
