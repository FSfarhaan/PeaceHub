from pydantic import BaseModel

class Message(BaseModel):
    session_id: str | None = None
    user_input: str