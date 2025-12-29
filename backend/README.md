# Backend

FastAPI service for the Home Improvement Planner.

## Setup
1. Create and activate a virtual environment using Python 3.11+.
2. Install dependencies:
   ```bash
   pip install -e .[dev]
   ```
3. Copy `.env.example` to `.env` and adjust values as needed.

## Development
- Run the app locally:
  ```bash
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  ```
- Run tests:
  ```bash
  pytest
  ```
- Lint and format:
  ```bash
  ruff check app
  black app
  mypy app
  ```

## Notes
- API docs: http://localhost:8000/api/v1/docs
- Health check: http://localhost:8000/api/v1/health
