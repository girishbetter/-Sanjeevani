from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel

from database.supabase_client import get_supabase_client, supabase_configured
from services.notification_svc import send_sms_notification

router = APIRouter(prefix="/alerts", tags=["alerts"])


class AlertRequest(BaseModel):
    patient_id: str
    caretaker_phone: str | None = None  # E.164 format, e.g. +91...
    type: str
    message: str


def _user_id(request: Request) -> str:
    uid = getattr(request.state, "user_id", None)
    if not uid:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return uid


@router.post("/caretaker", status_code=status.HTTP_201_CREATED)
def alert_caretaker(payload: AlertRequest, request: Request, _: str = Depends(_user_id)):
    if not supabase_configured():
        return {"id": "demo-alert", **payload.model_dump(), "read": False}

    supabase = get_supabase_client()

    # If caretaker phone is provided, send SMS directly; otherwise look up all active caretakers for the patient.
    if payload.caretaker_phone:
        db_payload = {
            "patient_id": payload.patient_id,
            "type": payload.type,
            "message": payload.message,
            "caretaker_id": None,
        }
        response = supabase.table("alerts").insert(db_payload).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="Could not create alert")
        try:
            send_sms_notification(payload.caretaker_phone, payload.message)
        except Exception:
            pass
        return response.data[0]

    caretakers = (
        supabase.table("caretakers")
        .select("id, phone")
        .eq("patient_id", payload.patient_id)
        .eq("is_active", True)
        .execute()
        .data
        or []
    )

    created = []
    if not caretakers:
        response = supabase.table("alerts").insert(
            {"patient_id": payload.patient_id, "type": payload.type, "message": payload.message, "caretaker_id": None}
        ).execute()
        if response.data:
            created.append(response.data[0])
    else:
        for c in caretakers:
            response = supabase.table("alerts").insert(
                {"patient_id": payload.patient_id, "caretaker_id": c["id"], "type": payload.type, "message": payload.message}
            ).execute()
            if response.data:
                created.append(response.data[0])
            phone = c.get("phone")
            if phone:
                try:
                    send_sms_notification(phone, payload.message)
                except Exception:
                    pass

    if not created:
        raise HTTPException(status_code=400, detail="Could not create alert")
    return created[0]


@router.get("/feed")
def alerts_feed(patient_id: str, request: Request, _: str = Depends(_user_id)):
    if not supabase_configured():
        return [{"id": "demo-alert-1", "patient_id": patient_id, "type": "sos", "message": "SOS alert from the patient screen", "read": False}]
    response = get_supabase_client().table("alerts").select("*").eq("patient_id", patient_id).order("created_at", desc=True).execute()
    return response.data
