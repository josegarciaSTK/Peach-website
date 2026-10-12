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

`src/App.tsx` renders the homepage in this order:

1. **Bloom hero** (`src/components/BloomHero.tsx`): the "peach" wordmark (`PeachWordmark.tsx`) behind the pixel-art bloom. Moving the pointer (or dragging on touch) leaves an organic morph trail that turns the violet bloom (`assets/art/bloom-violet-1335.png`) into the peach one (`assets/art/bloom-peach-1400.png`). Mask canvases are capped at 720px on the long side to keep the per-frame cost down.
2. **About**, then **Selected work** (`WorkIndex.tsx`): a numbered project list; on desktop a preview image follows the cursor on a spring and leans with its speed, other rows dim, and keyboard focus shows the preview too. Touch screens get inline thumbnails instead.
3. **The process** (`ProcessStack.tsx`): sticky cards that stack and shrink slightly as you scroll.
4. **What we bring**: the cinematic services grid (`CinematicVideo.tsx`) and questions.
5. **Statement band** (`StatementBand.tsx`): the one vivid-red section from the brand brief, with a drifting marquee nudged by scroll.

Fonts and the Tailwind theme are in `src/index.css`. Motion respects reduced-motion preferences. `assets/cinematic/hero.mp4` is no longer used by the homepage; it is kept for now.

**Draft content:** the four projects in `WorkIndex.tsx` are placeholders without client names. Replace each with a real case study only once the client has given written permission.

The contact form does not send anything: it prepares an email draft to reach@peachhq.co in the visitor's mail app.

## Pages
- `index.html` — homepage shell; content is rendered by `src/App.tsx`
- `service.html?s=fix|answer|brand|partner` — service detail pages, content in `services-data.js`
- `legal.html` — privacy & terms (placeholder structure; needs legal review)
- `404.html` — not found

## Assets
- `assets/` — supplied Peach logo SVGs (unchanged), `cinematic/` homepage videos, posters and service icons, and `art/` lily artwork used on the service and 404 pages.
- `fonts/` — Instrument Serif, Inter, IBM Plex Mono (owner-supplied, self-hosted).

## Before launch
- Replace [PRICE] [TIMELINE] [TERMS] [CAP] [N] [email] [social handle] [year].
- Decide whether the contact form should post to a real endpoint; today it only prepares an email draft.
- Legal text in legal.html must be written/reviewed by a qualified adviser.
- Peach Answer and Peach Partner stay labelled draft until capability/programme is verified.
- Case studies only with written client permission.

## Design source
Brand system and design work live in the Peach Design System project. Brand rules: see DESIGN.md there.
