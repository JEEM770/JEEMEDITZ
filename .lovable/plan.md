

## Smooth Animations & Glitch Fix Plan

### Problem
The website has jittery animations caused by overly broad CSS transitions applied globally, multiple competing infinite animations, and expensive `filter: blur()` in page transitions. There are also several unused files adding dead weight.

### Changes

**1. Fix global CSS glitches (`src/index.css`)**
- Remove `transition-timing-function` from `*` selector (line 126-127) -- this forces transitions on every DOM element including Framer Motion targets, causing conflicts
- Remove `transition: all 0.3s` from `a, button, input` (line 134-136) -- too broad, causes layout recalculations. Replace with targeted `transition: color 0.3s, background-color 0.3s, border-color 0.3s, box-shadow 0.3s`
- Remove `section { transition: opacity 0.5s, transform 0.5s }` (line 138-140) -- conflicts with Framer Motion `whileInView` animations
- Remove unused keyframes: `cursor-trail-fade`, `magnetic-float`, `pulse-glow`, `slide-reveal`, `text-reveal`, `spring-bounce`, `gradient-flow` and their utility classes
- Add `will-change: transform` to `.orb` for GPU compositing

**2. Smoother page transitions (`src/components/PageTransition.tsx`)**
- Remove `filter: blur()` from initial/exit states -- blur is GPU-expensive and causes frame drops on mobile
- Use simpler opacity + translateY only

**3. Reduce FloatingActionButton animation load (`src/components/FloatingActionButton.tsx`)**
- Remove the bouncing `y` animation (infinite keyframe)
- Keep only the single pulse ring but increase `repeatDelay` to 6s
- Remove the icon wiggle animation

**4. Simplify ScrollToTop (`src/components/ScrollToTop.tsx`)**
- Remove infinite arrow bounce animation -- use static arrow instead

**5. Delete unused files**
- `src/App.css` -- not imported anywhere
- `src/lib/animations.ts` -- not imported by any page/component
- `src/components/ui/motion-wrapper.tsx` -- not imported anywhere
- `src/components/ui/cursor-glow-card.tsx` -- unused
- `src/components/ui/cursor-spotlight.tsx` -- unused
- `src/components/ui/animated-text.tsx` -- unused
- `src/components/ui/magnetic-button.tsx` -- unused

### Technical Details

| File | Action |
|------|--------|
| `src/index.css` | Remove global `*` transition, fix `a/button/input` transition, remove `section` transition, clean unused keyframes |
| `src/components/PageTransition.tsx` | Remove `filter: blur()` from variants |
| `src/components/FloatingActionButton.tsx` | Remove infinite bounce and wiggle animations |
| `src/components/ScrollToTop.tsx` | Remove infinite arrow animation |
| `src/App.css` | Delete |
| `src/lib/animations.ts` | Delete |
| `src/components/ui/motion-wrapper.tsx` | Delete |
| `src/components/ui/cursor-glow-card.tsx` | Delete |
| `src/components/ui/cursor-spotlight.tsx` | Delete |
| `src/components/ui/animated-text.tsx` | Delete |
| `src/components/ui/magnetic-button.tsx` | Delete |

