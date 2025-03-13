import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download VADER lexicon
nltk.download('vader_lexicon')


def check_message_sentiment(message):
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(message)

    # Check compound score
    if sentiment_scores['compound'] >= 0.05:
        return "Message sent to the community!"
    else:
        return "Alert: Negative messages are not allowed in the group. Please rephrase your message."


# Example usage
if __name__ == "__main__":
    user_message = input("Enter your message: ")
    result = check_message_sentiment(user_message)
    print(result)

# This version is more accurate and better at handling complex sentiments. Let me know if you want me to fine-tune thresholds or add more features! 🚀
