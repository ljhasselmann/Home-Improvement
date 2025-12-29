# Backend

This directory will hold the FastAPI service with modular routers, services, schemas, and background jobs. It should share linting and formatting conventions defined at the repository root.

Planned substructure (as the service is scaffolded):
- `app/` for FastAPI application code (routers, models, services, dependencies).
- `alembic/` for database migrations if using Alembic/SQLModel.
- `tests/` for API and service tests.
- `scripts/` for local tooling (e.g., data seeding, maintenance tasks).
