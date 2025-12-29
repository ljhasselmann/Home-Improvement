# Infrastructure

Docker Compose for local development of the Home Improvement Planner.

## Services
- `db`: PostgreSQL 16 with persistent volume.
- `cache`: Redis 7.
- `minio`: S3-compatible storage with console exposed on port 9001.
- `backend`: FastAPI app served by Uvicorn in reload mode.
- `frontend`: Vite dev server for the React app.

## Usage
Start the full stack:
```bash
make compose-up
```
Stop and remove containers/volumes:
```bash
make compose-down
```

Environment defaults are drawn from `backend/.env.example` and inline values in the Compose file.
