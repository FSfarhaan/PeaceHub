from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import uvicorn

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

app = FastAPI()

# Allow all CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Data Models -----
class CreateCommunityRequest(BaseModel):
    community_name: str
    username: str
    role: str = "member"

class AddMemberRequest(BaseModel):
    community_name: str
    username: str
    role: str = "member"

class SendMessageRequest(BaseModel):
    message: str

class LeaveCommunityRequest(BaseModel):
    community_name: str
    username: str

class RemoveMemberRequest(BaseModel):
    community_name: str
    admin_username: str
    member_username: str

# ----- User and Community Classes -----
class User:
    def __init__(self, username, role="member"):
        self.username = username
        self.role = role

class Community:
    def __init__(self, name):
        self.name = name
        self.messages = []
        self.members = []
        self.load_messages()
        self.load_members()

    def add_member(self, user):
        if not any(member.username == user.username for member in self.members):
            self.members.append(user)
            self.save_members()
            return f"{user.username} added to the community as {user.role}."
        return f"User {user.username} is already a member of the community."

    def add_message(self, user, message):
        if any(member.username == user.username for member in self.members):
            self.messages.append(f"{user.username}: {message}")
            self.save_messages()
        else:
            return "User is not part of this community."

    def edit_message(self, username, message_index, new_message):
        if 0 <= message_index < len(self.messages):
            original_message = self.messages[message_index]
            if original_message.startswith(f"{username}:"):
                self.messages[message_index] = f"{username}: {new_message}"
                self.save_messages()
                return "Message updated successfully."
            else:
                return "You can only edit your own messages."
        return "Invalid message index."

    def delete_message(self, username, message_index):
        if 0 <= message_index < len(self.messages):
            original_message = self.messages[message_index]
            if original_message.startswith(f"{username}:"):
                self.messages.pop(message_index)
                self.save_messages()
                return "Message deleted successfully."
            else:
                return "You can only delete your own messages."
        return "Invalid message index."

    def leave_community(self, username):
        self.members = [member for member in self.members if member.username != username]
        self.save_members()
        return f"{username} has left the community."

    def remove_member(self, admin_username, member_username):
        admin = next((member for member in self.members if member.username == admin_username and member.role == 'admin'), None)
        if admin:
            self.members = [member for member in self.members if member.username != member_username]
            self.save_members()
            return f"{member_username} has been removed from the community."
        return "Only admins can remove members."

    def save_messages(self):
        with open(f"{self.name}_messages.json", "w") as file:
            json.dump(self.messages, file)

    def load_messages(self):
        try:
            with open(f"{self.name}_messages.json", "r") as file:
                self.messages = json.load(file)
        except FileNotFoundError:
            self.messages = []

    def save_members(self):
        with open(f"{self.name}_members.json", "w") as file:
            json.dump([member.__dict__ for member in self.members], file)

    def load_members(self):
        try:
            with open(f"{self.name}_members.json", "r") as file:
                members_data = json.load(file)
                self.members = [User(data['username'], data['role']) for data in members_data]
        except FileNotFoundError:
            self.members = []

# ----- In-memory storage -----
communities = {}

# ----- Routes -----
@app.post("/create_community")
async def create_community(data: CreateCommunityRequest):
    if data.community_name in communities:
        raise HTTPException(status_code=400, detail="Community already exists.")
    
    communities[data.community_name] = Community(data.community_name)
    user = User(data.username, data.role)
    communities[data.community_name].add_member(user)
    return {"message": f"Community '{data.community_name}' created and {data.username} joined as {data.role}."}

@app.post("/add_member")
async def add_member(data: AddMemberRequest):
    if data.community_name not in communities:
        raise HTTPException(status_code=404, detail="Community not found.")
    
    user = User(data.username, data.role)
    response = communities[data.community_name].add_member(user)
    return {"message": response}

@app.post("/send_message")
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

@app.post("/leave_community")
async def leave_community(data: LeaveCommunityRequest):
    if data.community_name not in communities:
        raise HTTPException(status_code=404, detail="Community not found.")
    
    response = communities[data.community_name].leave_community(data.username)
    return {"message": response}

@app.post("/remove_member")
async def remove_member(data: RemoveMemberRequest):
    if data.community_name not in communities:
        raise HTTPException(status_code=404, detail="Community not found.")
    
    response = communities[data.community_name].remove_member(data.admin_username, data.member_username)
    return {"message": response}

# ----- Uvicorn Runner (optional if using command line) -----
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
