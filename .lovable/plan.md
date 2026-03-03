

## Mobile Navigation Analysis

After reviewing the code, here are the findings and potential issues:

### Current Structure
The navigation uses a floating pill (`nav-pill`) with a separate mobile dropdown that appears below it via `absolute top-full`. The mobile hamburger menu toggles visibility with `AnimatePresence`.

### Issues Found

**1. Z-index conflict with FloatingActionButton and CursorThemeSwitcher**
- Navigation: `z-50`
- CursorThemeSwitcher: `z-[9990]` (bottom-left)
- FloatingActionButton: `z-50` (bottom-right)
- CursorFollower: `z-[9999]`
- The mobile dropdown shares the nav's `z-50`, which should be fine, but content below could overlap.

**2. Mobile dropdown positioning**
- Uses `absolute top-full left-4 right-4` inside the `<nav>` which has `flex justify-center`. The `top-full` references the nav's height, but since nav is `flex justify-center` without explicit height, this could cause inconsistent dropdown placement.

**3. No backdrop/overlay to close the menu**
- Tapping outside the mobile dropdown doesn't close it. Users might think it's stuck.

**4. WhatsApp FAB pulse rings run infinitely**
- The `FloatingActionButton` has infinite `scale` + `opacity` animations on two pulse rings plus a bounce animation. On mobile this runs constantly, consuming GPU resources.

### Recommended Fixes

| Fix | File | Change |
|-----|------|--------|
| Add click-outside-to-close for mobile menu | `Navigation.tsx` | Add overlay div that closes menu on tap |
| Ensure dropdown z-index is above content | `Navigation.tsx` | Add explicit `z-50` to dropdown |
| Reduce FAB animations on mobile | `FloatingActionButton.tsx` | Simplify or remove pulse rings |

### Implementation Plan

1. **Navigation.tsx**: Add an invisible backdrop overlay when mobile menu is open so tapping outside closes it. Ensure the dropdown has proper z-indexing.

2. **FloatingActionButton.tsx**: Reduce infinite animations (remove one pulse ring, increase `repeatDelay`) to reduce GPU load on mobile.

These are minor fixes. The navigation structure itself is sound -- the pill layout, hamburger toggle, and link routing all look correct.

