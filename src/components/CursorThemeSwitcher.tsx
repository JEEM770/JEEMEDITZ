import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useCursorTheme } from "@/contexts/CursorThemeContext";

const CursorThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, themes } = useCursorTheme();

  // Check if device supports hover (not touch)
  const hasHover = typeof window !== 'undefined' 
    ? window.matchMedia("(hover: hover) and (pointer: fine)").matches 
    : false;

  if (!hasHover) return null;

  return (
    <div className="fixed bottom-24 left-6 z-[9990]">
      {/* Theme options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0 bg-background/90 backdrop-blur-lg border border-border rounded-2xl p-3 shadow-xl"
          >
            <div className="text-xs text-muted-foreground mb-2 px-1 font-medium">
              Cursor Theme
            </div>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                    currentTheme.id === theme.id
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:bg-muted"
                  }`}
                  style={{
                    background: theme.skinGradient,
                  }}
                  title={theme.name}
                >
                  <span className="drop-shadow-sm">{theme.emoji}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen 
            ? "bg-primary text-primary-foreground" 
            : "bg-background/80 backdrop-blur-lg border border-border text-foreground hover:bg-muted"
        }`}
        style={{
          boxShadow: isOpen ? `0 0 20px ${currentTheme.glowColor}` : undefined,
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Palette className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default CursorThemeSwitcher;
