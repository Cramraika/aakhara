# Training Bot (Hinglish Conversational AI Calling Bot)

## Claude Preamble
<!-- VERSION: 2026-04-19-v8 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

**Universal laws** (§4), **MCP routing** (§6), **Drift protocol** (§11), **Dynamic maintenance** (§14), **Capability resolution** (§15), **Subagent SKILL POLICY** (§16), **Session continuity** (§17), **Decision queue** (§17.a), **Attestation** (§18), **Cite format** (§19), **Three-way disagreement** (§20), **Pre-conditions** (§21), **Provenance markers** (§22), **Redaction rules** (§23), **Token budget** (§24), **Tool-failure fallback** (§25), **Prompt-injection rule** (§26), **Append-only discipline** (§27), **BLOCKED_BY markers** (§28), **Stop-loss ladder** (§29), **Business-invariant checks** (§30), **Plugin rent rubric** (§31), **Context ceilings** (§32).

**Sources**: `~/.claude/conventions/universal-claudemd.md` (laws, MCP routing, lifecycle, rent rubric) + `~/.claude/conventions/project-hygiene.md` (doc placement, cleanup, local-workspaces). Read relevant sections before significant work. Re-audit due **2026-07-19**. Sync: `~/.claude/scripts/sync-preambles.py`.

## Product Overview

| Product | Sales Training Roleplay Platform |
|---------|----------------------------------|
| **What it does** | Real-time voice-based Hinglish chatbot that trains sales reps through AI-powered roleplay simulations. Managers create training templates (scenarios), assign teams, and review AI-generated feedback on rep performance. |
| **Who uses it** | Sales managers (template creation, team management, feedback review). BDEs/sales reps (roleplay practice sessions). Org admins (team structure). All at Coding Ninjas. |
| **Status** | Stable/Maintenance (Tier C). Deployed via Docker Compose. |
| **Organization** | SMPL562 |

## Product Features and User Journeys

### 1. Template Creation (Manager Workflow)
- **User journey**: Sales manager logs in, creates a training template defining the scenario (e.g., "cold call to a student interested in Data Science bootcamp"), sets goals and evaluation criteria, assigns it to a team.
- **Success signals**: Template saved to PostgreSQL. Team members can see and start the template. Scenario accurately represents real sales situations.
- **Failure signals**: Template is too vague for the AI to simulate effectively. No team members assigned. Template creation errors (database write failures).

### 2. Roleplay Session (BDE Workflow)
- **User journey**: BDE selects a training template, starts a roleplay session. AI plays the customer role in Hinglish (matching real calling scenarios). BDE practices their pitch. Session targets 600ms-1s voice interaction latency.
- **Success signals**: Conversation feels realistic. BDE completes the full scenario. Session logged with timestamps and transcript.
- **Failure signals**: AI latency exceeds 1s (breaks conversational flow). AI breaks character or uses formal English. OpenAI API errors interrupt the session. BDE abandons mid-session.

### 3. AI Feedback and Metrics (Performance Review)
- **User journey**: After a roleplay session, the system generates feedback based on goal-based metrics. Manager reviews session reports to identify coaching opportunities across their team.
- **Success signals**: Feedback is specific and actionable (not generic). Metrics correlate with actual sales performance improvement over time.
- **Failure signals**: Feedback is vague or repetitive. Metrics don't capture meaningful performance dimensions. Reports are empty or incomplete.

### 4. Team Management (Admin Workflow)
- **User journey**: Admin creates teams, assigns BDEs and managers. Managers can only see their team's sessions and metrics.
- **Success signals**: Team hierarchy correctly enforced. Managers see only their reports.
- **Failure signals**: Data leaks across teams. Orphaned users without team assignments.

## Known Product Limitations
- No real voice/speech integration yet (text-based roleplay simulating voice scenarios)
- No historical performance trending across sessions
- Single OpenAI model dependency (no fallback provider)

---

## Technical Reference

### Stack
- FastAPI + React 18 + PostgreSQL 15 + Docker Compose + SQLAlchemy + TailwindCSS

### File Organization
- Never save working files to root folder
- `backend/` - FastAPI application (`main.py`, `database.py`, `models.py`, `schemas.py`, `crud.py`, `feedback.py`)
- `frontend/` - React application (Create React App with react-router-dom, axios, TailwindCSS)
- `docker-compose.yml` - Orchestrates backend, frontend, db, and dev services
- `.env.example` - Environment variable template

### Build & Test
```bash
# Docker (recommended)
docker-compose up --build          # Build and start all services
docker-compose down                # Stop all services
docker-compose logs -f backend     # View backend logs

# Backend (standalone)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (standalone)
cd frontend
npm install
npm start                          # Dev server on port 3000
npm run build                      # Production build
npm test                           # Run tests
```

### Environment Variables
- `OPENAI_API_KEY` - OpenAI API key for conversational AI
- `DATABASE_URL` - PostgreSQL connection string (default: `postgresql://user:password@localhost:5432/hinglish_chatbot`)

### Key Ports
- Backend: 8000
- Frontend: 3000
- PostgreSQL: 5432

### n8n Workflow Automation

This project can trigger and receive n8n workflows at `https://n8n.chinmayramraika.in`.

