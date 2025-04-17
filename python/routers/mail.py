from fastapi import APIRouter, HTTPException
from models.mail_model import SessionRequest
from helpers.mail_functions import send_email
import os
from dotenv import load_dotenv
load_dotenv()
IP_ADDRESS = os.getenv("IP_ADDRESS")

router = APIRouter()

@router.get("/accept/{user_email}")
async def accept_session(user_email: str):
    subject = "✅ Session Confirmed"
    body = "Your session request has been accepted! 🎉"

    if send_email(user_email, subject, body):
        return {"message": f"Confirmation email sent to {user_email}"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send confirmation email")

@router.get("/reject/{user_email}")
async def reject_session(user_email: str):
    subject = "❌ Session Declined"
    body = "Unfortunately, your session request has been declined."

    if send_email(user_email, subject, body):
        return {"message": f"Rejection email sent to {user_email}"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send rejection email")

@router.post("/request-session")
async def request_session(request: SessionRequest):
    try:
        user_email = request.user_email
        psychologist_email = request.psychologist_email
        session_details = request.session_details

        accept_url = f"{IP_ADDRESS}:5005/accept/{user_email}"
        reject_url = f"{IP_ADDRESS}:5005/reject/{user_email}"

        email_body = f'''
        <h2>Session Request</h2>
        <p>A user wants to schedule a session.</p>
        <p><b>User Email:</b> {user_email}</p>
        <p><b>Session Details:</b> {session_details}</p>
        <br>
        <p>Please confirm or decline the request:</p>
        <a href="{accept_url}" style="padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none;">Accept</a>
        <a href="{reject_url}" style="padding: 10px 20px; background-color: #dc3545; color: #fff; text-decoration: none; margin-left: 10px;">Reject</a>
        '''
        if send_email(psychologist_email, "New Session Request", email_body):
            return {"message": "Session request sent successfully. Waiting for the response."}
        else:
            raise HTTPException(status_code=500, detail="Failed to send session request email")
    except Exception as e:
        print(f"Some error occurred: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the request")
