---
name: Peach
description: A small studio for brands, websites and the systems behind them. Make it peachy.
colors:
  night-pit: "#0F0D0C"
  bark: "#1A1715"
  peach-flesh: "#FA7576"
  peach-skin: "#FFD9C7"
  blossom-cream: "#DEDBC8"
  pale-cream: "#EEEBDD"
  signal-red: "#FF2A1F"
  leaf: "#5E7F3E"
  dust: "#8E8A80"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(48px, 6.4vw, 104px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  display-sans:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(48px, 6.4vw, 104px)"
    fontWeight: 450
    lineHeight: 0.95
    letterSpacing: "-0.075em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(36px, 4.6vw, 80px)"
    fontWeight: 450
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(22px, 2.2vw, 34px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  accent-italic:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
    letterSpacing: "-0.01em"
rounded:
  pill: "999px"
  field: "12px"
  card: "clamp(32px, 4vw, 56px)"
  panel: "clamp(28px, 3.6vw, 52px)"
  tile: "16px"
spacing:
  gutter: "clamp(16px, 3.2vw, 48px)"
  section: "clamp(80px, 10vw, 160px)"
  stack-sm: "12px"
  stack-md: "24px"
  stack-lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.peach-flesh}"
    textColor: "{colors.night-pit}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.peach-skin}"
    textColor: "{colors.night-pit}"
  button-small:
    backgroundColor: "{colors.peach-flesh}"
    textColor: "{colors.night-pit}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.blossom-cream}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  nav-pill:
    backgroundColor: "#DEDBC81F"
    textColor: "{colors.blossom-cream}"
    rounded: "{rounded.pill}"
    padding: "6px"
  project-card:
    backgroundColor: "{colors.night-pit}"
    textColor: "{colors.blossom-cream}"
    rounded: "{rounded.card}"
    padding: "clamp(16px, 2vw, 32px)"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.blossom-cream}"
    padding: "10px 0 12px"
---

# Design System: Peach

## Overview

**Creative North Star: "Ripe Timing"**

Everything on a Peach page arrives when it is ready. Fruit is not rushed: it blossoms, sets and ripens, and the site behaves the same way. Headlines rise into place once, the lavender branch turns peach only where the visitor's attention goes, and the process art grows from blossom to green fruit to ripe peach exactly as fast as the reader scrolls. Nothing loops for its own sake and nothing shouts. When something moves, it is because a moment has arrived.

The world is a warm night orchard: a deep brown-black ground, cream text the colour of blossom, and peach coral as the fruit, the one colour that means "act here". The feel is warm and human, premium and crafted, playful in its details (the peach cursor, the ripening fruit, the magnetic buttons), and calm and clear in its reading. Big type, generous space and one strong idea per section keep it calm; the playfulness lives in small reactive details, never in noise.

Interaction is tactile and lively. Buttons lean toward the cursor, project cards stack as you pass them, and the cursor itself turns into a labelled peach disc over anything clickable. The motion is springy but settles quickly, and it is always gentler with reduced motion turned on.

**Key Characteristics:**
- Dark warm ground everywhere; one vivid red band is the only light section.
- Peach coral is reserved for actions, highlights and the fruit itself.
- Large Inter display type with one Instrument Serif word as a counterpoint.
- Fully round pills for actions; large, soft-cornered cards for content.
- Motion that responds to the visitor (cursor, scroll), timed to settle quickly.

## Colors

A warm night palette: brown-blacks and blossom creams, with peach coral as the single voice.

