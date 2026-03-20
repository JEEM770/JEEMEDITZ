

## Eid Mubarak Card Generator — Implementation Plan

### Overview
Add a new route `/eid-card` with a standalone page for generating Eid Mubarak greeting cards. The page has a form (name + photo upload) on the left, live card preview on the right, and download/share buttons.

### New Files

**`src/pages/EidCard.tsx`** — Main page component containing:

- **Form section** (left on desktop, top on mobile):
  - Text input for name (default placeholder: "JEEM")
  - File upload for photo (JPG/PNG), with circular preview
  - Green "Generate Card" button

- **Card preview section** (right on desktop, bottom on mobile):
  - Live-updating canvas-based card at 1200x1600px (scaled to fit)
  - Green rounded border frame
  - Cream background with subtle diamond grid pattern
  - Faded repeating "ঈদ মোবারক" watermark text in background
  - Large centered Bengali: "ঈদ" and "(মোবারক)" in dark elegant font
  - Wish text: "আপনার ও আপনার পরিবারের জন্য রইলো ঈদের অনেক অনেক শুভেচ্ছা ও ভালোবাসা!"
  - "শুভেচ্ছাতে," followed by bold green user name
  - Circular photo frame at bottom-left near the name
  - All rendered on HTML Canvas for pixel-perfect export

- **Action buttons** (after generation):
  - Download as PNG (canvas.toBlob)
  - Download as PDF (jspdf library wrapping the canvas image)
  - Share on Facebook / WhatsApp (url-based sharing intents)

- **Confetti animation**: Trigger subtle sparkle/confetti effect on "Generate" click using canvas-confetti

### Route Addition
**`src/App.tsx`** — Add route `/eid-card` pointing to the new page. This page renders WITHOUT the main Navigation/Footer for a clean standalone feel (or with them, keeping consistency).

### Dependencies
- `jspdf` — for PDF export
- `canvas-confetti` — for sparkle effect on generate
- Google Fonts: `Noto Sans Bengali` or `Hind Siliguri` for proper Bengali rendering

### Technical Approach
- Use an HTML `<canvas>` element for card rendering (enables high-quality PNG/PDF export)
- Draw all card elements programmatically: background, grid pattern, watermarks, text, photo, border
- Real-time preview updates on every name/photo change via `useEffect`
- Photo placed in circular clip path on canvas
- Green+cream color palette: `#1a7a3a` (green), `#fdf6e3` (cream), `#2d5016` (dark green text)
- Fully responsive: stacked layout on mobile, side-by-side on desktop

### Files Changed
| File | Action |
|------|--------|
| `src/pages/EidCard.tsx` | Create — main page |
| `src/App.tsx` | Edit — add `/eid-card` route |

