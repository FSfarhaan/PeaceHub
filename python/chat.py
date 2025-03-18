from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
import os
import uuid
import re

GROQ_API_KEY = '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'
GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
MAX_HISTORY_LENGTH = 10


headers = {
    'Authorization': f'Bearer {GROQ_API_KEY}',
    'Content-Type': 'application/json'
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

CHAT_LOG_DIR = "chat_logs"
os.makedirs(CHAT_LOG_DIR, exist_ok=True)

class Message(BaseModel):
    session_id: str | None = None
    user_input: str

def remove_duplicates(text):
    lines = text.split("\n")  # Split into lines
    seen = set()
    cleaned_text = []
    
    for line in lines:
        if line.strip() not in seen:
            seen.add(line.strip())
            cleaned_text.append(line)
    
    return "\n".join(cleaned_text)

def trim_chat_history(chat_history):
    return chat_history[-MAX_HISTORY_LENGTH:]

def get_response_from_groq(messages):
    payload = {
        'model': 'llama3-70b-8192',
        'messages': messages
    }
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=10)
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            error_message = response.json().get('error', {}).get('message', 'Unknown error')
            return f'Something went wrong: {error_message} (Status code: {response.status_code})'
    except requests.exceptions.Timeout:
        return 'The request timed out. Please try again later.'
    except requests.exceptions.RequestException as e:
        return f'Network error: {e}'


def load_chat_history(session_id):
    filepath = os.path.join(CHAT_LOG_DIR, f"{session_id}.json")
    if os.path.exists(filepath):
        with open(filepath, "r") as file:
            return json.load(file)
    return []


def save_chat_history(session_id, messages):
    filepath = os.path.join(CHAT_LOG_DIR, f"{session_id}.json")
    with open(filepath, "w") as file:
        json.dump(messages, file)


@app.post("/chat/")
async def chat(message: Message):
    session_id = message.session_id or str(uuid.uuid4())
    chat_history = load_chat_history(session_id)
    chat_history = trim_chat_history(chat_history)

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


@app.get("/session/{session_id}")
async def get_session_history(session_id: str):
    chat_history = load_chat_history(session_id)
    if not chat_history:
        raise HTTPException(status_code=404, detail="Session not found.")
    return {"session_id": session_id, "messages": chat_history}


# To run the app, save this file and run: uvicorn filename:app --reload
# Example usage:
# POST /chat/
# {
#     "user_input": "Hey, how are you?",
#     "session_id": null
# }

# GET /session/{session_id} -> Retrieve chat history for a session