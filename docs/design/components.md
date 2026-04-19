# Components — Aakhara

Default Vagary-tech stack: React + Vite + Tailwind v4 + Radix + shadcn/ui + Framer Motion + Lucide. `frontend/` directory already partially wired.

## Component library

- **Primitives**: `@radix-ui/react-*` + shadcn/ui generator at `frontend/src/components/ui/`.
- **Icons**: `lucide-react` default. Custom training-glyph set (microphone, scenario, practice-arc) in `assets/icons/`.
- **Animation**: `framer-motion` for UI; Canvas/SVG for readiness arcs + practice visualizations.

## Custom components (Aakhara-specific)

- **`<ReadinessArc />`** — large SVG arc showing rep readiness score 0–100. Saffron fill, thick 8px stroke, animated counter center. The dashboard hero widget.
- **`<ScenarioCard />`** — practice-scenario tile: scenario name (bilingual), difficulty chip, last-attempted timestamp, "practice now" CTA.
- **`<PracticeSessionPlayer />`** — full-screen voice-practice session UI: mic waveform (shared pattern with Vagary Voice), live-transcript, session timer, "end & get feedback" CTA.
- **`<CoachingNoteCard />`** — post-session feedback card with strengths/improvements lists, bilingual, expandable.
- **`<ObjectionLibrary />`** — searchable grid of sales objections with suggested responses + difficulty tags.
- **`<ManagerRosterTable />`** — table showing all reps + readiness score + last practice + status chip. Manager dashboard hero.
- **`<PracticeStreakChip />`** — small chip showing consecutive-day practice streak ("5 din ki aakhara" — 5-day training ground).
- **`<BilingualToggle />`** — language switcher (EN ⇄ HI) in UI chrome; remembered per user.

## Voice layer integration

Aakhara's voice-practice layer re-uses Vagary Voice infrastructure:
- `<Waveform />` component pattern imported/adapted from Vagary Voice.
- `<TranscriptStream />` pattern shared.
- Session handling uses the same orchestration primitives.

Brand styling differs (saffron not teal; warmer framing copy), but architectural primitives stay consistent.

## Animation approach

- **Baseline timing**: 180ms micro, 350ms reveal, 600ms scene transitions.
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` for reveal.
- **ReadinessArc animation**: 1.2s ease-out-expo counter + arc-fill on first load; micro-pulse when score improves.
- **Reduced motion**: disable all counter animations; show static final values; ReadinessArc fills instantly.

## Accessibility posture

- Contrast: all text passes WCAG AA on both light/dark grounds.
- Bilingual labels on every major UI element; language preference respected.
- Practice session transcripts always text-available alongside audio.
- Manager dashboard table navigable via arrow keys; all metrics announced via `aria-live`.

## Stack notes

- Uses Vagary-family stack (Vite + Tailwind v4 + Radix + shadcn) for consistency + component reuse with Vagary Voice.
- Deviation from pure Vagary brand: warm saffron primary + bilingual-first typography.