### Primary
- **Peach Flesh** (#FA7576): primary buttons, the cursor disc, section labels, active process steps, the serif accent word in headings, focus rings and selection. If it can be clicked or it is the point of the sentence, it is peach.
- **Peach Skin** (#FFD9C7): the hover state of primary buttons and soft highlights such as big project numbers.

### Secondary
- **Signal Red** (#FF2A1F): the one "Make it peachy" marquee band before the contact section. Nowhere else.
- **Leaf** (#5E7F3E): the peach leaf, unripe stages and the occasional typographic project tile.

### Neutral
- **Night Pit** (#0F0D0C): the page ground for every section.
- **Bark** (#1A1715): raised surfaces such as tiles and panels, one tone step above the ground.
- **Blossom Cream** (#DEDBC8): body text and UI text; used at 60–80% opacity for secondary text and around 12–25% for dividers and outlines.
- **Pale Cream** (#EEEBDD): the large statement text in the About section.
- **Dust** (#8E8A80): muted metadata.

### Named Rules
**The Ripe Fruit Rule.** Peach coral marks what is ripe to act on: buttons, the current step, the label of a section. Do not spend it on decoration.

**The One Red Band Rule.** Signal red appears once per page, as the closing marquee band.

## Typography

**Display Font:** Instrument Serif (with Georgia), regular and italic
**Body Font:** Inter (with the system sans stack), variable weight
**Mono Font:** IBM Plex Mono is self-hosted but retired from the homepage; labels now use Inter.

**Character:** a tight, slightly heavy Inter carries the message with negative tracking; a single Instrument Serif word gives each heading its warmth, like a handwritten note on a crate label.

### Hierarchy
- **Display** (Instrument Serif 400 or Inter 450, clamp(48px, 6.4vw, 104px), line-height 0.95): the hero lines; one serif line over one Inter line.
- **Statement** (Inter 450, clamp(34px, 5.4vw, 92px), line-height 1.02): the About statement that lights up word by word.
- **Headline** (Inter 450, clamp(36px, 4.6vw, 80px), line-height 0.95): section headings, with the serif accent word in peach.
- **Title** (Inter 500, clamp(22px, 2.2vw, 34px), line-height 1.1): process steps, card and project names.
- **Body** (Inter 400, 15–20px, line-height 1.5): paragraphs, kept to about 44ch beside imagery and 56ch in long answers.
- **Label** (Inter 500, 14px, sentence case): section names, categories, form labels and small notes.

### Named Rules
**The One Serif Word Rule.** A heading gets at most one Instrument Serif phrase, usually its last words ("works.", "peachy.", "No runaround."). Never set a whole paragraph in the serif.

**The Readable Label Rule.** Labels are sentence case at 14px or more. No tiny tracked capitals and no index numbers like "(01)" in front of section names.

## Layout

Full-bleed dark sections stacked vertically, each with one composition rather than a repeated card grid. Content sits inside a fluid side gutter (clamp(16px, 3.2vw, 48px)); sections breathe with clamp(80px, 10vw, 160px) of vertical space. Text is left-anchored, with one centred moment (the "Work that works." heading).

Signature layouts:
- **Spotlight hero:** a full-viewport image; the headline sits in the art's empty top-left space and the call to action in the empty bottom-right.
- **Pinned stages:** the process section pins for three viewport heights while the content changes in place.
- **Sliding rows:** two rows of 420 × 270 tiles move in opposite directions with scroll.
- **Stacking cards:** project cards stick near the top and stack, each scaling down by 3% as the next arrives.

Breakpoints: 1024px (navigation collapses, multi-column layouts stack) and 640px (phone: single column, sticky stacking switches off, hero copy centres). Nothing may scroll sideways at any width.

## Elevation & Depth

Flat and tonal. Depth comes from tone steps (Night Pit to Bark), soft radial glows of peach behind key art, and stacking order, not from drop shadows. The only shadows are small ones on stickers and the primary button's hover glow.

### Named Rules
**The Glow Not Shadow Rule.** To lift something, put a low-opacity peach glow behind it or step its tone up. Do not add grey drop shadows under cards.

## Shapes

Two families of form. Actions are fully round pills (999px): buttons, the navigation pill, status chips. Content is held in large soft-cornered shapes that scale with the viewport: project cards (clamp(32px, 4vw, 56px)) and their image panels (clamp(28px, 3.6vw, 52px)), with smaller 16px corners on scrolling tiles. Outlines, when used, are 2px blossom cream at low opacity. The peach silhouette itself (logo and illustrated fruit) is the recurring organic shape.

## Components

### Buttons
Tactile and lively: they lean toward the cursor (a magnetic pull of about a third of the distance) and spring back.
- **Shape:** fully round (999px).
- **Primary:** peach flesh with night-pit text, 52px tall, 24px side padding, Inter 500 at 15px, an arrow icon that turns 45° on hover.
- **Hover / Focus:** background eases to peach skin over 0.3s with the house curve; focus shows a 2px peach outline offset by 4px; press scales to 0.97.
- **Small:** 40px tall, used in the header.
- **Outline:** 2px blossom-cream outline, uppercase tracking reserved for the project card button; muted when it is a status rather than a link.

### Cards / Containers
- **Project card:** night-pit fill, 2px blossom-cream outline at 25%, large viewport-scaled corners, a big project number, title block and one pill button, above a two-column image grid (40% / 60%).
- **Offer card (What we bring):** a Bark card (8px corners) with a small square icon, number, category, title, check list and an "Explore" link along a divider.
- **Tiles:** 16px corners, filled with brand colours or artwork, never empty boxes.

### Inputs / Fields
- **Style:** no box; a 1.5px underline in blossom cream at 30% with the label above in 14px Inter.
- **Focus:** the underline turns peach. Placeholder text sits at about 55% cream.

### Navigation
- **Desktop:** the Peach mark and serif wordmark on the left, a centred glass pill of four links, and a small primary "Book a call" button on the right. The bar turns solid with a blur after the first 40px of scroll.
- **Mobile:** links collapse into a 44px "Menu" pill that opens a full-width list of large links.

### Peach Cursor
On mouse devices, a small peach dot follows the pointer on a spring. Over anything with a label it grows into a 72px peach disc with a one-word label ("Hello", "Open", "Send"), offset to the lower right so it never hides what it points at.

### Spotlight Reveal
A soft circular spotlight (260px radius on mouse, 170px on touch) eases after the pointer at a 0.1 lerp and reveals the peach version of the hero art inside it. On touch screens it drifts along the branch on its own.

## Do's and Don'ts

### Do:
- **Do** keep every section on the Night Pit ground; use Bark for raised surfaces.
- **Do** use the house curve, cubic-bezier(0.16, 1, 0.3, 1), for entrances and state changes; keep hover and press transitions at 0.2–0.3s.
- **Do** let motion respond to the visitor (cursor, scroll position) rather than play on its own.
- **Do** give every movement a reduced-motion version that keeps the state change and drops the travel.
- **Do** gate hover effects behind fine pointers.
- **Do** keep tap targets at 44px or more.

### Don't:
- **Don't** use gradient-filled text.
- **Don't** use tiny uppercase tracked labels, monospace captions or "(01)" style section numbering.
- **Don't** put grey drop shadows under cards.
- **Don't** use signal red anywhere except the closing band.
- **Don't** animate layout properties (width, height, top, left); animate transform and opacity.
- **Don't** add looping decorative motion that means nothing.
