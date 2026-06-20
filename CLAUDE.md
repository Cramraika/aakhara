# aakhara — CLAUDE.md v2

**Date:** 2026-04-28 (S11B authoring)
**Supersedes:** v1 (commit-sha pending S11C verification)
**Tier:** C (text-based) → pre-launch A pending Phase 1 voice integration. **Bare-fork stack-up cluster** per dispatch §1.m.

## Claude Preamble
<!-- VERSION: 2026-06-20-v53 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

**Universal laws (§1–§55) load via user-level `~/.claude/conventions/` and are ALWAYS in context** — `universal-claudemd.summary.md` (≤50-line salient view, read FIRST) → `universal-claudemd.md` (full) + `project-hygiene.md`. Do **NOT** assume their content from memory; consult + verify before asserting (§34 / §43.6 / §43.7). The `## Active Cluster Playbooks` block below names this repo's situational playbooks **read-on-demand** (§49.10): Read the named playbook when its trigger fires — never guess its contents; always-load guardrails are inline. Sync: `~/.claude/scripts/sync-preambles.py` (manual cadence; run after any source edit).

## Active Cluster Playbooks (read-on-demand — §49.10; bodies at ~/.claude/conventions/playbooks/)
<!-- BEGIN PLAYBOOKS BLOCK (managed by sync-preambles.py — read-on-demand pointers per §49.10; bodies at ~/.claude/conventions/playbooks/) -->

These cluster playbooks apply to this repo. You do NOT know their contents from memory —
**Read the named file when its trigger fires; never assume** (§49.10, §34, §43.6). Bodies are
NOT inlined and NOT @-imported; the always-load GUARDRAILs below are the only parts that must
hold without a Read.

- `deployed-service.md` — when: incident / outage / 5xx / error-store / telemetry work. GUARDRAIL: never dual-report errors — one store (Sentry XOR Glitchtip) per project.
- `tier-a-design.md` — when: design / UI / Figma / Stitch / component / palette / typography work.
- `multi-lang.md` — when: cross-language refactor / rename spanning two or more languages.
- `commercial-bound.md` — when: license / sponsor-readiness / graph-tool-output / white-label work. GUARDRAIL: never commit/ship GitNexus (PolyForm-NC) graph output from a commercial-bound repo — CGC is the canonical graph source.
- `brand-registry.md` — when: brand / positioning / brand-canon / cross-repo brand work.
- `vagary-cluster.md` — when: cross-repo Vagary product work (shared Coolify / Infisical / Loki / GlitchTip conventions).

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
