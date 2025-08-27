from flask import Flask, request, jsonify
import random
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Temporary transcript store
transcripts = []

@app.route("/process_audio", methods=["POST"])
def process_audio():
    """
    Save audio chunks & generate contextual questions
    """
    # ✅ (For demo) We won’t transcribe, just simulate
    # Later you can integrate Whisper for real speech-to-text
    transcripts.append("user said something important")

    # Simulated questions based on speech
    questions = [
        "Can you elaborate on that point?",
        "Why is this slide important?",
        "How does this connect to your next slide?",
    ]
    question = random.choice(questions)

    return jsonify({"question": question})

@app.route("/get_feedback", methods=["GET"])
def get_feedback():
    """
    Generate feedback after session
    """
    return jsonify({
        "feedback": [
            "Good clarity of voice",
            "Maintain eye contact more",
            "Reduce filler words like 'um' and 'uh'"
        ],
        "total_score": 82,
        "confidence": 76
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
