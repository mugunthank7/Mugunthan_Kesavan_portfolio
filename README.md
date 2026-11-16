# Mugunthan "Mugu" Kesavan — Portfolio

AI/ML engineer building production LLM systems, RAG, and digital twins. M.S. Engineering Data Science & AI at the University of Houston.

**Live:** https://mugunthank7.github.io/Mugunthan_Kesavan_portfolio/

## What's on the site

- **Experience** at TMAC (DeltaZero order validation, client RAG assistant), HPE (ReVolve digital twin), and FLAME University, each with a sidebar of LinkedIn posts
- **Projects**, publications, education, skills, and a timeline of talks and events
- **Moments**: a pinboard of photos you can drag around and click to enlarge
- **Skate Run**: a small skateboard game with ollies, flip tricks, grinds, ramps, and combos
- **Resume**: AI/ML Engineer and Data Scientist versions in `resume/`; the download button serves the AI/ML one

## Stack

Plain HTML, CSS, and JavaScript. No framework, no build step. Hosted on GitHub Pages.

```
index.html            all page content
css/style.css         theme (playful pastel, ink borders, hard shadows)
js/main.js            nav, scroll reveals, LinkedIn sidebar
js/fx.js              interactions: tilt, drag, lightbox, counters, cursor
js/game.js            Skate Run (canvas, time-based physics)
data/linkedin.json    LinkedIn posts shown next to each experience
assets/               logos, headshot, photos (assets/moments/)
resume/               resume PDFs
```

## Run locally

The LinkedIn sidebar loads `data/linkedin.json` with `fetch`, so serve the folder instead of opening the file directly:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Updating

- **LinkedIn posts:** add an entry under the right experience key (`tmac`, `hpe`) in `data/linkedin.json`. Fields: `id`, `url`, `date`, `headline`, `summary`, `reactions`, `comments`, `highlight`.
- **Photos:** drop optimized JPGs (max ~1300px) into `assets/moments/` and reference them in `index.html`.
- **Cache:** bump the `?v=` number on the CSS/JS links in `index.html` after style or script changes so browsers pick up the new files.

## Analytics

Privacy-friendly, cookie-free stats via [GoatCounter](https://www.goatcounter.com/): page views, referrers, resume downloads, link clicks, and game plays. Add `?ref=resume`, `?ref=linkedin`, etc. to shared links to see where visits come from.

## Contact

[LinkedIn](https://linkedin.com/in/mugunthankesavan) · [GitHub](https://github.com/mugunthank7)
