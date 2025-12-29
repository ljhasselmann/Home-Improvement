# Home Improvement Planner

A roadmap for building a home improvement planning and financial tracking application. This document outlines the product vision, planned features, and proposed architecture to guide implementation.

## Product Vision
Homeowners can plan projects, budget confidently, and track progress end-to-end in one place. The app will:
- Capture project scope, timelines, and milestones.
- Track budgets, quotes, invoices, and actual spend.
- Surface insights like cost overruns, remaining budget, and schedule risk.
- Support collaboration with contractors and household members.

## Core Feature Areas
1. **Project Workspace** – Project overview with objectives, scope, photos, and documents.
2. **Inspection Intelligence** – Upload inspection/PDF reports, extract issues, and auto-generate prioritized projects with contractor vs. DIY guidance.
3. **Task & Timeline** – Phases, tasks, dependencies, due dates, and reminders.
4. **Budget & Expenses** – Budgets by category, quotes, commitments, invoices, payments, and variance tracking.
5. **Vendors & Contracts** – Contact info, contract details, and compliance artifacts.
6. **Document Vault** – Plans, permits, receipts, and change orders with tagging and search.
7. **Analytics & Reporting** – Burn rate, cost to complete, upcoming payments, and schedule health.

## Proposed Architecture
- **Frontend**: React + TypeScript with component library (e.g., MUI), React Query for data fetching, and routing per project.
- **Backend**: FastAPI for REST endpoints, Pydantic models, background jobs via Celery + Redis for reminders/notifications.
- **Data**: PostgreSQL primary store; object storage (e.g., S3-compatible) for documents; Redis for caching/session.
- **Auth**: JWT-based auth with refresh tokens; role-based access for owners vs. contractors.
- **Infra**: Docker Compose for local dev, GitHub Actions for CI (lint, tests, type checks), and IaC-ready for cloud deployments.

## Development Priorities
- **MVP scope**
  - Upload an inspection report (PDF/image) and extract findings into a prioritized project list.
  - Show each recommended project with a short description, severity/priority, and a simple cost range estimate based on job type and location.
  - Flag whether a contractor is recommended vs. DIY-friendly.
- **Foundations**
  - Database migrations, API schema versioning, and OpenAPI docs.
  - Role-based access control and secure file handling for uploads.
  - Observability hooks (structured logging, basic metrics).

## Repository Layout
- `frontend/` – React app (Vite + TypeScript) with feature-based folders.
- `backend/` – FastAPI service with modular routers, services, and schemas.
- `docs/` – Product, architecture, and onboarding docs.
- `infrastructure/` – Docker Compose, CI/CD workflows, and IaC stubs.

## Prerequisites
- Python 3.11+
- Node.js 20+ and npm 10+
- Docker (optional, for Compose workflows)

## Quickstart
1. Install backend dependencies and copy environment variables:
   ```bash
   make install-backend
   cp backend/.env.example backend/.env
   ```
2. Install frontend dependencies and copy environment variables:
   ```bash
   make install-frontend
   cp frontend/.env.example frontend/.env
   ```
3. Run services locally:
   - Backend: `make dev-backend`
   - Frontend: `make dev-frontend`
   - Full stack with dependencies: `make compose-up`
4. Lint, type-check, and test:
   ```bash
   make lint-backend
   make type-backend
   make test-backend
   make lint-frontend
   ```

Troubleshooting tips:
- Ensure Docker has enough memory (at least 4GB) when running Compose.
- If npm install fails due to registry access, set `NPM_CONFIG_REGISTRY` to your allowed registry.

### Shared linting and formatting
The repo includes top-level configuration to keep a consistent style across frontend and backend:
- `.editorconfig` standardizes newlines, indentation, and whitespace trimming across editors.
- `.prettierrc.json` and `.prettierignore` provide shared formatting rules for JavaScript/TypeScript, JSON, Markdown, and stylesheets.
- `.eslintrc.cjs` and `.eslintignore` set a baseline ESLint configuration (with TypeScript overrides) to be extended when the frontend scaffolding is added.

## Next Steps
1. Finalize user stories and acceptance criteria centered on inspection uploads and prioritized project output (see `docs/project-roadmap.md`).
2. Follow the implementation plan in `docs/implementation-plan.md` to scaffold the stack and deliver the inspection ingestion vertical slice.
3. Scaffold backend (FastAPI + SQLModel or SQLAlchemy) with auth and inspection ingestion domain first.
4. Scaffold frontend (Vite + React + TS) consuming mock API for inspection uploads/results, then wire real endpoints.
5. Add CI: linting, typing, formatting, and test runs for both frontend and backend.
6. Define data retention and backup plan for inspection documents and generated recommendations.

## License
TBD.
