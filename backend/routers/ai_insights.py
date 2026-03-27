from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel

from database.supabase_client import get_supabase_client
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
