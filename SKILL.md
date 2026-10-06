# Portfolio Design Skill

## Owner
Mugunthan "Mugu" Kesavan — AI/ML Engineer, MS Engineering Data Science & AI @ University of Houston

## Design System (sky + blush pastel, light theme)

### Colors (CSS variables in css/style.css)
- Background: #F5FAFF (page), #FFFFFF (cards), #EAF3FD (alternating sections)
- Text: #2A3347 (primary), #566480 (secondary), #6F7C95 (tertiary)
- Accent: #C4467A (links, highlights); hover #9E2F5E
- Pastels: blush #FADCE6, sky #CFE6FB, mint #D4F1E4, butter #FFF1C9
- Border: #D8E6F6

### Typography
- Display: Bricolage Grotesque 600/800 (Google Fonts)
- Body: Source Serif 4 (Google Fonts)
- Mono: JetBrains Mono (Google Fonts)
- Handwritten accent (nickname "Mugu", "On LinkedIn" label): Caveat 600/700

### Rules
- Vanilla HTML/CSS/JS only: no frameworks, no build tools
- Rounded cards (18px), soft blue-tinted shadows, pill tags
- Subtle gradients allowed only as soft pastel background glows
- Animations subtle, scroll-triggered via IntersectionObserver
- Mobile-first responsive design

## Content
- Nickname: Mugu (hero tag line, About, footer, page title)
- Experience entries can have a LinkedIn sidebar, driven by data/linkedin.json
  (`<aside class="exp-sidebar" data-exp="KEY">` filled by js/main.js)

## Git
- Commits are authored by the repo owner only. No AI co-author or session trailers.
