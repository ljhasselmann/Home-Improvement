# Implementation Plan

This plan translates the proposed stack into hands-on steps for the first development iterations. It focuses on scaffolding the FastAPI + React/TypeScript stack, establishing CI, and delivering the first inspection-ingestion vertical slice (upload → prioritize → cost estimate).

## Phase 0 — Foundations (Week 1)
- **Repository structure**: Create `frontend/`, `backend/`, `infrastructure/`, and `docs/` roots with shared lint/format config.
- **Tooling**: Prettier + ESLint for frontend; Ruff + Black + MyPy for backend; commit hooks via pre-commit.
- **Infrastructure**: Docker Compose with PostgreSQL, Redis, MinIO (S3-compatible), and app services; `.env.example` for configuration.
- **CI**: GitHub Actions workflow running lint, type checks, and tests for backend and frontend; build frontend artifact.

### Phase 0 checklist
- **Metadata**: Add `LICENSE`, `CODEOWNERS`, and issue/PR templates; document required Node/PNPM and Python versions.
- **Pre-commit**: Configure `.pre-commit-config.yaml` to run formatters, linters, and security checks locally before commit.
- **Backend bootstrap**: Create `backend/pyproject.toml` with FastAPI, SQLModel/SQLAlchemy, Uvicorn, Pydantic settings, and testing dependencies; add `backend/.env.example`.
- **Frontend bootstrap**: Initialize Vite + React + TypeScript in `frontend/` with ESLint/Prettier wired to repo-wide config; add `frontend/.env.example` for API base URL.
- **Docker Compose**: Draft `infrastructure/docker-compose.yml` to launch Postgres, Redis, MinIO, and placeholder frontend/backend services; include seed volumes and healthchecks.
- **Make/NPM scripts**: Add `Makefile` targets or npm scripts for `lint`, `format`, `type-check`, `test`, `dev`, and `compose-up/down` to simplify local workflows.
- **CI bootstrap**: Commit a starter GitHub Actions workflow (`.github/workflows/ci.yml`) that installs deps, runs lint/type/test for backend and frontend, and builds the frontend.
- **Docs**: Expand `README.md` quickstart with "install deps", "run compose", and "lint/type/test" commands; include troubleshooting for common local setup issues.

## Phase 1 — Backend Scaffold for Inspection Ingestion (Week 1–2)
- **FastAPI app**: `backend/app/main.py` with versioned router prefix `/api/v1` and OpenAPI docs enabled.
- **Dependencies**: SQLModel or SQLAlchemy + Alembic migrations; Pydantic settings for config; authentication dependencies.
- **Auth**: JWT access + refresh tokens, password hashing, simple invite-based collaborator model.
- **Domain models**: Seed models and schemas for `User`, `InspectionDocument`, and `InspectionFinding` with basic CRUD/services.
- **Services**: Layered structure (`api`, `services`, `schemas`, `db`, `workers`); upload endpoint to store files, enqueue OCR task, and return job status; parsing service for structured findings, severity, DIY/contractor flag, and cost range estimate stub.
- **Testing**: Pytest with a SQLite-in-memory test DB; fixtures for auth and sample inspection data.

## Phase 2 — Frontend Scaffold for Upload Flow (Week 2)
- **Vite + React + TypeScript**: Initialize `frontend/` with routing, global theme, and React Query provider.
- **Auth shell**: Sign-in page, protected routes, and mock auth client; later swap for real tokens.
- **Inspection upload UI**: Drag-and-drop/upload widget with validation; status/progress indicator; results view showing prioritized recommendations with severity, cost ranges, and contractor guidance.
- **Testing**: Vitest + Testing Library for components; lint/type checks in CI.

## Phase 3 — Vertical Slice Hardening (Week 3)
- **Backend enhancements**: Improve OCR/parsing heuristics; add location input for cost ranges; expose confidence scores.
- **Frontend polish**: Allow reordering/overrides of priority and contractor flag; add download/export (PDF/CSV) for summary.
- **Data**: Seed with example inspection reports and sample output for demos.

## Cross-Cutting Tasks
- **Observability**: Structured logging middleware; basic Prometheus metrics; request ID propagation.
- **Security**: Input validation, size limits on uploads, signed URLs for document access, and role-based checks in services.
- **Data governance**: Backup/retention policy for inspection documents and generated recommendations; environment-specific buckets.
- **DX**: Makefile/NPM scripts for common commands; sample data loader for demo environment.

## Deliverables Checklist
- [ ] Backend FastAPI app with auth, inspection upload endpoint, OCR/parsing stub, and prioritized findings response with cost ranges and contractor guidance.
- [ ] Frontend shell with authentication flow plus inspection upload/results experience using mock or live API.
- [ ] Docker Compose that starts all dependencies and both app services locally.
- [ ] CI workflow running lint/type/test for frontend and backend.
