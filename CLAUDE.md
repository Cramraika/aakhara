# aakhara — CLAUDE.md v2

**Date:** 2026-04-28 (S11B authoring)
**Supersedes:** v1 (commit-sha pending S11C verification)
**Tier:** C (text-based) → pre-launch A pending Phase 1 voice integration. **Bare-fork stack-up cluster** per dispatch §1.m.

## Claude Preamble
<!-- VERSION: 2026-05-14-v46 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

**Universal laws** (§4), **MCP routing** (§6), **Drift protocol** (§11), **Dynamic maintenance** (§14), **Capability resolution** (§15), **Subagent SKILL POLICY** (§16), **Session continuity** (§17), **Decision queue** (§17.a), **Attestation** (§18), **Cite format** (§19), **Three-way disagreement** (§20), **Pre-conditions** (§21), **Provenance markers** (§22), **Redaction rules** (§23), **Token budget** (§24), **Tool-failure fallback** (§25), **Prompt-injection rule** (§26), **Append-only discipline** (§27), **BLOCKED_BY markers** (§28), **Stop-loss ladder** (§29), **Business-invariant checks** (§30), **Plugin rent rubric** (§31), **Context ceilings** (§32), **Doc reference graph** (§33), **Anti-hallucination** (§34), **Past+Present+Future body** (§35), **Project trackers** (§36), **Doc ownership** (§37), **Archive-on-delete** (§38), **Sponsor + white-label** (§39 — moved to `playbooks/commercial-bound.md`), **Doc-vs-code drift** (§40), **Brand architecture** (§41), **Design system integration** (§42 — moved to `playbooks/tier-a-design.md`), **Session cognition** (§43), **Plugin dispatch** (§44), **Cross-repo clusters** (§45), **Tool-cascade workflow** (§46), **Multi-role agent matrix** (§47), **Parsimony / smallest-tool-first** (§48), **Audit triage discipline** (§49), **Source-of-truth matrix** (§50 — universal rows only; cluster-specific rows moved to playbooks), **Composite cascade catalog** (§51 — §51.2/51.4/51.6 moved to playbooks), **Session launch context + unattended-mode contract** (§52), **Recurrence detection + root-cause escalation** (§53). Sub-sections new in v44: **§4.5 cascade-commit exception**, **§17.b stale-P0 escalation**, **§32.5 canonical-doc size ceiling**, **§38.5 HANDOFF lifecycle enforcement**.

**Cluster playbooks** (per-repo `@-import` based on cluster membership): `~/.claude/conventions/playbooks/vps-infra.md` (DNS XOR for VPS-infra repos), `~/.claude/conventions/playbooks/deployed-service.md` (Sentry/Glitchtip XOR + production-incident triage + time-window correlation for repos with prod telemetry), `~/.claude/conventions/playbooks/tier-a-design.md` (Figma/Stitch + design system for Tier A/B), `~/.claude/conventions/playbooks/multi-lang.md` (cross-language refactor cascade for multi-language repos), `~/.claude/conventions/playbooks/commercial-bound.md` (sponsor-readiness + license-aware code-graph routing), `~/.claude/conventions/playbooks/brand-registry.md` (Vagary brand architecture for Vagary-family repos), `~/.claude/conventions/playbooks/bellring-cluster.md` (Bellring server↔extension; v1-stub), `~/.claude/conventions/playbooks/pulseboard-cluster.md` (Pulseboard Android↔Windows; v1-stub), `~/.claude/conventions/playbooks/vagary-cluster.md` (Vagary product cross-repo; v1-stub). **`tech-debt-audit.md`** is Read-on-demand (NOT @-imported) per ENTRY #169 §49 audit-triage discipline — invoked when user requests audit / tech-debt / dead-code work.

**Sources**: `~/.claude/conventions/universal-claudemd.md` (laws, MCP routing, lifecycle, rent rubric, doc-graph, anti-hallucination, brand architecture) + `~/.claude/conventions/project-hygiene.md` (doc placement, cleanup, archive-on-delete, ownership matrix) + cluster playbooks under `~/.claude/conventions/playbooks/` (loaded per-repo via `@-import` in `## Active Cluster Playbooks` section; see list above). Read relevant sections before significant work. Sync: `~/.claude/scripts/sync-preambles.py` (manual cadence; run after any source edit).

## Active Cluster Playbooks (per v40 cluster-split — content auto-inlined)
<!-- BEGIN PLAYBOOKS BLOCK (managed by sync-preambles.py — content inlined; source at ~/.claude/conventions/playbooks/) -->

