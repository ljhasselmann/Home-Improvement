PYTHON?=python3
PIP?=pip

.PHONY: install-backend install-frontend lint-backend lint-frontend type-backend test-backend dev-backend dev-frontend compose-up compose-down

install-backend:
cd backend && $(PIP) install -e .[dev]

install-frontend:
cd frontend && npm install

lint-backend:
cd backend && ruff check app && black --check app

lint-frontend:
cd frontend && npm run lint

type-backend:
cd backend && mypy app

test-backend:
cd backend && pytest

dev-backend:
cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend:
cd frontend && npm run dev -- --host 0.0.0.0 --port 5173

compose-up:
cd infrastructure && docker compose up --build

compose-down:
cd infrastructure && docker compose down --volumes
