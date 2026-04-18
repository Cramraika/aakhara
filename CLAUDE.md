# Training Bot (Hinglish Conversational AI Calling Bot)

## Claude Preamble (preloaded universal rules)
<!-- VERSION: 2026-04-18-v5 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

### Laws
- Never hardcode secrets. Use env vars + `.env.example`.
- Don't commit unless asked. Passing tests ≠ permission to commit.
- Never skip hooks (`--no-verify`) unless user asks. Fix root cause.
- Never force-push to main. Prefer NEW commits over amending.
- Stage files by name, not `git add -A`. Avoids .env/credential leaks.
- Conventional Commits (`feat:` / `fix:` / `docs:` / `refactor:` / `test:` / `chore:`). Subject ≤72 chars.
- Integration tests hit real systems (DB, APIs); mocks at unit level only.
- Never delete a failing test to make the build pass.
- Three similar lines > premature abstraction.
- Comments explain non-obvious WHY, never WHAT.
- Destructive ops (`rm -rf`, `git reset --hard`, force-push, drop table) → ask first.
- Visible actions (PRs, Slack, Stripe, Gmail) → confirm unless pre-authorized.

### Doc & scratch placement
- Plans: `docs/plans/YYYY-MM-DD-<slug>.md`
- Specs: `docs/specs/YYYY-MM-DD-<slug>.md`
- Architecture: `docs/architecture/`
- Runbooks: `docs/runbooks/`
- ADRs: `docs/adrs/ADR-NNN-<slug>.md`
- Scratch/temp: `/tmp/claude-scratch/<purpose>-YYYY-MM-DD.ext`
- Never create README unless explicitly asked.

### MCP routing (pull-tier — invoke when task signal matches)
**Design / UI:**
- Figma URL / design ref → `figma` / `claude_ai_Figma` (`get_design_context`)
- Design system / variants → `stitch`

**Engineer / SRE:**
- Prod error → `sentry`
- Grafana dashboard / Prometheus query / Loki logs / OnCall / Incidents → `grafana`
- Cloudflare Workers / D1 / R2 / KV / Hyperdrive → `claude_ai_Cloudflare_Developer_Platform`
- Supabase ops → `supabase`
- Stripe payment debugging → `stripe`

**Manager / Planner / Writer:**
- Linear issues → `linear`
- Slack comms → `slack` / `claude_ai_Slack`
- Gmail drafts/threads/labels → `claude_ai_Gmail`
- Calendar events → `claude_ai_Google_Calendar`
- Google Drive file access → `claude_ai_Google_Drive`

**Analyst / Marketer:**
- PostHog analytics/funnels → `posthog`
- Grafana time-series / Prometheus → `grafana`

**Security:**
- Secrets management → `infisical`

**Knowledge / Architecture:**
- Cross-repo knowledge ("which repos use X", "patterns across products") → `memory`
- Within-repo state → flat-file auto-memory (`~/.claude/projects/<id>/memory/`)

**Rule of thumb:** core tools (Read/Edit/Write/Glob/Grep/Bash) for local ops; MCPs for external-system state. Don't use MCPs as a slow alternative to core tools.

### Response discipline
- Tight responses — match detail to task.
- No "Let me..." / "I'll now...". Just do.
- End-of-turn summary: 1-2 sentences.
- Reference `file:line` when pointing to code.

### Drift detection
On first code-edit of the session, verify this preamble's VERSION tag matches `~/.claude/conventions/universal-claudemd.md` § 9. If stale, propose sync to user before proceeding.

### Re-audit status (check at session start in global workspace)
Last run: **2026-04-18-v1**. Next due: **2026-07-18** OR when `/context` > 50%, whichever first.
Methodology spec: `~/.claude/specs/2026-04-18-plugin-surface-audit.md`.
On session start in `~/Documents/Github/`, if today's date > next-due OR context feels heavy: remind user "Plugin audit overdue — want to run it per methodology spec?"

### Dynamic maintenance (self-adjust)
Environment is NOT static. Claude proactively handles:
- **Repo added/removed** → run `python3 ~/.claude/scripts/inventory-sync.py` to detect drift; propose inventory + profile + CLAUDE.md preamble
- **Stack change** (manifest drift) → narrow stack-line update in CLAUDE.md
- **universal-claudemd.md bumped** → run `python3 ~/.claude/scripts/sync-preambles.py` to propagate to 22 files
- **New marketplace / plugin surge** → propose audit via methodology spec
- **MCP added** → add routing hint; sync preambles
- See `~/.claude/conventions/universal-claudemd.md` § 14 for the full protocol

### Full detail
- Universal laws + architecture: `~/.claude/conventions/universal-claudemd.md`
- Doc placement + cleanup: `~/.claude/conventions/project-hygiene.md`
- Latest audit: `~/.claude/specs/2026-04-18-plugin-surface-audit.verdicts.md`

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

### Security Rules
- NEVER hardcode API keys, secrets, or credentials in any file
- NEVER pass credentials as inline env vars in Bash commands
- NEVER commit .env, .claude/settings.local.json, or .mcp.json to git
- Always validate user input at system boundaries
- Use .env.example as template; never put real keys in it
