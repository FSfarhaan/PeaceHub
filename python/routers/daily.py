from fastapi import APIRouter
from models.daily_model import AnalyzeRequest
from helpers.daily_functions import process_daily_input

router = APIRouter()

@router.post("/analyze")
async def analyze(request_data: AnalyzeRequest):
    try:
        result = process_daily_input(
            request_data.data,
            request_data.journal_entry,
            request_data.chatbot_interactions
        )
        return result
    except Exception as e:
        return {"error": str(e)}
