from pydantic import BaseModel


class ProfileUpdate(BaseModel):
    full_name: str | None = None
    age: int | None = None
    language: str | None = None


class VerifyTokenRequest(BaseModel):
    token: str
