from typing import Any

from pydantic import BaseModel, Field


class MedicineCreate(BaseModel):
    name: str = Field(min_length=1)
    dosage: str = Field(min_length=1)
    schedule: list[dict[str, Any]]
    color: str | None = None
    shape: str | None = None
    image_url: str | None = None


class MedicineUpdate(BaseModel):
    name: str | None = None
    dosage: str | None = None
    schedule: list[dict[str, Any]] | None = None
    color: str | None = None
    shape: str | None = None
    image_url: str | None = None
    is_active: bool | None = None
