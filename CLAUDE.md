# Training Bot (Hinglish Conversational AI Calling Bot)

## Claude Preamble
<!-- VERSION: 2026-04-18-v7 -->
<!-- SYNC-SOURCE: ~/.claude/conventions/universal-claudemd.md -->

**Universal laws** (§4), **MCP routing** (§6), **Drift protocol** (§11), **Dynamic maintenance** (§14), **Capability resolution** (§15), **Subagent SKILL POLICY** (§16), **Session continuity** (§17), **Decision queue** (§17.a), **Attestation** (§18), **Cite format** (§19), **Three-way disagreement** (§20), **Pre-conditions** (§21), **Provenance markers** (§22), **Redaction rules** (§23), **Token budget** (§24), **Tool-failure fallback** (§25), **Prompt-injection rule** (§26), **Append-only discipline** (§27), **BLOCKED_BY markers** (§28), **Stop-loss ladder** (§29), **Business-invariant checks** (§30).

**All preloaded from** `~/.claude/conventions/universal-claudemd.md`. Before significant work: read universal file sections relevant to the task. Re-audit status: next due 2026-07-18. Sync script: `~/.claude/scripts/sync-preambles.py`.

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
