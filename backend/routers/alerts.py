from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel

from database.supabase_client import get_supabase_client
from services.notification_svc import send_push_notification

router = APIRouter(prefix="/alerts", tags=["alerts"])


class AlertRequest(BaseModel):
    patient_id: str
    caretaker_id: str | None = None
    type: str
    message: str


def _user_id(request: Request) -> str:
    uid = getattr(request.state, "user_id", None)
    if not uid:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return uid


@router.post("/caretaker", status_code=status.HTTP_201_CREATED)
def alert_caretaker(payload: AlertRequest, request: Request, _: str = Depends(_user_id)):
    response = get_supabase_client().table("alerts").insert(payload.model_dump()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Could not create alert")
    if payload.caretaker_id:
        send_push_notification(payload.caretaker_id, "Sanjeevni Alert", payload.message)
    return response.data[0]


@router.get("/feed")
def alerts_feed(patient_id: str, request: Request, _: str = Depends(_user_id)):
    response = get_supabase_client().table("alerts").select("*").eq("patient_id", patient_id).order("created_at", desc=True).execute()
    return response.data
