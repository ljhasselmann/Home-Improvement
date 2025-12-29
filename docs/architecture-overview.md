# Architecture Overview

This document captures a starting point for the application's architecture. It can evolve as the product matures. The initial MVP delivery focuses on inspection report uploads that produce prioritized project recommendations with simple cost ranges and contractor guidance.

## System Components
- **Frontend (React + TypeScript)**
  - Vite-based setup with feature-based folders (projects, tasks, budgets, documents, vendors).
  - React Query for data fetching/caching; React Router for navigation; component library (MUI) for accessibility and speed.
  - Form helpers (React Hook Form + Zod) to standardize validation.
- **Inspection Ingestion & Intelligence**
  - Upload pipeline accepts PDFs/images, performs OCR/text extraction, and maps findings to structured issue types (safety, maintenance, cosmetic).
  - Scoring engine ranks items by severity/urgency and classifies DIY vs. contractor-required work; plugs into cost estimation APIs based on location/job type.
- **Backend (FastAPI)**
  - Layered modules: `api` (routers), `services` (business logic), `schemas` (Pydantic models), `db` (SQLAlchemy/SQLModel), `auth`, and `workers` (Celery tasks).
  - OpenAPI docs generated from routes; versioned API prefix (e.g., `/api/v1`).
  - Background jobs for reminders, document scanning, and scheduled notifications.
- **Data Layer**
  - PostgreSQL for relational data (projects, tasks, budgets, expenses, vendors, documents metadata).
  - Object storage (S3-compatible) for file uploads; signed URLs for access.
  - Redis for caching/session and Celery broker.

## Domain Model (initial)
- **Project**: id, title, description, photos, status, start/end dates, budget target, categories.
- **Task**: id, project_id, title, description, status, assignee, start/end dates, dependencies.
- **Budget Category**: id, project_id, name, planned_amount.
- **Expense**: id, project_id, category_id, type (quote/invoice/payment), vendor, amount, tax, status, due_date, paid_date.
- **Vendor**: id, project_id, name, contacts, contract details, insurance/permit artifacts.
- **Document**: id, project_id, category_id (optional), task_id (optional), file_url, tags, checksum, uploaded_by.
- **Inspection Finding**: id, project_id, source_document_id, severity, category (safety/maintenance/cosmetic), recommended_action, contractor_required (bool), estimated_cost_low/high, location_context.
- **User**: id, name, email, role (owner, collaborator), invite status.

## Cross-Cutting Concerns
- **Auth & RBAC**: JWT access/refresh tokens, project-level roles, and permission checks in services and routers.
- **Validation**: Pydantic schemas and Zod schemas kept in sync via OpenAPI or codegen.
- **Observability**: Structured logging (JSON), request/response logging with privacy filters, and metrics (Prometheus).
- **Testing**: Unit tests for services, API tests with test DB, frontend component tests, and contract tests for critical endpoints.

## Deployment Approach
- Docker Compose for local dev; environment parity with staging/production.
- GitHub Actions pipeline: lint, type-check, test, build artifacts (frontend), and publish Docker images.
- Environment variables managed via `.env` templates; secrets stored in CI/CD vault or cloud secret manager.

## Open Questions
- Payment integrations (if any) vs. manual entry only.
- Calendar integration for tasks (Google/ICS) and notification channels (email vs. push).
- Offline/document sync requirements.
