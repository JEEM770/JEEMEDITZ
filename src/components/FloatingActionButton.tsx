import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Mail, Phone, MessageCircle, Youtube, Facebook } from 'lucide-react';

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:tunjanna11@gmail.com',
      color: 'bg-red-500/20 hover:bg-red-500/30 text-red-400',
      delay: 0,
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:01992331822',
      color: 'bg-green-500/20 hover:bg-green-500/30 text-green-400',
      delay: 0.05,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/8801992331822',
      color: 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400',
      delay: 0.1,
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://youtube.com/@jeem_editz?si=ymSLbn2QpqD_5KDg',
      color: 'bg-red-600/20 hover:bg-red-600/30 text-red-500',
      delay: 0.15,
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/share/15VzXaWHks/?mibextid=wwXIfr',
      color: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400',
      delay: 0.2,
    },
    {
      icon: TikTokIcon,
      label: 'TikTok',
      href: 'https://www.tiktok.com/@jeemeditz_?is_from_webapp=1&sender_device=pc',
      color: 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-400',
      delay: 0.25,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Social Links */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                whileHover={{ 
                  scale: 1.1, 
                  x: -5,
                  transition: { type: 'spring', stiffness: 400, damping: 15 }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  delay: link.delay,
                  type: 'spring',
                  stiffness: 400,
                  damping: 15
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-full ${link.color} backdrop-blur-sm border border-white/10 shadow-lg group`}
              >
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {link.label}
                </span>
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <link.icon className="w-5 h-5" />
                </motion.div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.6)] transition-shadow duration-300 flex items-center justify-center group"
        animate={isOpen ? { rotate: 45 } : { rotate: 0, y: [0, -8, 0, -4, 0] }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 17,
          y: {
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }
        }}
      >
        {/* Pulse animation rings */}
        <motion.span 
          className="absolute inset-0 rounded-full bg-primary"
          animate={{ 
            scale: [1, 1.5, 1.8],
            opacity: [0.3, 0.15, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.span 
          className="absolute inset-0 rounded-full bg-primary"
          animate={{ 
            scale: [1, 1.3, 1.5],
            opacity: [0.2, 0.1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />
        
        {/* Icon */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
