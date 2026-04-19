# Design surface — Aakhara

Design surface for **Aakhara**. Tier A per `~/.claude/conventions/design-system.md §2`. Source of truth for palette, typography, components, voice. Any palette or typography value that appears in code (`frontend/` Tailwind config, CSS custom-properties, shadcn theme) MUST match this doc — mismatches are a drift-trigger per §40 `doc-vs-code drift`.

Aakhara is **independent-adjacent** — shares neutral-cool underpinnings with Vagary-family brands but carries its own Sanskrit/Hindi-aesthetic primary palette (distinct from pure Vagary teal/indigo). Paired with CodingNinjas pilot.

## File map

- `brand.md` — Name, story, mission, visual voice, audience.
- `palette.md` — Color tokens (warm-tinted, Sanskrit-inspired accents).
- `typography.md` — Display / body / mono fonts (Devanagari-first).
- `components.md` — Component library (Radix + shadcn + voice-practice widgets).
- `voice.md` — Tone (reverent + modern + encouraging).
- `references/stitch.md` — Stitch project ID pointer.
- `references/figma.md` — Figma file pointer.
- `assets/` — Aakhara wordmark, syllable-chart illustrations, backgrounds.

## Maintenance rules

- Palette/typography changes authored here FIRST.
- Devanagari rendering is load-bearing — every typography change tested on real Hindi strings.
- Archive replaced assets to `_archive-YYYY-MM-DD/` before deletion (per §38).
