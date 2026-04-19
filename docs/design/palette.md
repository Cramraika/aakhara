# Palette — Aakhara

**Independent-adjacent** — shares the Vagary cool neutral ramp for cross-brand consistency but owns a warm saffron-amber primary that anchors the Indian aesthetic. Secondary uses deep-navy for readability + authority signals.

## CSS custom-properties (authoritative)

```css
:root {
  /* PRIMARY — saffron amber (Aakhara identity, encouragement, primary CTAs) */
  --brand-primary:        #E8821A;     /* saffron amber */
  --brand-primary-hover:  #F49934;
  --brand-primary-active: #C66B0C;

  /* SECONDARY — deep navy (authority, readiness metrics, structural lines) */
  --brand-secondary:        #1E3A8A;
  --brand-secondary-hover:  #2E4FA5;
  --brand-secondary-active: #142961;

  /* TERTIARY — muted teal (practice-in-progress accent) */
  --brand-tertiary:       #11998E;

  /* Neutral ramp — shared Vagary family (cool neutrals; warm primary anchors identity) */
  --neutral-50:  #F5F7FB;
  --neutral-100: #E6EAF2;
  --neutral-200: #C4CAD8;
  --neutral-300: #939BAF;
  --neutral-400: #646C83;
  --neutral-500: #424A60;
  --neutral-600: #2C3347;
  --neutral-700: #1C2134;
  --neutral-800: #121626;
  --neutral-900: #0A0D1A;
  --neutral-950: #05070F;

  /* Semantic */
  --semantic-success: #3CCB7F;    /* ready for live calls */
  --semantic-warning: #FFB547;    /* needs more practice */
  --semantic-error:   #FF5E6F;
  --semantic-info:    #5EBAFF;

  /* Training surfaces */
  --readiness-arc-bg:   var(--neutral-200);
  --readiness-arc-fill: var(--brand-primary);
  --practice-good:      var(--semantic-success);
  --practice-mid:       var(--semantic-warning);
  --practice-low:       var(--semantic-error);
  --scenario-accent:    var(--brand-tertiary);
}
```

## Tailwind-compatible names

```ts
colors: {
  brand: {
    primary:   { DEFAULT: '#E8821A', hover: '#F49934', active: '#C66B0C' },
    secondary: { DEFAULT: '#1E3A8A', hover: '#2E4FA5', active: '#142961' },
    tertiary:  '#11998E',
  },
  neutral: {
    50: '#F5F7FB', 100: '#E6EAF2', 200: '#C4CAD8', 300: '#939BAF',
    400: '#646C83', 500: '#424A60', 600: '#2C3347', 700: '#1C2134',
    800: '#121626', 900: '#0A0D1A', 950: '#05070F',
  },
  semantic: {
    success: '#3CCB7F', warning: '#FFB547', error: '#FF5E6F', info: '#5EBAFF',
  },
}
```

## Usage notes
- Default ground: `--neutral-50` (light-mode-dominant; dashboards read better on light).
- Saffron primary for **CTA buttons, readiness arc fills, "aap taiyar hain" celebration moments**.
- Deep navy for **authoritative metrics, headers on manager dashboard, structural lines**.
- Teal tertiary sparingly — practice-in-progress chips.
- Never pair saffron + teal directly at full saturation — mediate with neutral.
