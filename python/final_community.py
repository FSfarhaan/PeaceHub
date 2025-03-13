from flask import Flask, request, jsonify
import json
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

app = Flask(__name__)

sia = SentimentIntensityAnalyzer()

# User class
class User:
    def __init__(self, username, role="member"):
        self.username = username
        self.role = role

# Community class
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

# Global communities dictionary
communities = {}

@app.route('/create_community', methods=['POST'])
def create_community():
    data = request.json
    community_name = data['community_name']
    username = data['username']
    role = data.get('role', 'member')
    
    if community_name in communities:
        return jsonify({"message": "Community already exists."}), 400

    communities[community_name] = Community(community_name)
    user = User(username, role)
    communities[community_name].add_member(user)
    return jsonify({"message": f"Community '{community_name}' created and {username} joined as {role}."})

@app.route('/add_member', methods=['POST'])
def add_member():
    data = request.json
    community_name = data['community_name']
    username = data['username']
    role = data.get('role', 'member')
    
    if community_name not in communities:
        return jsonify({"message": "Community not found."}), 404
    
    user = User(username, role)
    response = communities[community_name].add_member(user)
    return jsonify({"message": response})

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    community_name = data['community_name']
    username = data['username']
    message = data['message']

    if community_name not in communities:
        return jsonify({"message": "Community not found."}), 404

    user = next((m for m in communities[community_name].members if m.username == username), None)
    if not user:
        return jsonify({"message": "User not found in the community."}), 404

    sentiment_score = sia.polarity_scores(message)['compound']
    if sentiment_score < 0:
        return jsonify({"message": "Negative messages are not allowed in the community. Please rephrase your message."}), 400

    response = communities[community_name].add_message(user, message)
    if response:
        return jsonify({"message": response}), 400
    return jsonify({"message": "Message sent successfully."})

@app.route('/leave_community', methods=['POST'])
def leave_community():
    data = request.json
    community_name = data['community_name']
    username = data['username']

    if community_name not in communities:
        return jsonify({"message": "Community not found."}), 404

    response = communities[community_name].leave_community(username)
    return jsonify({"message": response})

@app.route('/remove_member', methods=['POST'])
def remove_member():
    data = request.json
    community_name = data['community_name']
    admin_username = data['admin_username']
    member_username = data['member_username']

    if community_name not in communities:
        return jsonify({"message": "Community not found."}), 404

    response = communities[community_name].remove_member(admin_username, member_username)
    return jsonify({"message": response})

if __name__ == '__main__':
    app.run(debug=True)
