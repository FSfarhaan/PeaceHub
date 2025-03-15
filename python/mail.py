from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Email Configuration
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")  # Your email
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
print("Email:", EMAIL_ADDRESS)
print("Password:", EMAIL_PASSWORD)  # Use an App Password

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# Function to send an email
def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        return True
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return False


@app.route("/")
def hello():
    return jsonify({"message": "hello"})

# ✅ Accept Session Endpoint
@app.route("/accept/<string:user_email>", methods=["GET"])
def accept_session(user_email):
    subject = "✅ Session Confirmed"
    body = "Your session request has been accepted! 🎉"

    if send_email(user_email, subject, body):
        return jsonify({"message": f"Confirmation email sent to {user_email}"})
    else:
        return jsonify({"error": "Failed to send confirmation email"}), 500

# ❌ Reject Session Endpoint
@app.route("/reject/<string:user_email>", methods=["GET"])
def reject_session(user_email):
    subject = "❌ Session Declined"
    body = "Unfortunately, your session request has been declined."

    if send_email(user_email, subject, body):
        return jsonify({"message": f"Rejection email sent to {user_email}"})
    else:
        return jsonify({"error": "Failed to send rejection email"}), 500

# 📩 Send Session Request Email (Using JSON Body)
@app.route("/request-session", methods=["POST"])
def request_session():
    try:
        data = request.json
        user_email = data.get("user_email")
        psychologist_email = data.get("psychologist_email")
        session_details = data.get("session_details")

        email_body = f'''
        <h2>Session Request</h2>
        <p>A user wants to schedule a session.</p>
        <p><b>User Email:</b> {user_email}</p>
        <p><b>Session Details:</b> {session_details}</p>
        <br>
        <p>Please confirm or decline the request:</p>
        <a href="http://127.0.0.1:5000/accept/{user_email}" style="padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none;">Accept</a>
        <a href="http://127.0.0.1:5000/reject/{user_email}" style="padding: 10px 20px; background-color: #dc3545; color: #fff; text-decoration: none; margin-left: 10px;">Reject</a>
        '''

        if send_email(psychologist_email, "New Session Request", email_body):
            return jsonify({"message": "Session request sent successfully. Waiting for the response."})
        else:
            return jsonify({"error": "Failed to send session request email"}), 500
    except Exception. err: 
        print("Some error occurred", Exception. err)

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