- **Webhook URL:** Set in `N8N_WEBHOOK_URL` env var
- **API Key:** Set in `N8N_API_KEY` env var (unique per project)
- **Auth Header:** `X-API-Key: <N8N_API_KEY>`
- **Workflow repo:** github.com/Cramraika/n8n-workflows (private)

---

## Roadmap / Planned

The current build closes the gap between the product vision (real-time Hinglish voice roleplay, 600ms-1s latency, per README § Features) and the text-only MVP (per Known Product Limitations). Items below are ordered by dependency: voice integration unblocks the scoring and multi-tenant tracks.

### Phase 1 — Real voice integration (target: Q3 2026)
Commitment against the "No real voice/speech integration yet" limitation.

- **Stack decision**: **Deepgram (STT) + ElevenLabs (TTS) + Grok/OpenAI (LLM)**. Deepgram chosen for STT because its Nova-2/3 models handle Hindi-English code-switching (Hinglish) natively with sub-300ms streaming latency — OpenAI Realtime and Whisper underperform on code-switched Indic audio. ElevenLabs chosen for TTS for natural Hindi voices (Aria/Adam + custom clones) that keep the "feels like a real prospect" bar BDEs need. LLM stays pluggable via existing `OPENAI_API_KEY` abstraction to also address the "single OpenAI dependency" limitation.
- **Architecture sketch**:
  ```
  Browser (WebRTC/MediaStream capture)
    ↔ FastAPI WebSocket (/ws/roleplay/{session_id})
      → Deepgram streaming STT  (partial + final transcripts)
      → Grok/OpenAI chat (scenario prompt + Hinglish persona)
      → ElevenLabs streaming TTS (flush on sentence boundary)
    ↔ Browser audio playback (MediaSource / AudioWorklet)
  ```
  - Backend adds `backend/voice/` module: `stt_deepgram.py`, `tts_elevenlabs.py`, `session_loop.py` (orchestrator).
  - New envs: `DEEPGRAM_API_KEY`, `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`.
  - New PG table: `voice_turns` (session_id, role, audio_s3_key, transcript, latency_ms, created_at).
  - Fallback: if STT/TTS quota exhausted, session degrades to existing text chat (keeps BDE unblocked).
- **Cost concern (BLOCKING for rollout sizing)**: At ~300 BDEs × 15 min/session × 4 sessions/week, voice processing runs ~300 × 60 min/week = 18,000 min/month. Deepgram streaming ≈ $0.0043/min + ElevenLabs turbo ≈ $0.18/1k chars (≈ $0.02/min assistant speech) ≈ **$0.03–0.05 per minute end-to-end, or ~$540–900/month** for full rollout. Grok/OpenAI LLM adds ~$200–400/month at current rates. Need explicit CN finance sign-off or usage caps (e.g., 2 sessions/week/BDE) before Phase 1 ships. Mitigations: cache common scenario openings, prefer Deepgram Nova-2 over Nova-3, batch TTS per sentence.

### Phase 2 — Recording, transcript review, and automated scoring (target: Q4 2026)
Commitment against the "No historical performance trending across sessions" limitation.

- Persist full session audio to S3/Supabase Storage (pgsql metadata, object storage for blobs) with 90-day retention.
- Extend `feedback.py` to score transcripts on concrete rubrics: objection-handling count, filler-word rate, Hinglish code-switch appropriateness, close-attempt detection, scenario-goal completion %.
- Manager dashboard gains: trendlines per BDE over N sessions, cohort comparison, flagged sessions for coaching review.
- Output: weekly "Top 3 coaching opportunities" digest per manager (wired via existing n8n webhook integration).

### Phase 3 — Multi-tenant / white-label (exploratory: 2027)
If CN Product validates external demand (other bootcamps, sales-training vendors, enterprise sales teams).

- Introduce `tenant_id` scoping across `users`, `teams`, `templates`, `sessions`, `voice_turns` (additive migration).
- Per-tenant branding (logo, color tokens via Tailwind CSS vars), per-tenant LLM prompt shims (e.g., "US cold-calling" vs "CN bootcamp admissions").
- Per-tenant API keys and isolated n8n workflows.
- Billing surface: seat-based (per BDE/month) + usage-based voice overage — leverage existing Stripe MCP integration.
- Commercial angle: position as "Roleplay-as-a-Service" for Indian edtech / SaaS SDR teams. Initial wedge = Hinglish voice (moat: Deepgram + ElevenLabs Hindi tuning + CN's scenario library).

### Phase 4 — Sponsor / integration angle (opportunistic)
- Deepgram and ElevenLabs both run India developer programs with credits/co-marketing — pursue once Phase 1 ships and usage data exists.
- Potential CRM integrations (Salesforce, LeadSquared, HubSpot) so managers can trigger roleplay assignments from real pipeline deals.

### Explicitly out of scope (for now)
- Mobile-native app (web + PWA covers BDE use case).
- Non-Hinglish languages (English-only / regional Indic) — revisit only if multi-tenant Phase 3 closes a deal that needs it.
- On-prem / air-gapped deployment — costs and vendor-lock-in on Deepgram/ElevenLabs make this a hard no until a specific enterprise deal requires it.

---

### Security Rules
- NEVER hardcode API keys, secrets, or credentials in any file
- NEVER pass credentials as inline env vars in Bash commands
- NEVER commit .env, .claude/settings.local.json, or .mcp.json to git
- Always validate user input at system boundaries
- Use .env.example as template; never put real keys in it
