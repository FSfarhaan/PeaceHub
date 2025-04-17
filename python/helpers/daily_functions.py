from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from datetime import datetime

analyzer = SentimentIntensityAnalyzer()

def calculate_daily_score(data):
    scores = [item[1] for item in data if item[1] is not None]
    return sum(scores) / len(scores) if scores else 0

def analyze_sentiment(text):
    sentiment = analyzer.polarity_scores(text)
    return sentiment['compound']

def calculate_chatbot_score(chatbot_interactions):
    scores = [analyze_sentiment(interaction.user_response) for interaction in chatbot_interactions]
    return sum(scores) / len(scores) if scores else 0

def generate_overall_score(data, journal_entry, chatbot_interactions):
    daily_score = calculate_daily_score(data)
    journal_sentiment_score = analyze_sentiment(journal_entry)
    chatbot_sentiment_score = calculate_chatbot_score(chatbot_interactions)

    normalized_daily_score = daily_score / 4
    normalized_journal_score = (journal_sentiment_score + 1) / 2
    normalized_chatbot_score = (chatbot_sentiment_score + 1) / 2

    overall_score = (0.4 * normalized_daily_score +
                     0.3 * normalized_journal_score +
                     0.3 * normalized_chatbot_score)
    
    return round(overall_score, 2)

def generate_overall_sentiment(overall_score):
    if overall_score >= 0.7:
        return 'Positive'
    elif overall_score <= 0.3:
        return 'Negative'
    else:
        return 'Neutral'

def process_daily_input(data, journal_entry, chatbot_interactions):
    date = datetime.now().strftime("%Y-%m-%d")
    overall_score = generate_overall_score(data, journal_entry, chatbot_interactions)
    sentiment = generate_overall_sentiment(overall_score)
    return {"date": date, "overall_score": overall_score, "sentiment": sentiment}