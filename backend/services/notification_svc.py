import os

from twilio.rest import Client


def _get_twilio_client() -> Client:
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    if not account_sid or not auth_token:
        raise RuntimeError("Twilio not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.")
    return Client(account_sid, auth_token)


def send_sms_notification(phone_number: str, body: str) -> dict:
    """
    Send an SMS using Twilio. phone_number should be in E.164 format (e.g. +91xxxxxxxxxx).
    """
    from_number = os.getenv("TWILIO_FROM_NUMBER")
    if not from_number:
        raise RuntimeError("TWILIO_FROM_NUMBER is not set.")

    client = _get_twilio_client()
    msg = client.messages.create(to=phone_number, from_=from_number, body=body)
    return {"sid": msg.sid, "to": phone_number, "status": msg.status}
