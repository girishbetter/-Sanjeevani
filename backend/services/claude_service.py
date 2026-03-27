import os

from anthropic import Anthropic


def generate_insights(payload: list[dict]) -> list[str]:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return ["Add ANTHROPIC_API_KEY to enable AI insights."]

    client = Anthropic(api_key=api_key)
    prompt = (
        "Analyze this elderly patient medication adherence data and give "
        "3 short actionable insights in simple language. "
        "Each insight max 15 words.\n\n"
        f"Data:\n{payload}"
    )
    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=220,
        messages=[{"role": "user", "content": prompt}],
    )
    text = msg.content[0].text if msg.content else ""
    lines = [line.strip("- ").strip() for line in text.splitlines() if line.strip()]
    return lines[:3] if lines else ["Take medicines at fixed times and avoid missing evening doses."]
