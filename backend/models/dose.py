from datetime import datetime

from pydantic import BaseModel


class DoseTakeRequest(BaseModel):
    medicine_id: str
    scheduled_at: datetime


class DoseLogResponse(BaseModel):
    id: str
    medicine_id: str
    user_id: str
    scheduled_at: datetime
    taken_at: datetime | None
    status: str
