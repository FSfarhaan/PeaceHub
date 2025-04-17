from fastapi import APIRouter
import uuid
from models.chat_model import Message
from helpers.chat_functions import load_chat_history, trim_chat_history, get_response_from_groq, remove_duplicates, save_chat_history
router = APIRouter()

@router.post("/chat")
async def chat(message: Message):
    session_id = message.session_id or str(uuid.uuid4())
    chat_history = load_chat_history(session_id)
    chat_history = trim_chat_history(chat_history)

    print(message)

    if message.user_input.lower() == 'exit':
        return {"response": "Before you go, remember to be kind to yourself. Take care! 💛", "session_id": session_id}

    if len(chat_history) == 0:
        chat_history.append({
            'role': 'system',
            'content': 'You are a compassionate and friendly assistant ready to chat and provide support. Dont give long responses, try to keep the message length small'
        })
    
    chat_history.append({'role': 'user', 'content': message.user_input})
    response = get_response_from_groq(chat_history)
    response_text = remove_duplicates(response)

    chat_history.append({'role': 'assistant', 'content': response_text})
    save_chat_history(session_id, chat_history)

    return {
        "response": response_text,
        "session_id": session_id
    }