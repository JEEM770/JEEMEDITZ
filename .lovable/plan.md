

## Remove Eid Card Generator

Delete the Eid Card feature entirely — page, designs utility, navigation link, and route.

### Changes

| File | Action |
|------|--------|
| `src/pages/EidCard.tsx` | Delete |
| `src/lib/eid-card-designs.ts` | Delete |
| `src/App.tsx` | Remove EidCard import and `/eid-card` route |
| `src/components/Navigation.tsx` | Remove `🌙 Eid Card` from `navItems` array |

