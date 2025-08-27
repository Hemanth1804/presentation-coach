from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/start_session", methods=["POST"])
def start_session():
    # For demo, we accept transcript directly from frontend
    transcript = request.json.get("transcript", "This is a demo transcript.")
    duration = request.json.get("duration", 60)
    return jsonify({"transcript": transcript, "duration": duration})

if __name__ == "__main__":
    app.run(port=5003, debug=True)
