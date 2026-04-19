# Typography — Aakhara

Bilingual (English + Hindi Devanagari). Display font must read well in both scripts. Body Noto for proven Devanagari rendering.

## Font stack

- **Display (headings + brand moments)**: `Manrope` (Latin) + `Noto Sans Devanagari` (Hindi fallback) — Manrope is warm-geometric without being playful, pairs cleanly with Devanagari.
- **Body (paragraphs + UI)**: `Inter` (Latin) + `Noto Sans Devanagari` (Hindi).
- **Monospace (metrics, scenario IDs, timestamps)**: `JetBrains Mono`.

Font loading: self-host Noto Sans Devanagari to avoid variable-render issues; Manrope + Inter from Google Fonts CDN.

## Scale (px / rem / line-height)

| Role | px | rem | line-height |
|---|---|---|---|
| h1 — hero | 48 | 3.0 | 1.1 |
| h2 — section | 32 | 2.0 | 1.2 |
| h3 — subsection | 24 | 1.5 | 1.25 |
| h4 — card title | 20 | 1.25 | 1.3 |
| h5 — small label | 16 | 1.0 | 1.4 |
| h6 — eyebrow | 13 | 0.8125 | 1.5 (uppercase, tracking +0.08em) |
| body-lg | 18 | 1.125 | 1.6 |
| body | 16 | 1.0 | 1.65 |
| body-sm | 14 | 0.875 | 1.55 |
| caption | 12 | 0.75 | 1.4 |
| readiness-metric | 40 | 2.5 | 1.0 (Manrope 700) |
| scenario-title | 22 | 1.375 | 1.3 |

## Weights available

- Manrope (variable): 400, 500, 600, 700, 800.
- Inter (variable): 400, 500, 600, 700.
- Noto Sans Devanagari: 400, 500, 600, 700.
- JetBrains Mono: 400, 500, 700.

## Usage notes

- Hindi headings tested for Devanagari top-line stability; always line-height >= 1.3.
- Manrope 700 for readiness metrics (big numbers that anchor the dashboard).
- Never use serif/display-script — breaks both languages' modernity.
- Devanagari text at minimum 14px on mobile; breaks rendering below.
- Pair Hindi labels with English fallback where cognitive load matters (manager dashboard, certifications).
