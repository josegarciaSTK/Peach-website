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

`src/App.tsx` renders the cinematic homepage: video hero, about and process, services grid, questions, and the contact footer. Components live in `src/components/` (`AnimatedText.tsx`, `CinematicVideo.tsx`); fonts and the Tailwind theme are in `src/index.css`. Videos and their posters are in `assets/cinematic/` (compressed to about 2 MB in total). Motion respects reduced-motion preferences, and each video has a pause control.

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
