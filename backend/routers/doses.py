from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request

from database.supabase_client import get_supabase_client
from models.dose import DoseTakeRequest

router = APIRouter(prefix="/doses", tags=["doses"])


def _user_id(request: Request) -> str:
    uid = getattr(request.state, "user_id", None)
    if not uid:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return uid


@router.get("/today")
def doses_today(request: Request, user_id: str = Depends(_user_id)):
    start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=1)
    q = (
        get_supabase_client()
        .table("dose_logs")
        .select("*, medicines(name, dosage, image_url)")
        .eq("user_id", user_id)
        .gte("scheduled_at", start.isoformat())
        .lt("scheduled_at", end.isoformat())
        .order("scheduled_at")
        .execute()
    )
    return q.data


@router.post("/take")
def take_dose(payload: DoseTakeRequest, request: Request, user_id: str = Depends(_user_id)):
    now = datetime.now(timezone.utc).isoformat()
    supabase = get_supabase_client()
    updated = (
        supabase.table("dose_logs")
        .update({"status": "taken", "taken_at": now})
        .eq("medicine_id", payload.medicine_id)
        .eq("user_id", user_id)
        .eq("scheduled_at", payload.scheduled_at.isoformat())
        .execute()
    )
    if not updated.data:
        raise HTTPException(status_code=404, detail="Dose log not found")
    supabase.rpc("increment_points_and_streak", {"p_user_id": user_id, "p_points": 10}).execute()
    return {"ok": True, "dose_log": updated.data[0]}
