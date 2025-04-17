from typing import List, Optional
from pydantic import BaseModel

class ChatbotInteraction(BaseModel):
    user_response: str

class AnalyzeRequest(BaseModel):
    data: List[List[Optional[float]]] 
    journal_entry: str
    chatbot_interactions: List[ChatbotInteraction]