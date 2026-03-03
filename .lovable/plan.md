

## Plan: Remove Theme Switcher, Keep Only Golden Theme

### What changes

1. **Remove `CursorThemeSwitcher`** component and its import from `App.tsx`
2. **Simplify `CursorFollower.tsx`** -- remove the theme context dependency, hardcode the golden/sunset theme colors directly
3. **Remove `CursorThemeContext.tsx`** and `CursorThemeProvider` wrapper from `App.tsx` since there's no switching anymore
4. **Delete `CursorThemeSwitcher.tsx`** file entirely

### Golden theme colors (from current "sunset" theme)
- Skin: `linear-gradient(135deg, #fef3c7, #fcd34d, #f59e0b)`
- Blush: `rgba(255, 150, 100, 0.5)`
- Mouth: `#d97706`
- Eyes: `#78350f`
- Glow: `rgba(245, 158, 11, 0.4)`

### Files affected
| File | Action |
|------|--------|
| `src/components/CursorThemeSwitcher.tsx` | Delete |
| `src/contexts/CursorThemeContext.tsx` | Delete |
| `src/components/CursorFollower.tsx` | Hardcode golden colors, remove context import |
| `src/App.tsx` | Remove CursorThemeSwitcher, CursorThemeProvider imports and usage |

