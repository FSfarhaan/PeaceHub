import pandas as pd
from fastapi import APIRouter
from models.questons_model import PredictRequest
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression

df = pd.read_csv('data/extended_dataset.csv')

Features = [f'Q{i}' for i in range(1, 21)]
X = df[Features]
y = df['Result']

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

logreg = LogisticRegression(random_state=42)
logreg.fit(X_train_scaled, y_train)

router = APIRouter()

@router.post("/predict")
async def predict(payload: PredictRequest):
    try:
        user_responses = payload.responses

        if len(user_responses) != 20:
            return {"error": "Exactly 20 responses are required."}

        user_data = pd.DataFrame([user_responses], columns=Features)

        user_data_scaled = scaler.transform(user_data)

        predicted_result = logreg.predict(user_data_scaled)
        depression_level = label_encoder.inverse_transform(predicted_result)[0]

        descriptions = {
            "Severe": "You may be experiencing significant depressive symptoms. Consider reaching out to a mental health professional for support.",
            "Moderate": "You may be experiencing moderate depressive symptoms. It's important to talk to someone about how you're feeling.",
            "Mild": "You may be experiencing mild depressive symptoms. Consider practicing self-care and reaching out for support if needed.",
            "No Depression": "You appear to be in a good mental state. Keep maintaining healthy habits!"
        }

        feedback = descriptions.get(depression_level, "No description available.")

        return {
            "depression_level": depression_level,
            "feedback": feedback
        }

    except Exception as e:
        return {"error": str(e)}