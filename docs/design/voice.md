---
# Machine-readable brand-voice instance — schema per platform-docs
# 02-governance/brand-voice.md §V.2 (L1.3). Derived (not copied) from the prose below.
# tone_axes + voice_attributes are DRAFT seeds (spec L1.4) — operator/brand-owner RATIFY pending (§V.7).
brand_voice:
  brand: aakhara                      # canonical brand id (parked product; pre-launch)
  entity_umbrella: "{{legal-entity}}" # thin billing/legal umbrella — NEVER a hardcoded registered string
  derives_from: "~/.claude/conventions/Vagary-Brand-Guidelines.pdf §13"  # reference, not mandate
  independence: family                # shares Vagary Labs family DNA (spec L1.4)
  last_reviewed: 2026-06-26
  owner: chinmay
  status: draft-unratified            # axis values + attributes are illustrative seeds (spec L1.4), not ratified

  # tone dimensions: 1..5 position on each named axis (DRAFT seeds — operator-ratify)
  tone_axes:
    formality:        3   # measured; formal English to managers, Hinglish-warm to reps
    warmth:           4   # encouraging, coaching framing
    authority:        4   # training authority; cites the metric
    playfulness:      2   # professional training, not a game (no XP/badges)
    energy:           3   # measured; "saffron is already warm — voice stays measured"
    directness:       4   # coaching imperatives ("practice", "try again", "next round")
    technicality:     2   # plain coaching language; AI is substrate not pitch

  voice_attributes: [coaching, encouraging, Sanskrit/Hindi-native]   # spec L1.4 seed

  audience: "BDEs / sales trainees (rep-facing) + L&D managers (manager-facing)"
  reading_level: grade-9
  primary_locale: en-IN
  locales: [en-IN, hi-IN]

  lexicon:
    prefer:   [practice, work on, try again, next round, progress, "Shabaash"]
    avoid:    [failed, wrong, "XP", coins, badges]
    banned:   []
    capitalization:
      product_name: "Aakhara"
      never_lowercase: true

  do:
    - "Use coaching verbs: practice, work on, try again, next round."
    - "Cite the metric when giving feedback (your objection-handling improved 15%)."
    - "Switch to Hindi/Hinglish for rep-facing emotional moments; keep manager-facing copy formal English."
    - "Frame setbacks as training, not failure (that scenario needs another round)."
  dont:
    - "Don't use 'failed' / 'wrong' in rep feedback — use 'incomplete', 'needs work', 'try again'."
    - "Don't gamify with XP / coins / badges — this is professional training, not a game."
    - "Don't use heavy Sanskrit-only Hindi — the audience is Hinglish-comfortable."
    - "Don't over-celebrate — voice stays measured."

  surfaces: [landing, in-app-copy, voice-feedback, manager-dashboard]
---

# Voice — Aakhara

## Tone adjectives
- **Disciplined** — training context. Precise, respectful of the rep's time.
- **Encouraging** — coaching framing, never punitive. "Progress" language.
- **Bilingual-comfortable** — fluent code-switching between English and Hindi/Hinglish depending on context.
- **Professional** — speaking to adult learners with real jobs, not students.

## Do's

- **Do** use coaching verbs: "practice", "work on", "try again", "next round".
- **Do** cite the metric when giving feedback ("your objection-handling improved 15%").
- **Do** switch to Hindi/Hinglish for rep-facing emotional moments ("Shabaash! Aap ready ho gaye.").
- **Do** keep manager-facing copy in formal English — that's how L&D leaders want to read.
- **Do** frame setbacks as training, not failure ("that scenario needs another round").

## Don'ts

- **Don't** use "failed" / "wrong" in rep feedback — use "incomplete", "needs work", "try again".
- **Don't** gamify with XP / coins / badges — this is *professional* training, not a game.
- **Don't** use heavy Sanskrit-only Hindi — the audience is Hinglish-comfortable, not Hindi-scholar.
- **Don't** use "AI" in user-facing copy as a brag — it's the substrate, not the pitch.
- **Don't** over-celebrate — saffron is already warm; voice should be measured.

## Sample copy

- **Hero tagline**: *"The training ground for sales teams. Practice, coached, measurable."*
- **Hindi hero (alt)**: *"Aakhara — aapki sales team ka training ground."*
- **CTA (primary)**: *"Start practicing →"* / *"Abhi shuru karein"*
- **Post-session feedback (Hindi)**: *"Achha session! Objection handling aur mazboot ho gayi. Ek baar aur try karein — phir aap discovery calls ke liye ready ho."*
- **Manager dashboard empty state**: *"No reps have started practicing yet. Invite your team to begin."*
- **Error (voice connection fails)**: *"Voice connection dropped. Refresh and try once more — your last session is saved."*
- **Readiness celebration**: *"Shabaash! Aap ab live calls ke liye ready hain. Manager ko notify kiya gaya hai."*
