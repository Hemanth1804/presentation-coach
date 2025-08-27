from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/evaluate", methods=["POST"])
def evaluate():
    transcript = request.json.get("transcript", "")
    duration = request.json.get("duration", 0)
    score = min(100, len(transcript.split()) + duration // 2)
    return jsonify({"score": score, "transcript_length": len(transcript.split()), "duration": duration})

if __name__ == "__main__":
    app.run(port=5004, debug=True)
