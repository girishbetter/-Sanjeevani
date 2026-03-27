from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])


class VerifyRequest(BaseModel):
    token: str


@router.post("/verify-token")
def verify_token(payload: VerifyRequest):
    # Actual verification is handled by middleware + Supabase auth endpoint.
    return {"valid": bool(payload.token)}
