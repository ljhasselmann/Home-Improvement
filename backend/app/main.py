from fastapi import FastAPI

from . import api
from .config import Settings, get_settings


def create_app(settings: Settings | None = None) -> FastAPI:
    current_settings = settings or get_settings()
    app = FastAPI(
        title="Home Improvement Planner API",
        version="0.1.0",
        openapi_url="/api/v1/openapi.json",
        docs_url="/api/v1/docs",
    )

    api_router = api.router
    app.include_router(api_router, prefix="/api/v1")

    @app.get("/health", include_in_schema=False)
    async def root_healthcheck() -> dict[str, str]:
        return {"status": "ok", "environment": current_settings.app_env}

    return app


app = create_app()
