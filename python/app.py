import numpy as np
import pandas as pd
from flask import Flask, render_template, request
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression

# Step 1: Load the dataset
df = pd.read_csv('extended_dataset.csv')

# Step 2: Select the relevant features and target variable
Features = [f'Q{i}' for i in range(1, 21)]  # Feature columns Q1 to Q20
X = df[Features]  # Features
y = df['Result']  # Target variable (depression level)

# Step 3: Encode the target variable
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Step 4: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Step 5: Standardize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 6: Initialize and train the Logistic Regression model
logreg = LogisticRegression(random_state=42)
logreg.fit(X_train_scaled, y_train)

# Flask application setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all routes & origins

# Questions to ask the user
questions = [
    "During the past week, how often have you been bothered by feeling down, depressed, or hopeless?",
    "During the past week, how often have you had little interest or pleasure in doing things?",
    "During the past week, how often have you felt tired or had little energy?",
    "During the past week, how often have you had trouble sleeping or sleeping too much?",
    "During the past week, how often have you felt bad about yourself, or that you are a failure or have let yourself or your family down?",
    "During the past week, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
    "During the past week, how often have you moved or spoken so slowly that other people could have noticed?",
    "During the past week, how often have you felt that you would be better off dead or hurting yourself in some way?",
    "During the past week, how often have you felt anxious or worried?",
    "During the past week, how often have you felt irritated or angry?",
    "During the past week, how often have you felt lonely?",
    "During the past week, how often have you felt overwhelmed by stress?",
    "During the past week, how often have you lost interest in things you used to enjoy?",
    "During the past week, how often have you felt sad or empty?",
    "During the past week, how often have you had feelings of guilt?",
    "During the past week, how often have you had trouble making decisions?",
    "During the past week, how often have you felt hopeless about the future?",
    "During the past week, how often have you felt disconnected from friends or family?",
    "During the past week, how often have you experienced physical symptoms, such as headaches or stomachaches, without a clear cause?",
    "During the past week, how often have you felt that life is not worth living?"
]

from flask import Flask, request, jsonify

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Step 8: Get user input from JSON request
        user_responses = request.json.get("responses", [])

        if len(user_responses) != 20:
            return jsonify({"error": "Exactly 20 responses are required."}), 400

        # Create a DataFrame for the input
        user_data = pd.DataFrame([user_responses], columns=Features)

        # Scale the user input
        user_data_scaled = scaler.transform(user_data)

        # Predict the depression level based on user input
        predicted_result = logreg.predict(user_data_scaled)
        depression_level = label_encoder.inverse_transform(predicted_result)[0]

        # Provide feedback based on prediction
        descriptions = {
            "Severe": "You may be experiencing significant depressive symptoms. Consider reaching out to a mental health professional for support.",
            "Moderate": "You may be experiencing moderate depressive symptoms. It's important to talk to someone about how you're feeling.",
            "Mild": "You may be experiencing mild depressive symptoms. Consider practicing self-care and reaching out for support if needed.",
            "No Depression": "You appear to be in a good mental state. Keep maintaining healthy habits!"
        }

        # Show the description
        feedback = descriptions.get(depression_level, "No description available.")

        # Return JSON response
        return jsonify({
            "depression_level": depression_level,
            "feedback": feedback
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)








