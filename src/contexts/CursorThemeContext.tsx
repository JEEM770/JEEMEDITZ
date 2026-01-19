import { createContext, useContext, useState, ReactNode } from "react";

export interface CursorTheme {
  id: string;
  name: string;
  emoji: string;
  skinGradient: string;
  blushColor: string;
  mouthColor: string;
  eyeColor: string;
  glowColor: string;
}

export const cursorThemes: CursorTheme[] = [
  {
    id: "peach",
    name: "Peach",
    emoji: "🍑",
    skinGradient: "linear-gradient(135deg, #fef3e2 0%, #fde1c4 50%, #fcd5b0 100%)",
    blushColor: "rgba(255, 150, 150, 0.6)",
    mouthColor: "#d4a89a",
    eyeColor: "#2d3748",
    glowColor: "hsl(var(--primary) / 0.4)",
  },
  {
    id: "bubblegum",
    name: "Bubblegum",
    emoji: "🌸",
    skinGradient: "linear-gradient(135deg, #ffe4ec 0%, #ffb6c8 50%, #ff9bb3 100%)",
    blushColor: "rgba(255, 100, 150, 0.5)",
    mouthColor: "#e87a9f",
    eyeColor: "#4a1942",
    glowColor: "rgba(255, 105, 180, 0.4)",
  },
  {
    id: "lavender",
    name: "Lavender",
    emoji: "💜",
    skinGradient: "linear-gradient(135deg, #f3e8ff 0%, #ddd6fe 50%, #c4b5fd 100%)",
    blushColor: "rgba(200, 150, 255, 0.5)",
    mouthColor: "#a78bfa",
    eyeColor: "#3b0764",
    glowColor: "rgba(167, 139, 250, 0.4)",
  },
  {
    id: "mint",
    name: "Mint",
    emoji: "🌿",
    skinGradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)",
    blushColor: "rgba(100, 200, 150, 0.5)",
    mouthColor: "#34d399",
    eyeColor: "#064e3b",
    glowColor: "rgba(52, 211, 153, 0.4)",
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    skinGradient: "linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)",
    blushColor: "rgba(255, 150, 100, 0.5)",
    mouthColor: "#d97706",
    eyeColor: "#78350f",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    skinGradient: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 50%, #38bdf8 100%)",
    blushColor: "rgba(100, 180, 255, 0.5)",
    mouthColor: "#0284c7",
    eyeColor: "#0c4a6e",
    glowColor: "rgba(56, 189, 248, 0.4)",
  },
];

interface CursorThemeContextType {
  currentTheme: CursorTheme;
  setTheme: (themeId: string) => void;
  themes: CursorTheme[];
}

const CursorThemeContext = createContext<CursorThemeContextType | undefined>(undefined);

export const CursorThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<CursorTheme>(cursorThemes[0]);

  const setTheme = (themeId: string) => {
    const theme = cursorThemes.find((t) => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <CursorThemeContext.Provider value={{ currentTheme, setTheme, themes: cursorThemes }}>
      {children}
    </CursorThemeContext.Provider>
  );
};

export const useCursorTheme = () => {
  const context = useContext(CursorThemeContext);
  if (!context) {
    throw new Error("useCursorTheme must be used within a CursorThemeProvider");
  }
  return context;
};
