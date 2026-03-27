from __future__ import annotations

from datetime import date, datetime, time, timedelta, timezone
from typing import Any


DEMO_MEDICINES: list[dict[str, Any]] = [
    {
        "id": "demo-med-1",
        "user_id": "demo-user",
        "name": "Metformin",
        "dosage": "500mg",
        "schedule": [{"time": "08:00", "label": "Morning"}],
        "is_active": True,
        "color": "teal",
        "shape": "round",
        "image_url": "/medicine-label.svg",
    }
]

DEMO_DOSE_LOGS: list[dict[str, Any]] = []


def current_day(reference: datetime | None = None) -> date:
    moment = reference or datetime.now(timezone.utc)
    return moment.astimezone(timezone.utc).date()


def day_window_for_date(day: date) -> tuple[datetime, datetime]:
    start = datetime.combine(day, time.min, tzinfo=timezone.utc)
    return start, start + timedelta(days=1)


def parse_schedule_time(value: str) -> time:
    text = value.strip()
    for fmt in ("%H:%M", "%H:%M:%S"):
      try:
          return datetime.strptime(text, fmt).time()
      except ValueError:
          pass
    parsed = time.fromisoformat(text)
    return parsed.replace(tzinfo=None) if parsed.tzinfo else parsed


def scheduled_at_for_day(day: date, value: str) -> datetime:
    return datetime.combine(day, parse_schedule_time(value), tzinfo=timezone.utc)


def build_dose_rows_for_medicine(medicine: dict[str, Any], user_id: str, day: date | None = None) -> list[dict[str, Any]]:
    target_day = day or current_day()
    rows: list[dict[str, Any]] = []
    for entry in medicine.get("schedule") or []:
        time_value = entry.get("time")
        if not time_value:
            continue
        rows.append(
            {
                "medicine_id": medicine["id"],
                "user_id": user_id,
                "scheduled_at": scheduled_at_for_day(target_day, str(time_value)).isoformat(),
                "taken_at": None,
                "status": "pending",
            }
        )
    return rows


def _parse_iso_datetime(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def _demo_existing_keys(user_id: str, day: date) -> set[tuple[str, str]]:
    start, end = day_window_for_date(day)
    existing: set[tuple[str, str]] = set()
    for row in DEMO_DOSE_LOGS:
        if row["user_id"] != user_id:
            continue
        scheduled_at = _parse_iso_datetime(row["scheduled_at"])
        if start <= scheduled_at < end:
            existing.add((row["medicine_id"], row["scheduled_at"]))
    return existing


def ensure_demo_today_dose_logs(
    user_id: str,
    medicines: list[dict[str, Any]] | None = None,
    day: date | None = None,
) -> list[dict[str, Any]]:
    target_day = day or current_day()
    candidate_medicines = medicines if medicines is not None else [m for m in DEMO_MEDICINES if m["user_id"] == user_id and m.get("is_active", True)]
    existing = _demo_existing_keys(user_id, target_day)
    inserted: list[dict[str, Any]] = []

    for medicine in candidate_medicines:
        if medicine.get("user_id") != user_id or not medicine.get("is_active", True):
            continue
        for row in build_dose_rows_for_medicine(medicine, user_id, target_day):
            key = (row["medicine_id"], row["scheduled_at"])
            if key in existing:
                continue
            DEMO_DOSE_LOGS.append(row)
            existing.add(key)
            inserted.append(row)

    return inserted


def demo_today_dose_rows(user_id: str, day: date | None = None) -> list[dict[str, Any]]:
    target_day = day or current_day()
    ensure_demo_today_dose_logs(user_id, day=target_day)
    start, end = day_window_for_date(target_day)
    medicine_lookup = {
        medicine["id"]: medicine
        for medicine in DEMO_MEDICINES
        if medicine["user_id"] == user_id and medicine.get("is_active", True)
    }
    rows: list[dict[str, Any]] = []

    for log in DEMO_DOSE_LOGS:
        if log["user_id"] != user_id:
            continue
        scheduled_at = _parse_iso_datetime(log["scheduled_at"])
        if not (start <= scheduled_at < end):
            continue
        medicine = medicine_lookup.get(log["medicine_id"])
        if not medicine:
            continue
        rows.append(
            {
                **log,
                "medicines": {
                    "name": medicine["name"],
                    "dosage": medicine["dosage"],
                    "image_url": medicine.get("image_url", ""),
                },
            }
        )

    rows.sort(key=lambda row: row["scheduled_at"])
    return rows


def demo_take_dose(user_id: str, medicine_id: str, scheduled_at: datetime) -> dict[str, Any]:
    scheduled_key = scheduled_at.isoformat()
    for row in DEMO_DOSE_LOGS:
        if row["user_id"] == user_id and row["medicine_id"] == medicine_id and row["scheduled_at"] == scheduled_key:
            row["status"] = "taken"
            row["taken_at"] = datetime.now(timezone.utc).isoformat()
            return row
    raise LookupError("Dose log not found")


def ensure_supabase_today_dose_logs(
    client: Any,
    user_id: str,
    medicines: list[dict[str, Any]] | None = None,
    day: date | None = None,
) -> list[dict[str, Any]]:
    target_day = day or current_day()
    start, end = day_window_for_date(target_day)
    candidate_medicines = medicines
    if candidate_medicines is None:
        candidate_medicines = (
            client.table("medicines")
            .select("id,user_id,schedule,name,dosage,image_url,is_active")
            .eq("user_id", user_id)
            .eq("is_active", True)
            .execute()
            .data
        )

    existing_rows = (
        client.table("dose_logs")
        .select("medicine_id,scheduled_at")
        .eq("user_id", user_id)
        .gte("scheduled_at", start.isoformat())
        .lt("scheduled_at", end.isoformat())
        .execute()
        .data
    )
    existing = {(row["medicine_id"], row["scheduled_at"]) for row in existing_rows}
    missing: list[dict[str, Any]] = []

    for medicine in candidate_medicines:
        if medicine.get("user_id") != user_id or not medicine.get("is_active", True):
            continue
        for row in build_dose_rows_for_medicine(medicine, user_id, target_day):
            key = (row["medicine_id"], row["scheduled_at"])
            if key in existing:
                continue
            missing.append(row)
            existing.add(key)

    if missing:
        client.table("dose_logs").insert(missing).execute()

    return missing
