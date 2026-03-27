import uuid

from fastapi import APIRouter, Depends, HTTPException, Request, status

from database.supabase_client import get_supabase_client, supabase_configured
from models.medicine import MedicineCreate, MedicineUpdate
from services.dose_sync import DEMO_MEDICINES, ensure_demo_today_dose_logs, ensure_supabase_today_dose_logs

router = APIRouter(prefix="/medicines", tags=["medicines"])


def _user_id(request: Request) -> str:
    uid = getattr(request.state, "user_id", None)
    if not uid:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return uid


def _find_demo_medicine_index(medicine_id: str, user_id: str) -> int | None:
    for index, medicine in enumerate(DEMO_MEDICINES):
        if medicine["id"] == medicine_id and medicine["user_id"] == user_id:
            return index
    return None


@router.get("")
def list_medicines(request: Request, user_id: str = Depends(_user_id)):
    if not supabase_configured():
        return [medicine for medicine in DEMO_MEDICINES if medicine["user_id"] == user_id and medicine.get("is_active", True)]
    response = get_supabase_client().table("medicines").select("*").eq("user_id", user_id).eq("is_active", True).execute()
    return response.data


@router.post("", status_code=status.HTTP_201_CREATED)
def create_medicine(payload: MedicineCreate, request: Request, user_id: str = Depends(_user_id)):
    if not supabase_configured():
        medicine = payload.model_dump() | {
            "id": f"demo-med-{uuid.uuid4().hex[:8]}",
            "user_id": user_id,
            "is_active": True,
        }
        DEMO_MEDICINES.append(medicine)
        ensure_demo_today_dose_logs(user_id, [medicine])
        return medicine
    supabase = get_supabase_client()
    row = payload.model_dump() | {"user_id": user_id}
    response = supabase.table("medicines").insert(row).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create medicine")
    created = response.data[0]
    ensure_supabase_today_dose_logs(supabase, user_id, [created])
    return created


@router.put("/{medicine_id}")
def update_medicine(medicine_id: str, payload: MedicineUpdate, request: Request, user_id: str = Depends(_user_id)):
    if not supabase_configured():
        index = _find_demo_medicine_index(medicine_id, user_id)
        if index is None:
            raise HTTPException(status_code=404, detail="Medicine not found")
        updated = DEMO_MEDICINES[index] | payload.model_dump(exclude_none=True)
        updated["id"] = medicine_id
        updated["user_id"] = user_id
        DEMO_MEDICINES[index] = updated
        ensure_demo_today_dose_logs(user_id, [updated])
        return updated
    supabase = get_supabase_client()
    response = supabase.table("medicines").update(payload.model_dump(exclude_none=True)).eq("id", medicine_id).eq("user_id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Medicine not found")
    updated = response.data[0]
    ensure_supabase_today_dose_logs(supabase, user_id, [updated])
    return updated


@router.delete("/{medicine_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_medicine(medicine_id: str, request: Request, user_id: str = Depends(_user_id)):
    if not supabase_configured():
        index = _find_demo_medicine_index(medicine_id, user_id)
        if index is not None:
            DEMO_MEDICINES.pop(index)
        return None
    get_supabase_client().table("medicines").update({"is_active": False}).eq("id", medicine_id).eq("user_id", user_id).execute()
    return None
