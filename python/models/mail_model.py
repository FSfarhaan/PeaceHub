from pydantic import BaseModel

class SessionRequest(BaseModel):
    user_email: str
    psychologist_email: str
    session_details: str