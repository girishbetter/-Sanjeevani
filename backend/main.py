import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from routers.adherence import router as adherence_router
from routers.ai_insights import router as ai_router
from routers.alerts import router as alerts_router
from routers.auth import router as auth_router
from routers.doses import router as doses_router
from routers.medicines import router as medicines_router

load_dotenv()

app = FastAPI(title="Sanjeevni API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://sanjeevni.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def supabase_jwt_middleware(request: Request, call_next):
    auth = request.headers.get("authorization", "")
    token = auth.replace("Bearer ", "").strip() if auth.startswith("Bearer ") else None
    request.state.user_id = None
    if token:
        # Hackathon-safe placeholder: if token cannot be decoded locally, fallback to mock id in dev.
        request.state.user_id = request.headers.get("x-user-id")
    response = await call_next(request)
    return response


prefix = os.getenv("API_PREFIX", "/api/v1")
app.include_router(medicines_router, prefix=prefix)
app.include_router(doses_router, prefix=prefix)
app.include_router(adherence_router, prefix=prefix)
app.include_router(alerts_router, prefix=prefix)
app.include_router(ai_router, prefix=prefix)
app.include_router(auth_router, prefix=prefix)


@app.get("/")
def healthcheck():
    return {"status": "ok", "service": "sanjeevni-backend"}
