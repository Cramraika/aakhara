# Aakhara — Voice Sales-Training Roleplay

**Aakhara** (Sanskrit आखाड़ा, *akhada* — a wrestling / training arena) is a Hinglish, voice-based
sales-practice platform for Business Development Executives. Each roleplay session is one bout in
the arena: a BDE practices objection-handling and closing against an AI prospect, then receives
goal-based feedback.

> **Status:** pre-launch. Runs via Docker Compose on developer machines / Codespaces; no production
> deployment yet. The live voice pipeline today uses the **OpenAI Realtime API**; a Deepgram +
> ElevenLabs voice stack is planned (Phase 1) — see `CLAUDE.md` for the roadmap.

## Stack

- **Backend:** FastAPI + SQLAlchemy + aiohttp (Python 3.11), in `backend/`
- **Frontend:** React 18 + react-scripts (Create React App), in `frontend/`
- **Database:** PostgreSQL 15
- **LLM / voice (current):** OpenAI Realtime API over WebSocket (`OPENAI_API_KEY`)
- **Runtime:** Docker Compose (`backend`, `frontend`, `db`, `dev`)

## Quick Start (Docker)

```bash
git clone https://github.com/Cramraika/aakhara.git
cd aakhara

# Configure environment
cp .env.example .env
# Edit .env — set OPENAI_API_KEY (required); DATABASE_URL has a Docker default

# Start all services
docker compose up --build
```

| Service    | URL                   |
|------------|-----------------------|
| Frontend   | http://localhost:3000 |
| Backend    | http://localhost:8000 |
| PostgreSQL | localhost:5432        |

For standalone (no-Docker) setup, Codespaces, the full environment-variable table, CI details, and
troubleshooting, see **[`docs/ENVIRONMENTS.md`](docs/ENVIRONMENTS.md)**.

## Project Layout

| Path                 | Purpose                                                   |
|----------------------|-----------------------------------------------------------|
| `backend/`           | FastAPI app (`main.py`), models, CRUD, feedback, DB init. |
| `frontend/`          | React (CRA) client (`src/App.jsx`).                       |
| `docs/`              | Environment reference + design surface (`docs/design/`).  |
| `docker-compose.yml` | Local/Codespaces orchestration of all four services.      |

## Features

- Real-time Hinglish voice interaction.
- AI Coach template system for configuring practice scenarios.
- Team management and user roles.
- Goal-based feedback with per-session metrics.

## Development Notes

- Backend logs to `backend/chatbot.log` (gitignored) — check it for WebSocket / OpenAI session issues.
- Codespaces is supported via `.devcontainer/devcontainer.json`.
- Design surface (palette, typography, components, voice) lives in `docs/design/` and is CI-validated.

## License

Proprietary — © 2026 Vagary Labs. All rights reserved. See [LICENSE](LICENSE).
