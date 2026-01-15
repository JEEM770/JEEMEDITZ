import { Youtube, Facebook, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
  };
    }
  };

  return (
    <footer className="relative bg-card/30 backdrop-blur-xl border-t border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Brand */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex items-center space-x-3 group">
              <motion.div 
                className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://i.postimg.cc/5N3cH1XN/IMG-3305.jpg" 
                  alt="JEEM" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <span className="text-2xl font-bold text-gradient">JEEM</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Professional video editor, cinematographer, and visual storyteller crafting compelling narratives through the lens.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:tunjanna11@gmail.com"
                className="group flex items-center space-x-4 text-muted-foreground hover:text-primary transition-all duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.span>
                <span className="link-underline">tunjanna11@gmail.com</span>
              </motion.a>
              <motion.a
                href="tel:01992331822"
                className="group flex items-center space-x-4 text-muted-foreground hover:text-primary transition-all duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Phone className="w-5 h-5" />
                </motion.span>
                <span className="link-underline">01992331822</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground">Follow Me</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://youtube.com/@jeem_editz?si=8zTx6DRW8Cu-8FIj"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/share/1Aqc1xuJLE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            © {currentYear} <span className="text-gradient font-semibold">JEEM</span>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
