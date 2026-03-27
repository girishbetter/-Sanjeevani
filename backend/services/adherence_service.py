from collections import defaultdict
from datetime import datetime, timedelta, timezone


def calculate_summary(rows: list[dict]) -> dict:
    total = len(rows)
    taken = sum(1 for r in rows if r.get("status") == "taken")
    missed = sum(1 for r in rows if r.get("status") == "missed")
    adherence_pct = round((taken / total) * 100, 2) if total else 0
    return {
        "adherence_pct": adherence_pct,
        "taken_count": taken,
        "missed_count": missed,
        "total_count": total,
    }


def build_heatmap(rows: list[dict], days: int = 30) -> list[dict]:
    now = datetime.now(timezone.utc).date()
    by_date = defaultdict(list)
    for row in rows:
        date_key = datetime.fromisoformat(row["scheduled_at"].replace("Z", "+00:00")).date()
        by_date[str(date_key)].append(row)

    data = []
    for i in range(days):
        d = now - timedelta(days=days - i - 1)
        key = str(d)
        entries = by_date.get(key, [])
        total = len(entries)
        taken = sum(1 for e in entries if e.get("status") == "taken")
        pct = round((taken / total) * 100, 2) if total else 0
        data.append({"date": key, "adherence_pct": pct, "taken": taken, "total": total})
    return data


def build_weekly(rows: list[dict]) -> list[dict]:
    heat = build_heatmap(rows, days=7)
    return [{"day": h["date"], "adherence_pct": h["adherence_pct"]} for h in heat]
