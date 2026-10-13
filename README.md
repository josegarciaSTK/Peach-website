# Peach website

Vite site: React 19, TypeScript, Tailwind CSS v4 and Motion (framer-motion) for the homepage; static HTML for the service, legal and 404 pages. Draft — not yet launched.

## Development

```sh
npm install
npm run dev
npm run build
npm run preview
```

Deploy the generated `dist/` directory. The build copies the static service, legal and 404 pages and their assets into `dist/`.

## Homepage

Story: **from blossom to ripe**. `src/App.tsx` renders, in order:

1. **Header** (`SiteHeader.tsx`): fixed; switches to a light treatment over light sections; "Book a call" is always visible.
2. **Hero, the blossom** (`SpotlightHero.tsx`): a flowering branch in lavender (`assets/art/branch-lavender.webp`, cut out of its white background so it sits on the dark hero). A soft circular spotlight eases after the cursor and reveals the same branch in peach (`branch-peach.webp`) inside it; touch screens get a slow drift along the branch until they drag. Load sequence: slow zoom-out on the art, blur-rise headline, then the copy and "Book a free call".
3. **About** (`Manifesto.tsx`): a large statement whose words light up on scroll, with inline image pills, then three proof points.
4. **Process, ripening** (`RipenProcess.tsx`, `RipePeach.tsx`): a pinned stage; the three steps stay readable on the left with the current one lit, while an illustrated SVG peach ripens from green to coral on a glow.
5. **Work** (`WorkShowcase.tsx`): after the "3D creator" portfolio pattern. Two rows of tiles slide in opposite directions with scroll, then project cards stick and stack (each scales down slightly as the next arrives). Client cards use typographic placeholder panels; the Peach card uses our own artwork.
6. **What we bring** (`WhatWeBring.tsx`): the offers section restored from commit 646d3d1 (feature card plus Peach Fix, Brand & Content and Peach Partner cards, Peach Answer, questions). Its styles are scoped under `.wwb` at the end of `src/index.css`. The feature card shows `assets/art/peach-astronaut.webp`.
7. **Finale** (`Finale.tsx`): the one red marquee band, the dark contact section and the footer wordmark.

The whole site is dark.

Interaction (`Interaction.tsx`): Lenis inertia scrolling, magnetic buttons and a labelled peach cursor (fine pointers only). Everything respects reduced-motion: pinned sections fall back to static layouts. Fonts are the self-hosted brand fonts in `fonts/` (Inter, Instrument Serif regular and italic, IBM Plex Mono); tokens are at the top of `src/index.css`.

**Swapping in the real peach:** the illustrated `RipePeach` is a stand-in; replace it with peach photography or video in the same frame. The hero branch images must keep identical framing so the spotlight lines up. `assets/art/bloom-*.png` are no longer used by the homepage.

**Draft content:** the three client projects in `WorkShowcase.tsx` are anonymous placeholders. Replace each with a real case study only once the client has given written permission. The proof points in `Manifesto.tsx` are new copy to confirm.

The contact form does not send anything: it prepares an email draft to reach@peachhq.co in the visitor's mail app.

## Pages
- `index.html` — homepage shell; content is rendered by `src/App.tsx`
- `service.html?s=fix|answer|brand|partner` — service detail pages, content in `services-data.js`
- `legal.html` — privacy & terms (placeholder structure; needs legal review)
- `404.html` — not found

## Assets
- `assets/` — supplied Peach logo SVGs (unchanged), `cinematic/` videos, posters and service icons (not used by any page and left out of the build; kept in the repo), and `art/` bloom artwork.
- `fonts/` — Instrument Serif, Inter, IBM Plex Mono (owner-supplied, self-hosted).

## Before launch
- Replace [PRICE] [TIMELINE] [TERMS] [CAP] [N] [email] [social handle] [year].
- Decide whether the contact form should post to a real endpoint; today it only prepares an email draft.
- Legal text in legal.html must be written/reviewed by a qualified adviser.
- Peach Answer and Peach Partner stay labelled draft until capability/programme is verified.
- Case studies only with written client permission.

## Design source
Brand system and design work live in the Peach Design System project. Brand rules: see DESIGN.md there.
