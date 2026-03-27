from fastapi import APIRouter, Depends, HTTPException, Query, Request

from database.supabase_client import get_supabase_client, supabase_configured
from services.adherence_service import build_heatmap, build_weekly, calculate_summary

router = APIRouter(prefix="/adherence", tags=["adherence"])


def _user_id(request: Request) -> str:
    uid = getattr(request.state, "user_id", None)
    if not uid:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return uid


@router.get("/summary")
def summary(request: Request, user_id: str = Depends(_user_id)):
    if not supabase_configured():
        return {"adherence_pct": 88, "taken_count": 22, "missed_count": 3, "total_count": 25}
    rows = get_supabase_client().table("dose_logs").select("*").eq("user_id", user_id).execute().data
    return calculate_summary(rows)


@router.get("/heatmap")
def heatmap(request: Request, days: int = Query(default=30, ge=7, le=90), user_id: str = Depends(_user_id)):
    if not supabase_configured():
        return [{"date": f"day-{i+1}", "adherence_pct": 100 if i % 5 else 50, "taken": 2, "total": 2} for i in range(days)]
    rows = get_supabase_client().table("dose_logs").select("scheduled_at,status").eq("user_id", user_id).execute().data
    return build_heatmap(rows, days=days)


@router.get("/weekly")
def weekly(request: Request, user_id: str = Depends(_user_id)):
    if not supabase_configured():
        return [{"day": f"D{i+1}", "adherence_pct": 70 + i * 4} for i in range(7)]
    rows = get_supabase_client().table("dose_logs").select("scheduled_at,status").eq("user_id", user_id).execute().data
    return build_weekly(rows)
