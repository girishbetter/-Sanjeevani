from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel

from database.supabase_client import get_supabase_client, supabase_configured
from services.claude_service import generate_insights

router = APIRouter(prefix="/ai", tags=["ai"])


class InsightRequest(BaseModel):
    user_id: str


def _auth_user_id(request: Request) -> str:
    uid = getattr(request.state, "user_id", None)
    if not uid:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return uid


@router.post("/insights")
def ai_insights(payload: InsightRequest, request: Request, auth_user_id: str = Depends(_auth_user_id)):
    user_id = payload.user_id if payload.user_id == auth_user_id else auth_user_id
    if not supabase_configured():
        return {"insights": ["Great consistency this week.", "Set evening reminder 15 minutes earlier.", "Keep pill box near dinner table."]}
    try:
        rows = (
            get_supabase_client()
            .table("dose_logs")
            .select("scheduled_at,status,taken_at,medicine_id")
            .eq("user_id", user_id)
            .order("scheduled_at", desc=True)
            .limit(120)
            .execute()
            .data
        )
        return {"insights": generate_insights(rows)}
    except Exception:
        # Graceful fallback prevents frontend 500 crash when external services are unavailable.
        return {"insights": ["Could not fetch live AI insights right now.", "Please try again in a moment.", "Medication reminders continue to work normally."]}
