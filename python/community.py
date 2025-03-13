import nltk
import json
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

# User roles
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
        if user not in self.members:
            self.members.append(user)
            self.save_members()
            print(f"{user.username} joined the {self.name} community as a {user.role}.")
    
    def remove_member(self, admin, username):
        if admin.role == "admin":
            self.members = [member for member in self.members if member.username != username]
            self.save_members()
            print(f"{username} has been removed from {self.name} by admin {admin.username}.")
        else:
            print("Only admins can remove members.")
    
    def add_message(self, user, message):
        if user in self.members:
            self.messages.append(f"{user.username}: {message}")
            self.save_messages()
        else:
            print(f"User {user.username} is not part of {self.name} community.")
    
    def edit_message(self, user, message_index, new_message):
        if 0 <= message_index < len(self.messages):
            original_message = self.messages[message_index]
            if original_message.startswith(user.username):
                self.messages[message_index] = f"{user.username}: {new_message} (edited)"
                self.save_messages()
                print("Message updated.")
            else:
                print("You can only edit your own messages.")
        else:
            print("Invalid message index.")

    def show_messages(self):
        print(f"\n--- {self.name} Community Messages ---")
        for idx, msg in enumerate(self.messages, start=0):
            print(f"{idx}. {msg}")
        print("-----------------------------")
    
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

# Manage communities
communities = {}

def load_all_communities():
    try:
        with open("communities.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_all_communities():
    with open("communities.json", "w") as file:
        json.dump(list(communities.keys()), file)

if __name__ == "__main__":
    communities = load_all_communities()
    
    username = input("Enter your username: ")
    role = input("Enter your role (admin/member): ")
    user = User(username, role)
    
    while True:
        action = input("Do you want to create, join, or access a community? (create/join/access/exit): ").lower()
        
        if action == "exit":
            save_all_communities()
            break
        
        if action == "create":
            community_name = input("Enter the new community name: ")
            communities[community_name] = Community(community_name)
            communities[community_name].add_member(user)
            print(f"Community '{community_name}' created and joined!")
        
        elif action == "join":
            community_name = input("Enter the community name to join: ")
            if community_name in communities:
                communities[community_name].add_member(user)
            else:
                print("Community does not exist.")
        
        elif action == "access":
            community_name = input("Enter the community name to access: ")
            selected_community = communities.get(community_name)
            
            if not selected_community:
                print("Community not found. Please create or join first.")
                continue
            
            while True:
                selected_community.show_messages()
                action = input("Do you want to send, edit, or remove a message? (send/edit/remove/back): ").lower()
                
                if action == "back":
                    break
                
                if action == "send":
                    message = input("Enter your message: ")
                    selected_community.add_message(user, message)
                    
                elif action == "edit":
                    msg_index = int(input("Enter the message index to edit: "))
                    new_message = input("Enter the new message: ")
                    selected_community.edit_message(user, msg_index, new_message)
                    
                elif action == "remove" and user.role == "admin":
                    member_to_remove = input("Enter the username to remove: ")
                    selected_community.remove_member(user, member_to_remove)
                
                else:
                    print("Invalid action. Please choose again.")
        else:
            print("Invalid action. Please choose again.")
