import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load environment variables
load_dotenv()

# Email Configuration
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")  # Your email
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")  # Your email password or app-specific password

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for all routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for session request
class SessionRequest(BaseModel):
    user_email: str
    psychologist_email: str
    session_details: str

# Function to send an email
def send_email(to_email: str, subject: str, body: str) -> bool:
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return False

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Hello"}

# Accept Session Endpoint
@app.get("/accept/{user_email}")
async def accept_session(user_email: str):
    subject = "✅ Session Confirmed"
    body = "Your session request has been accepted! 🎉"

    if send_email(user_email, subject, body):
        return {"message": f"Confirmation email sent to {user_email}"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send confirmation email")

# Reject Session Endpoint
@app.get("/reject/{user_email}")
async def reject_session(user_email: str):
    subject = "❌ Session Declined"
    body = "Unfortunately, your session request has been declined."

    if send_email(user_email, subject, body):
        return {"message": f"Rejection email sent to {user_email}"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send rejection email")

# Send Session Request Email
@app.post("/request-session")
async def request_session(request: SessionRequest):
    try:
        user_email = request.user_email
        psychologist_email = request.psychologist_email
        session_details = request.session_details

        accept_url = f"http://192.168.198.209:5005/accept/{user_email}"
        reject_url = f"http://192.168.198.209:5005/reject/{user_email}"

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
