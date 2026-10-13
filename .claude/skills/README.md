# Project skills

Third-party design skills installed for the Peach website on 2026-10-13. Each folder is a copy of the
upstream skill at the commit below, unmodified apart from folder names and an added LICENSE file.

| Folder | Upstream | Commit | Licence |
|---|---|---|---|
| design-taste-frontend, redesign-existing-projects, high-end-visual-design | github.com/Leonxlnx/taste-skill | c924fad | MIT |
| impeccable | github.com/pbakaus/impeccable | 2f98774 | Apache-2.0 |
| animate, review-animations, improve-animations, find-animation-opportunities, animation-performance, emil-design-eng, animation-vocabulary | github.com/emilkowalski/skills | 2d22863 | MIT |
| frontend-design | github.com/anthropics/skills | dbd4588 | see LICENSE.txt |
| web-design-guidelines, vercel-react-best-practices | github.com/vercel-labs/agent-skills | 063bee9 | MIT |

Network behaviour, checked before install:
- `impeccable/scripts/impeccable` downloads its engine binary from the project's GitHub releases on first run (checksum-verified).
- `design-taste-frontend/scripts/assets.mjs` searches public image libraries (Openverse, Wikimedia Commons, the Met, Art Institute of Chicago, NASA, Internet Archive) for free-to-use media.
- `web-design-guidelines` fetches its rule list from raw.githubusercontent.com/vercel-labs/web-interface-guidelines on each run.
- The others are instructions only.

To update a skill, re-copy its folder from the upstream repo and update the commit above.