Source @-imports (declarative pointer; content inlined below since Claude Code does not recursively expand `@-imports` in per-repo CLAUDE.md):
- `@~/.claude/conventions/playbooks/deployed-service.md`
- `@~/.claude/conventions/playbooks/tier-a-design.md`
- `@~/.claude/conventions/playbooks/multi-lang.md`
- `@~/.claude/conventions/playbooks/commercial-bound.md`
- `@~/.claude/conventions/playbooks/brand-registry.md`
- `@~/.claude/conventions/playbooks/vagary-cluster.md`

### Playbook: deployed-service.md (verbatim from `~/.claude/conventions/playbooks/deployed-service.md`)

# Deployed-Service Playbook

**VERSION: 2026-05-06-v1**
Loaded only in repos that have a production deployment with telemetry (Sentry, Glitchtip, Grafana, Loki, Coolify, Hostinger, Uptime Kuma). Per-repo `CLAUDE.md` `@-imports` this file when applicable.

Source: extracted verbatim from `~/.claude/conventions/universal-claudemd.md` v39 §50.1 (error-store + secrets rows) + §51.2 (production-incident triage) + §51.6 (time-window correlation) during v40 cluster-split refactor. No content changes — only relocation so dev-only / docs-only / CLI-only repos don't carry incident-response rules.

**Applies to repos**: `vagary-platform`, `vagary-voice`, `Automated-sales-manager-main` (ASM), `host_page`, `bellring-server`, `aakhara`, `anjaan-app`, `vps_host` (substrate operator), `portfolio` (has Sentry wired).

---

## 1. Error-store + secrets authority (originally part of §50.1 authority table)

| Domain | Source of truth | Secondary (read/derivative only) | Anti-pattern |
|---|---|---|---|
| **Error store** | **Per-project**: documented in repo CLAUDE.md (Sentry SaaS for SaaS apps; Glitchtip for self-hosted vagary-platform/voice staging) | — | Dual-reporting (same project to both stores) |
| **Secrets** | **Infisical** (only) | — | `.env` in git, hardcoded constants, `process.env.X` direct fallback to plain-text in repo |

**Rule**: NEVER dual-report errors (same project to both Sentry + Glitchtip). Pick per-project per repo's CLAUDE.md and stick to it. NEVER store secrets outside Infisical (no `.env` in git, no hardcoded constants, no fallback to plain-text in repo).

## 2. Production-incident triage cascade (originally §51.2)

**Trigger**: user mentions "outage", "incident", "down", "5xx spike", or §47 Admin/Operator role + observability data.
**Sequence**:
1. `uptime-kuma` MCP — confirm external (synthetic monitor) state
2. `sentry` MCP (or `glitchtip`) — latest issues in time window
3. `grafana` MCP — `query_prometheus` + `query_loki` + Sift investigation in incident window
4. `loki` MCP — direct logs by container/app label if Grafana view too coarse
5. `coolify` MCP — `diagnose_app` / `diagnose_server` on affected container
6. (If host-level) `hostinger` MCP — VPS metrics
7. Fix per §49 severity → `coolify redeploy_project` → Sentry release-comparison
8. Slack post-mortem in incident channel

