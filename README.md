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
2. **Hero, the blossom** (`BloomHero.tsx`): the peach wordmark behind the pixel-art bloom. Moving the pointer (or dragging on touch) leaves an organic morph trail that turns the violet bloom into the peach one. Rotating "move to ripen" badge, pitch line and two calls to action.
3. **About** (`Manifesto.tsx`): a large statement whose words light up on scroll, with inline image pills, then three proof points.
4. **Process, ripening** (`RipenProcess.tsx`, `RipePeach.tsx`): a pinned stage where an illustrated SVG peach ripens from green to coral while the three steps play through.
5. **Work** (`WorkGallery.tsx`): a pinned horizontal rail of typographic project posters.
6. **Offers** (`Offers.tsx`): the three offers as cards with fruit stickers (real peach PLU codes), Peach Answer, and the questions.
7. **Finale** (`Finale.tsx`): the one red marquee band, the coral contact section and the footer wordmark.

Interaction (`Interaction.tsx`): Lenis inertia scrolling, magnetic buttons and a labelled peach cursor (fine pointers only). Everything respects reduced-motion: pinned sections fall back to static layouts. Fonts are the self-hosted brand fonts in `fonts/` (Inter, Instrument Serif, IBM Plex Mono); tokens are at the top of `src/index.css`.

**Swapping in the real peach:** the hero bloom images (`assets/art/bloom-*.png`) and the illustrated `RipePeach` are stand-ins. Replace them with peach photography or video in the same frames; nothing else needs to change.

**Draft content:** the four projects in `WorkGallery.tsx` are anonymous placeholders. Replace each with a real case study only once the client has given written permission. The proof points in `Manifesto.tsx` are new copy to confirm.

The contact form does not send anything: it prepares an email draft to reach@peachhq.co in the visitor's mail app.

## Pages
- `index.html` — homepage shell; content is rendered by `src/App.tsx`
- `service.html?s=fix|answer|brand|partner` — service detail pages, content in `services-data.js`
- `legal.html` — privacy & terms (placeholder structure; needs legal review)
- `404.html` — not found

## Assets
- `assets/` — supplied Peach logo SVGs (unchanged), `cinematic/` videos, posters and service icons (no longer used anywhere; kept for now), and `art/` bloom artwork.
- `fonts/` — Instrument Serif, Inter, IBM Plex Mono (owner-supplied, self-hosted).

## Before launch
- Replace [PRICE] [TIMELINE] [TERMS] [CAP] [N] [email] [social handle] [year].
- Decide whether the contact form should post to a real endpoint; today it only prepares an email draft.
- Legal text in legal.html must be written/reviewed by a qualified adviser.
- Peach Answer and Peach Partner stay labelled draft until capability/programme is verified.
- Case studies only with written client permission.

## Design source
Brand system and design work live in the Peach Design System project. Brand rules: see DESIGN.md there.
