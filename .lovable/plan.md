

## Add Motion Graphics Section (1:1 Aspect Ratio)

Add a new section between the Reels section and the Category Filter for showcasing motion graphics work in a 1:1 (square) aspect ratio grid.

### Changes to `src/pages/Portfolio.tsx`

**Insert a new "Motion Graphics" section** after the Reels section (after line 201, before the Category Filter at line 203):

- Section title: "Motion Graphics" with the same styling pattern as other sections
- A grid of square (1:1) video/image cards using `aspect-square` (Tailwind's 1:1 ratio class)
- Grid layout: 2 columns on mobile, 3 on medium, 4 on large screens
- Each card shows a thumbnail, play overlay on hover, and title
- Clicking opens the video in a new tab (YouTube link)
- Cards use the same `card-glass` styling and hover effects as existing project cards
- Add motion graphics data array with thumbnails sourced from YouTube video IDs already in the project

### Data
Reuse existing motion graphics content plus add placeholder items. Each item has: `title`, `thumbnail`, `videoUrl`, and `views`.

### Layout
```text
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ 1:1  │ │ 1:1  │ │ 1:1  │ │ 1:1  │
│      │ │      │ │      │ │      │
└──────┘ └──────┘ └──────┘ └──────┘
```

This is a straightforward addition -- no existing sections are modified.