§50 source-of-truth applies: error store per-project (don't dual-query Sentry+Glitchtip for same app).

## 3. Time-window correlation cascade (originally §51.6)

**Trigger**: incident timestamp known; need cross-system context.
**Sequence** (parallel fan-out):
1. `sentry`/`glitchtip` events in window → stack traces + release tags
2. `grafana` panels in window → metric anomalies
3. `loki` logs in window → filtered by service label
4. `coolify` deployments in window → release-correlation
5. `vercel` deployments in window (FE) — preview + prod URLs

Synthesize: "what changed at <timestamp>" — production deploys, infra changes, traffic spikes.

### Playbook: tier-a-design.md (verbatim from `~/.claude/conventions/playbooks/tier-a-design.md`)

# Tier-A Design Playbook

**VERSION: 2026-05-06-v1**
Loaded only in Tier A / Tier B design-surface repos per `~/.claude/conventions/design-system.md`. Per-repo `CLAUDE.md` `@-imports` this file when applicable.

Source: extracted verbatim from `~/.claude/conventions/universal-claudemd.md` v39 §42 during v40 cluster-split refactor. No content changes — only relocation so design-irrelevant Tier C repos (CLI, infra, scripts, docs) don't carry these rules and Claude doesn't hallucinate design work in non-design contexts.

**Applies to repos**: `portfolio`, `host_page`, `vagary-voice`, `anjaan-app`, `bellring-extension`, `aakhara`, `pulseboard` (Android), `vagarylife-com`, `vagary-platform` (per-vertical), `bellring-server` (Tier B inheritor), `Expense tracker` (Tier B), `Automated-sales-manager-main` (Tier B).

---

## 1. Design system integration (originally §42)

Per-repo visual identity + design tooling wiring. Full spec: `~/.claude/conventions/design-system.md`.

### Tier classification (apply per repo)

- **Tier A** — user-facing product; owns full design system; `docs/design/` required with brand/palette/typography/components/voice/assets/references; Stitch project linked
- **Tier B** — functional UI (admin, backend-only); inherits umbrella or sibling brand; minimal `docs/design/` optional
- **Tier C** — no UI; design-irrelevant

### Stitch MCP wiring (Tier A)

1. Create Stitch project once per brand: `mcp__stitch__create_project(name="<brand>")`
2. Create design system with tokens from `docs/design/palette.md` + `typography.md`
3. Store project ID in `docs/design/references/stitch.md`
4. Generate screens via `generate_screen_from_text`; commit to `docs/design/screens/`

### Brand-family rules (Vagary Life umbrella)

- Vagary brands share typographic scale + neutral ramps + radius/shadow tokens
- Each owns distinct primary/secondary hue + logo + voice
- Independent brands (Anjaan, portfolio) share nothing with Vagary family

### Default component stack (new Tier A repos)

React 19 + Vite OR Next.js 15 + Tailwind v4 + Radix UI + shadcn/ui + Framer Motion + Lucide. Deviations allowed for legacy repos with justified reason.

### Drift-trigger

Palette/typography values changing in code without `docs/design/*` update → audit-signal flag (v13 adds automated check).

## 2. Design source-of-truth authority (extracted from §50.1)

| Domain | Source of truth | Secondary (read/derivative only) | Anti-pattern |
|---|---|---|---|
| **Design ground truth** | **Figma** | Stitch (generation only — sync output back to Figma) | Treating Stitch output as ship-able without Figma sync |

### Playbook: multi-lang.md (verbatim from `~/.claude/conventions/playbooks/multi-lang.md`)

# Multi-Language Refactor Playbook

**VERSION: 2026-05-06-v1**
Loaded only in repos that span ≥2 language extensions (.py + .ts + .kt + .go etc.). Per-repo `CLAUDE.md` `@-imports` this file when applicable.

Source: extracted verbatim from `~/.claude/conventions/universal-claudemd.md` v39 §51.4 during v40 cluster-split refactor. No content changes — only relocation so single-language repos don't carry the cross-language refactor cascade.

**Applies to repos**: `vagary-platform` (Python + TypeScript + React), `vagary-voice` (Python + TypeScript + Kotlin + Go), `Automated-sales-manager-main` (TypeScript + HTML/HTMX), `aakhara` (Python + TypeScript), `anjaan-app` (Python + JS), `bellring-server` + `bellring-extension` (when treating as a coupled cluster).

---

## §51.4 Cross-language refactor (originally §51.4 of universal)

**Trigger**: user says "rename across", "refactor X across the platform", or paths span ≥2 language extensions (.py + .ts + .kt).
**Sequence**:
1. `mcp__gitnexus__rename dry_run=true` — preview text-search hits across languages
2. Review "graph"-tagged hits (LSP-like confidence) vs "text_search"-tagged (manual review)
3. Per language, apply: `ast-grep --rewrite '<pattern>' '<replacement>'` for batch shape changes
4. Per language, run Serena `rename_symbol` for LSP-validated single-language rename
5. `/graph-audit` A8 (METHOD_OVERRIDES drift) — verify override chains intact
6. `semgrep --baseline` — regression check
7. Phase D verify per §46

Cross-language is the gap §47 Developer mode doesn't differentiate; this cascade explicitly serves it.

### Playbook: commercial-bound.md (verbatim from `~/.claude/conventions/playbooks/commercial-bound.md`)

# Commercial-bound + Sponsor-readiness Playbook

**VERSION: 2026-05-06-v1**
Loaded only in repos that are sponsor-ready public OSS, or commercial-bound (sold, embedded in paid product, or redistributed under permissive license). Per-repo `CLAUDE.md` `@-imports` this file when applicable.

Source: extracted verbatim from `~/.claude/conventions/universal-claudemd.md` v39 §39 + §50.2 during v40 cluster-split refactor. No content changes — only relocation so non-commercial / non-sponsor repos don't carry these rules.

**Applies to repos**: `aakhara`, `bellring-server`, `bellring-extension`, `bulk`, `pulseboard` (Android), `pulseboard-desktop`, `tldv_downloader`, `portfolio`, `project-template`, `vagary-platform` (sponsor-ready, has public-vertical surfaces), `host_page` (sponsor-ready landing template).

---

## 1. Sponsor-readiness + white-label pivot (originally §39)

### Sponsor-ready checklist for public repos
- `.github/FUNDING.yml` pointing to `github.com/sponsors/<user>`
- README "Sponsor" section near the top (badge + 1-paragraph ask)
- `LICENSE` (MIT for utilities, AGPL for commercial pressure, other for proprietary)
- At least one GitHub Release (binary attached if applicable, e.g. APK)
- CI green badge

### White-label pivot pattern
When an internal tool goes OSS (e.g. NetworkMonitorCN → **Pulseboard** rebrand 2026-04-19) OR an OSS utility forks into SaaS (e.g. **Bellring** — formerly codenamed Salvo — from sales-notification):

1. **Fork or publish** — new repo with clean name, no internal branding in code
2. **Strip tenant-specific** — remove hardcoded emails/domains/org IDs; parameterize via env/config
3. **Document "Fork + rebrand"** — README section listing the edits a downstream forker makes
4. **Record sibling spec** — `~/.claude/specs/YYYY-MM-DD-<name>-whitelabel.md` if a SaaS pivot
5. **Update inventory** — add to `repo-inventory.md` with sponsor-ready / white-label flags

### Current inventory (2026-04-19)
- **Sponsor-ready public**: tldv_downloader, bulk (renamed from `bulk_api_trigger` 2026-04-19), **pulseboard** (renamed from `NetworkMonitorCN` 2026-04-19), portfolio, project-template, vagary-platform (renamed from `index-of-news` 2026-04-19; flagship vertical retains Index of News brand)
- **White-label pivot applied**: **Bellring** (formerly codenamed Salvo) — repos `bellring-server` + `bellring-extension` (renamed from `sales-notification-backend` / `sales-notification-extension` 2026-04-19). Spec: `~/.claude/specs/2026-04-19-sales-notification-whitelabel.md`.
- **Recently renamed (2026-04-19 Phase 3)**: `sales-notification-backend` → `bellring-server`, `sales-notification-extension` → `bellring-extension`, `NetworkMonitorCN` → `pulseboard`, `training-bot` → `aakhara`.
- **Recently renamed (2026-04-19 Phases 1-2)**: `AI_voice_builder` → `vagary-voice`, `chat-bot` → `anjaan-app`, `bulk_api_trigger` → `bulk`, `index-of-news` → `vagary-platform`. `webhook_trigger` archived (superseded by `bulk`). See `~/.claude/conventions/project-hygiene.md` § Rename Propagation Protocol.
- **Brand umbrella**: Vagary Labs (tech/R&D division of Vagary Life Pvt Ltd; see §41) holds the platform + products + OSS utilities.

## 2. License-aware tool routing (originally §50.2)

Repos categorized as **commercial-bound** (will be sold, embedded in paid product, or redistributed under permissive license):
- `bellring-server`, `bellring-extension` (Bellring SaaS — paid tiers)
- `aakhara` (paid sales-training product)
- `pulseboard`, `pulseboard-desktop` (Public OSS; permissive license required for derivatives)

When working in commercial-bound repos:
- `gitnexus` MCP MAY be used for **read-only investigation** (cypher queries, impact analysis in conversation)
- `gitnexus wiki`, `gitnexus group sync` derivatives, indexed JSON exports MUST NOT be committed/shipped (PolyForm-NC contamination)
- `codegraphcontext` MCP is the canonical graph-derivative source for these repos

When working in **personal/private repos** (vagary-platform, vagary-voice, vagary-earnings, ASM, anjaan-app, internal Cramraika): GitNexus permitted freely.

Per-repo CLAUDE.md should declare classification: `## License classification: commercial-bound` or `## License classification: personal/private`.

### Playbook: brand-registry.md (verbatim from `~/.claude/conventions/playbooks/brand-registry.md`)

# Brand Registry Playbook

**VERSION: 2026-05-07-v1**
Loaded only in Vagary-family repos (per `~/.claude/conventions/repo-inventory.md` §45). Per-repo `CLAUDE.md` `@-imports` this file when applicable.

Source: extracted verbatim from `~/.claude/conventions/universal-claudemd.md` §41 (Brand architecture) during 2026-05-07 cluster-split refinement (ENTRY #168). No content changes — only relocation so non-Vagary repos (e.g. `metabase-cn`, `tldv_downloader`, `torn-smart-scripts`) don't load 64 lines of Vagary brand registry they have no use for.

**Applies to repos**: `vagary-platform`, `vagary-voice`, `anjaan-app`, `aakhara`, `bellring-server`, `bellring-extension`, `bulk`, `pulseboard`, `pulseboard-desktop`, `project-template`, `portfolio` (cross-link only), `host_page`, `vps_host`, `vps-ansible`, `platform-docs`, `vagary-earnings`.

---

## 41. Brand architecture (originally §41 of universal-claudemd.md)

Vagary Life Pvt Ltd is the **corporate parent**. Below it, product and tech activity is organized into named divisions. As of 2026-04-19, one division is formalized: **Vagary Labs** (tech/R&D/platform).

### Structure

```
Vagary Life Pvt Ltd (parent company; registered entity)
└── Vagary Labs (tech/R&D/platform division — vagarylabs.com [PENDING])
    ├── Platform
    │   └── vagary-platform (20-vertical substrate; repo renamed from `index-of-news` 2026-04-19)
    │       └── Index of News (flagship vertical; keeps its own news sub-brand + 6 domains)
    ├── Product brands (each lives as an independent product under its own domain)
    │   ├── Vagary Voice (vagaryvoice.cloud) — commercial voice-AI SaaS
    │   ├── Anjaan (anjaan.online) — Hinglish consumer chat
    │   ├── Bellring (.io/.app/.ai TBD) — whitelabel sale-celebration SaaS; repos `bellring-server` + `bellring-extension` (renamed from `sales-notification-*` 2026-04-19; formerly codenamed Salvo)
    │   ├── Aakhara (aakhara.com pending) — voice sales-training roleplay for BDEs (Sanskrit "आखाड़ा" = practice arena; repo renamed from `training-bot` 2026-04-19). Positioning TBD: could sit as Vagary Voice sub-product or stand alone
    │   └── Hype / Mockline / Kohort (legacy proposed names, superseded by Bellring/Aakhara above)
    └── OSS Utilities
        ├── bulk (renamed from `bulk_api_trigger` 2026-04-19)
        ├── tldv_downloader
        ├── pulseboard (renamed from `NetworkMonitorCN` 2026-04-19; Android OSS, `pulseboard.build` pending)
        └── project-template
```

Additional divisions (media, ops, consulting, etc.) may be added later. Keep Vagary Labs scoped to **tech/platform/R&D**.

### Domain strategy

- **vagarylife.com / vagarylife.in** — corporate parent marketing + investor/careers. TO BE BUILT.
- **vagarylabs.com** — tech/R&D division site. Domain **PENDING PURCHASE** (user flagged). Will host platform docs + OSS index + R&D blog once acquired.
- **Per-product domains** — each commercial product keeps its own brand domain (`vagaryvoice.cloud`, `anjaan.online`, future `hype.sh`, etc.). Product domains do NOT nest under `vagarylabs.com`.
- **chinmayramraika.in** — founder's personal hub; cross-links each Vagary Life / Vagary Labs product in a "projects" section.

### Repo-to-brand mapping (authoritative)

| Repo | Vagary Labs home | Product / sub-brand |
|---|---|---|
| `vagary-platform` | Platform | Holds all 20 verticals; flagship vertical = **Index of News** (news sub-brand, 6 domains) |
| `vagary-voice` | Product brands | **Vagary Voice** (commercial product, `vagaryvoice.cloud`) |
| `anjaan-app` | Product brands | **Anjaan** (consumer product, `anjaan.online`) |
| `aakhara` | Product brands | **Aakhara** (voice sales-training roleplay; `aakhara.com` pending). Renamed from `training-bot` 2026-04-19. Positioning TBD (standalone OR Vagary Voice sub-product) |
| `bellring-server` | Product brands | **Bellring** server (whitelabel sale-celebration SaaS backend; `.io/.app/.ai` TBD). Renamed from `sales-notification-backend` 2026-04-19 (formerly codenamed Salvo) |
| `bellring-extension` | Product brands | **Bellring** extension (Chrome MV3 + Firefox/Edge portable; pairs with `bellring-server`). Renamed from `sales-notification-extension` 2026-04-19 |
| `bulk`, `tldv_downloader`, `pulseboard`, `project-template` | OSS Utilities | Each with its own GitHub + README brand. `pulseboard` renamed from `NetworkMonitorCN` 2026-04-19 (Android OSS; `pulseboard.build` pending) |
| `portfolio` | Personal hub (OUTSIDE Vagary Labs) | `chinmayramraika.in` founder site |
| `host_page`, `platform-docs`, `vps_host`, `n8n-workflows`, `metabase-cn` | Infrastructure (internal to Vagary Labs) | No external product brand |
| `Automated-sales-manager-main` | Client work (CN-internal) | ASM — CN-branded; Cadre whitelabel TBD |
| `google-sheet-sales-manager` | Client work (CN-internal) | Sheetpilot whitelabel TBD |
| `Expense tracker` | Absorbing → Platform (`budget` vertical) | No standalone brand going forward |

### How Claude uses this

- When a repo's description says "product," check the brand table above for positioning.
- The **platform repo** (`vagary-platform`) is *not* a product. It is substrate. Individual verticals (news, budget, …) are the products that ship.
- Don't reinvent brand positioning in per-repo CLAUDE.md — reference this section and defer details to `~/.claude/specs/2026-04-19-brand-rename-proposal.md` (for rationale) + `~/.claude/conventions/repo-inventory.md` (for current state).
- For any new repo: declare its division home in its CLAUDE.md § Status / Brand section and cross-reference here.

### Caveats

- `vagarylabs.com` is **not yet purchased** (2026-04-19). Until acquired, Vagary Labs is an internal organizational concept; do not publish external references to `vagarylabs.com` until DNS is live.
- Additional divisions (media, ops, consulting) may emerge. When they do, add a sibling subtree here + bump VERSION.

### Playbook: vagary-cluster.md (verbatim from `~/.claude/conventions/playbooks/vagary-cluster.md`)

# Vagary Product Cluster Playbook

**VERSION: 2026-05-07-v1-stub**
Loaded only in Vagary product cluster repos (per `~/.claude/conventions/repo-inventory.md` §45). Per-repo `CLAUDE.md` `@-imports` this file when applicable.

Source: NEW playbook authored 2026-05-07 (ENTRY #168) per operator decision C2. v1-STUB — rules accumulate as cross-repo concerns surface (cross-repo OAuth / secret / log-pipeline / Coolify-project conventions live here when discovered).

**Applies to repos**: `vagary-platform`, `vagary-voice`, `anjaan-app`, `vagary-earnings`, `aakhara`.

---

## 1. Cluster identity

Vagary product cluster — repos that share the Vagary Labs product surface:
- **`vagary-platform`** — 20-vertical substrate; flagship vertical = Index of News (FastAPI + MongoDB + React/Vite + Tailwind).
- **`vagary-voice`** — Commercial voice-AI SaaS; `vagaryvoice.cloud` (Tier A; sponsor-ready).
- **`anjaan-app`** — Hinglish consumer chat; `anjaan.online` (Flask + Grok + Razorpay + Docker).
- **`vagary-earnings`** — Revenue tracker (Next.js + Dockerfile + docker-compose); Tier C.
- **`aakhara`** — Voice sales-training roleplay (FastAPI + React + PostgreSQL 15); `aakhara.com` pending.

All deploy via Coolify on vagary-compute-1 (Coolify-managed remote-server pattern; control-plane on core-1 per CON-LIVE-1 RESOLVED). All publish to GlitchTip self-hosted error tracker. Most use Infisical secret-store with per-app workspace.

## 2. Cross-repo conventions (rules accumulate here)

### 2.1 OAuth / authentication

(STUB — when cross-repo OAuth conventions surface, codify here. Currently each app handles auth independently.)

### 2.2 Secret-store conventions

Vagary product repos use Infisical. Each has a workspace named per the app (`ion` for vagary-platform legacy slug; `vagary-voice`, `anjaan-app`, etc.). Cross-repo secret-naming convention: per-app prefix pattern (e.g., `HOST_PAGE_SENTRY_DSN`, `VAGARY_VOICE_SENTRY_DSN`) per memory `feedback_no_ui_work_cc_via_api_cli_mcp.md`.

### 2.3 Log-pipeline (Loki + Promtail)

All product apps ship logs to Loki on vagary-compute-1 via Promtail Docker SD. Per-app Loki labels follow `app=<repo-name>` convention. Grafana dashboards per app are Cluster-4-trigger work (per `compliance/phase-2-per-service-gap-matrix.md` §3.2.X).

### 2.4 Coolify project conventions

(STUB — Coolify project-naming + env-var-naming conventions accumulate here.)

### 2.5 GlitchTip DSN routing

(STUB — DSN-to-relay migration cluster-2 work; per-app DSN naming pattern.)

## 3. Notes

- v1-STUB intentionally minimal. Concrete cross-repo rules accumulate as Phase 3 Wave-N service-vertical work surfaces them (especially Wave 3 Observability force-multiplier session and Wave 5 Apps wave).
- Many cross-repo concerns currently sit in `compliance/phase-2-cross-cutting-drift.md` (platform-docs internal). When a Cluster-B drift item resolves with a generalizable cross-repo rule, that rule moves here.

<!-- END PLAYBOOKS BLOCK -->

## Identity & Role

`aakhara` is the **Aakhara Voice Sales-Training Roleplay Platform** — Hinglish sales practice arena for BDEs (~300 BDEs at Coding Ninjas reference customer). Sanskrit "आखाड़ा" (akhada) = wrestling / training arena; each roleplay session = one bout in the akhada. Repo renamed from `training-bot` 2026-04-19. Domain `aakhara.com` pending purchase.

Vagary Labs brand: **Aakhara** (positioning TBD — standalone product OR Vagary Voice sub-product `vagaryvoice.cloud/aakhara`).

## Coverage Today (post-PCN-S6/S7/S11A)

Per matrix row `aakhara` — **bare-fork stack-up cluster** (~14 T-cells; Cluster 1):

```
Mail | DNS | RP | Orch | Obs | Backup | Sup | Sec | Tun | Err | Wflw | Spec
 T   | T   | T  | T    | T   | T      | T   | T   | T   | T   | NA   | NA
```

All TRIGGER-TO-WIRE except Wflw + Spec. No production deploy yet; Docker Compose on developer machines only. S11B builds skeleton; S11C executes wiring (or queues to per-product launch session).

## What's Wired (developer-only today)

- **Local / Codespaces:** Docker Compose (`backend` 8000, `frontend` 3000, `db` 5432, `dev` sleeps). `docs/ENVIRONMENTS.md` is authoritative.
- **CI:** GitHub Actions on `ubuntu-latest` (Python 3.11) — flake8 + pip-audit (non-blocking) + npm install/build/audit + Docker build smoke.
- **Backend logging only** — `backend/chatbot.log` (gitignored). No Sentry/GlitchTip/Grafana/Uptime Kuma yet.
- **Repo migrated** to Cramraika 2026-04-19 (from SMPL562). Standard `gh` push.

## Stack

- **Backend:** FastAPI 0.115 + SQLAlchemy 2.0 + aiohttp + python-dotenv (Python 3.11)
- **Frontend:** React 18 + react-scripts 5 + react-router-dom 6 + axios + TailwindCSS 3
- **DB:** PostgreSQL 15 (Docker `postgres:15`, volume-backed)
- **Runtime:** Docker Compose (backend, frontend, db, dev)
- **LLM (current):** OpenAI Realtime API via WebSocket — `OPENAI_API_KEY`
- **Voice stack (Phase 1, planned):** **Deepgram** (STT; Nova-2/3 Hinglish code-switching) + **ElevenLabs** (TTS; Hindi voices) + **Gemini/OpenAI** (LLM; pluggable)

## Roadmap (post-S11A)

### Phase 1 — Real voice integration (target Q3 2026)
- Deepgram (STT) + ElevenLabs (TTS) + Gemini/OpenAI (LLM) WebSocket pipeline.
- New `backend/voice/` module: `stt_deepgram.py`, `tts_elevenlabs.py`, `session_loop.py`.
- New envs: `DEEPGRAM_API_KEY`, `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`.
- New PG table: `voice_turns(session_id, role, audio_s3_key, transcript, latency_ms, created_at)`.
- **Cost concern (BLOCKING for rollout sizing)** — at 300 BDEs × ~600 min/week → ~$540-900/month (Deepgram + ElevenLabs) + $200-400/month LLM. Need CN finance sign-off OR usage caps before Phase 1 ships.

### Phase 2 — Recording, transcript review, automated scoring (target Q4 2026)
- Persist session audio to S3/Supabase Storage (90-day retention).
- Extend `feedback.py` for objection-handling count, filler-word rate, Hinglish code-switch appropriateness, close-attempt detection.
- Manager dashboard trendlines per BDE; weekly "Top 3 coaching opportunities" digest via existing n8n.

### Phase 3 — Multi-tenant / Aakhara commercial launch (exploratory 2027)
- `tenant_id` scoping; per-tenant branding; Stripe seat-based + usage billing.
- **Brand + domain:** purchase `aakhara.com`; brand site (landing + signup + pricing) — OR mount as `vagaryvoice.cloud/aakhara` if Vagary Voice sub-product positioning wins.

### Bare-fork stack-up (Cluster 1; per dispatch §1.m)
This is one of 4 pre-launch repos getting bare-fork skeleton stack-up. S11B builds skeleton; S11C wires (or per-product launch session):
- Mail (transactional SMTP via Postfix on Main if deployed there) — T.
- DNS (CF zone for `aakhara.com` once purchased) — T.
- RP (LiteSpeed vhost on Main when deployed) — T.
- Orch (Coolify on Main_host or Vagary; voice CPU cost may dominate Vagary) — T.
- Obs (Prom + Loki + Grafana + Uptime Kuma + GlitchTip project `aakhara`) — T.
- Backup (restic + rclone-union per ADR-019) — T.
- Sup (Trivy gate via centralized Main scanner; Cosign post-PR-#50) — T.
- Sec (Infisical workspace `aakhara`; Machine Identity vps-operator) — T.
- Tun (Headscale opt-in; ephemeral dynamic IP per Interview-2 Q4) — T.
- Err (GlitchTip via relay on Vagary) — T.

## ADR Compliance

- **ADR-038 personal-scope:** ✓ — Cramraika org; SMPL562 retired 2026-04-19.
- **ADR-033 Renovate canonical:** T — pending bare-fork stack-up; no `renovate.json` yet.
- **ADR-041 Trivy gate:** T — pending Cosign fanout post-PR-#50.
- **SOC2 risk-register cross-ref:** zero observability stack today = HIGH-severity availability+visibility risk; mitigation = Phase 1 voice rollout requires observability prerequisite.

## Cross-references

- `platform-docs/05-architecture/part-B-service-appendices/products/aakhara.md` (pending S11B authoring)
- `~/.claude/specs/2026-04-19-brand-rename-proposal.md` (Phase 3 rename: training-bot → Aakhara)
- `~/.claude/conventions/universal-claudemd.md` §41 brand architecture (Aakhara)
- `~/.claude/conventions/design-system.md` (Tier A; warm saffron primary + bilingual EN/HI typography)

Sister repos (§45 vagary cluster — bridged via `gitnexus group sync vagary` + `~/cluster-graphs/vagary.json`):
- `vagary-platform` — 20-vertical platform substrate; flagship news vertical Tier-A. Shared Coolify project namespace (vagary-compute-1), shared Infisical workspace pattern, shared observability tier. Cross-repo handoff (live): `~/Documents/Github/platform-docs/docs/architecture/launch-interface/news-vertical-launch-handoff-2026-05-10.md` (news-launch SSOT).
- `vagary-voice` — shared voice stack (Deepgram + ElevenLabs) if positioning locks to "sub-product"; potential code-sharing for `backend/voice/*`. Currently DOWN (SEV1 2026-04-26).
- `vagary-earnings` — revenue tracker (read-only consumer of platform analytics surface).
- `bellring-server` / `bellring-extension` — adjacent sales-ops SaaS (Bellring = celebration, Aakhara = practice). Not in §45 vagary cluster — separate Bellring cluster.

## Migration from v1

**Major v1 → v2 changes:**
1. Per-project-service-matrix row added — **bare-fork stack-up cluster (~14 T-cells)**.
2. Bare-fork stack-up trajectory documented (S11B skeleton; S11C wires or per-product launch session).
3. Cosign post-PR-#50 trigger flagged.
4. Phase 1 voice cost gate (~$540-900/month + LLM) reaffirmed as commercial blocker.
5. Aakhara positioning decision (standalone vs Vagary Voice sub-product) preserved as deferred-with-trajectory.

---

## VPS Service Navigation

This section tells this repo's CC which dual-VPS services `aakhara` consumes and how to operate each headlessly (operator does no UI work — CC handles 99% via API / CLI / MCP). Canonical service playbooks live in `platform-docs/02-governance/service-playbooks/`; this is the per-repo index.

| Service | This repo's resource | How CC leverages it | Canonical playbook |
|---|---|---|---|
| **Infisical** (secrets) | Project `aakhara` id `ec8dfb8a-6a08-452c-b535-3733e97addbd`, envs dev/staging/prod — **scaffold-only (undeployed)** | Secret CRUD via `mcp__infisical__*` (read) or API with `vps-operator` creds (write); populate at deploy time | `service-playbooks/substrate/infisical.md` §9.5 |
| **Coolify** (orchestration) | No Coolify app yet — deploys via Coolify on **vagary-compute-1** when launched (Coolify-managed remote-server pattern) | At launch: register app via Coolify API; Coolify MCP 404 over public → SSH `docker` on compute-1 fallback | `service-playbooks/substrate/coolify.md` §5,§6 |
| **Reverse proxy** | Traefik `coolify-proxy` on compute-1 (auto-provisions vhost on deploy) | Do NOT hand-edit `/data/coolify/proxy/*` (Principle #12) | `service-playbooks/substrate/traefik.md` |
| **DNS** | `aakhara.com` (pending purchase) → Cloudflare zone when acquired | DNS-record ops via CF API scoped token | `service-playbooks/substrate/cloudflare.md` |
| **Error store** | GlitchTip self-hosted (DSN to be created at deploy time) | Per-app GlitchTip project; never dual-report to Sentry | `service-playbooks/observability/glitchtip.md` |
| **Observability** | Loki `{app="aakhara"}` + Prometheus once deployed | Query via `grafana` / Loki MCP | `service-playbooks/observability/{loki,prometheus,grafana}.md` |
| **Mail** | n/a until deployed | If added: `platform-docs/docs/runbooks/mail-add-domain.md` | — |

**Secret-population follow-through (OW-60):** the `aakhara` Infisical project is an empty scaffold (undeployed product). The declared secrets `OPENAI_API_KEY` + `N8N_API_KEY` should be populated by a CC session **in this repo** at deploy time: read `OPENAI_API_KEY` from the OpenAI console, `N8N_API_KEY` from the n8n UI, then `mcp__infisical__create-secret` into the `aakhara` project prod env. Never invent secret values. Cross-ref: `platform-docs/11-compliance/open-work-inventory.md` OW-60.
