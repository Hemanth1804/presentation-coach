from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/generate_questions", methods=["POST"])
def generate_questions():
    slides = request.json.get("slides", [])
    # Simple placeholder: pick random slide text and form a question
    questions = [f"What is the main point of: {random.choice(slides)}?" for _ in range(3)] if slides else [
        "What is the purpose of this presentation?",
        "Can you explain your key argument?",
        "What are the future implications?"
    ]
    return jsonify({"questions": questions})

if __name__ == "__main__":
    app.run(port=5002, debug=True)
