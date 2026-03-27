from fastapi import APIRouter, Depends, HTTPException, Request, status

from database.supabase_client import get_supabase_client
from models.medicine import MedicineCreate, MedicineUpdate

router = APIRouter(prefix="/medicines", tags=["medicines"])


def _user_id(request: Request) -> str:
    uid = getattr(request.state, "user_id", None)
    if not uid:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return uid


@router.get("")
def list_medicines(request: Request, user_id: str = Depends(_user_id)):
    response = get_supabase_client().table("medicines").select("*").eq("user_id", user_id).eq("is_active", True).execute()
    return response.data


@router.post("", status_code=status.HTTP_201_CREATED)
def create_medicine(payload: MedicineCreate, request: Request, user_id: str = Depends(_user_id)):
    row = payload.model_dump() | {"user_id": user_id}
    response = get_supabase_client().table("medicines").insert(row).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create medicine")
    return response.data[0]


@router.put("/{medicine_id}")
def update_medicine(medicine_id: str, payload: MedicineUpdate, request: Request, user_id: str = Depends(_user_id)):
    response = get_supabase_client().table("medicines").update(payload.model_dump(exclude_none=True)).eq("id", medicine_id).eq("user_id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return response.data[0]


@router.delete("/{medicine_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_medicine(medicine_id: str, request: Request, user_id: str = Depends(_user_id)):
    get_supabase_client().table("medicines").update({"is_active": False}).eq("id", medicine_id).eq("user_id", user_id).execute()
    return None
