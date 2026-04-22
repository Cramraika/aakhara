# Design History — Aakhara

## 2026-04-20 — Port spec to code (tailwind + index.css + fonts)

Per `~/.claude/specs/2026-04-20-per-repo-design-audit.md` + Track 2 port.

**Situation**: Aakhara specs declared saffron amber `#E8821A` primary + Manrope + Noto Sans Devanagari typography. Code had stock CRA — Tailwind installed but no config, no custom tokens, no custom fonts loaded.

**Action**:
- `frontend/tailwind.config.js` — created. Extends theme with `brand.primary/secondary/tertiary`, `neutral.50–950`, `semantic.success/warning/error/info`, `fontFamily.sans = Manrope`, `fontFamily.hindi = Noto Sans Devanagari`.
- `frontend/public/index.html` — added Google Fonts preconnect + link for Manrope + Noto Sans Devanagari (weights 400–700). Changed title from "Hinglish Conversational AI" to "Aakhara — Voice Sales Training" to match brand.
- `frontend/src/index.css` — added `:root` CSS custom properties for every brand token; body uses Manrope; `.font-hindi` / `[lang="hi"]` utility loads Devanagari.

**Not touched**: Components, JSX, layouts, business logic. Only tokens + font loading + base CSS.

**Minimal invasion**: As required by the plan — only `tailwind.config`, `public/index.html`, and top-level CSS vars changed. Existing components will pick up Manrope body + brand colors via the new tokens; no refactor required.
