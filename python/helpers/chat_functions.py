import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = os.getenv("GROQ_API_URL")
MAX_HISTORY_LENGTH = 20

headers = {
    'Authorization': f'Bearer {GROQ_API_KEY}',
    'Content-Type': 'application/json'
}

CHAT_LOG_DIR = "chat_logs"
os.makedirs(CHAT_LOG_DIR, exist_ok=True)

def remove_duplicates(text):
    lines = text.split("\n")
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