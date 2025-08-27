from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/feedback", methods=["POST"])
def feedback():
    score = request.json.get("score", 0)
    feedback = []
    if score < 50:
        feedback.append("Try to explain points more clearly.")
    else:
        feedback.append("Good job! Keep it up.")
    return jsonify({"feedback": feedback, "total_score": score})

if __name__ == "__main__":
    app.run(port=5005, debug=True)
