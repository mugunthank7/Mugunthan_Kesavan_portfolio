# Portfolio Design Skill

## Owner
Mugunthan Kesavan — AI/ML Engineer, MS Data Science & AI @ University of Houston

## Design System

### Colors
- Background: #000000 (primary), #0A0A0A (cards), #141414 (alternating sections)
- Text: #FFFFFF (primary), #999999 (secondary), #555555 (tertiary)
- Accent: #0066FF (links and hover states ONLY)
- Border: #222222

### Typography
- Display: Clash Display 700/800 (Fontshare) or Syne 700/800 (Google Fonts)
- Body: Source Serif 4 400/600 (Google Fonts)
- Mono: JetBrains Mono 400/500 (Google Fonts)

### Rules
- NO gradients, NO rounded corners, NO purple, NO Inter/Roboto/Arial
- NO component libraries (Bootstrap, Tailwind, Material UI)
- NO React, NO build tools — vanilla HTML/CSS/JS only
- Accent blue ONLY on links and hover states
- Sharp edges everywhere
- Film grain overlay at opacity 0.03
- Animations: subtle, purposeful, scroll-triggered via IntersectionObserver
- Mobile-first responsive design

### Layout
- Max content width: 1200px, centered
- Section padding: 120px vertical (desktop), 80px (mobile)
- Asymmetric grids with generous whitespace
- Horizontal 1px dividers between sections

### Animations
- Entrance: fade-up with 30px translateY, 0.6s ease-out
- Stagger: 0.1s delay between sibling elements
- Nav: transparent → solid on scroll
- Cards: border-color transition + scale(1.02) on hover
