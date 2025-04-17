
from fastapi import APIRouter
from models.negative_model import SendMessageRequest
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

router = APIRouter()

@router.post("/send_message")
async def send_message(data: SendMessageRequest):
    sentiment_score = sia.polarity_scores(data.message)['compound']
    if sentiment_score < 0:
        return {
            "message": "Negative messages are not allowed in the community. Please rephrase your message.",
            "score": sentiment_score
        }
    return {
        "message": "Message sent successfully.",
        "score": sentiment_score
    }